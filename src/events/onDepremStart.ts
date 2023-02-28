import { Client, TextChannel, EmbedBuilder } from "discord.js";
import { getLatestDeprem } from "../utils";
import fs from "fs";

function getDepremColor(magnitute: number) {
  if (magnitute < 2) return "#00ff00";
  if (magnitute < 3) return "#ffff00";
  if (magnitute < 4) return "#ff9900";
  if (magnitute < 5) return "#ff0000";
  if (magnitute < 6) return "#990099";
  return "#ff00ff";
}

export async function onDepremStart(client: Client) {
  console.log("started deprem");
  const lowChannel = client.channels.cache.get(
    process.env.LOW_CHANNEL_ID as string
  );
  const highChannel = client.channels.cache.get(
    process.env.HIGH_CHANNEL_ID as string
  );
  setInterval(async () => {
    console.log("checking deprem");
    const latestDeprem = await getLatestDeprem();

    const file = await fs.readFileSync("latest.json", "utf-8");
    if (!file) throw new Error("latest.json not found!");

    const latest = JSON.parse(file);

    if (latest?.date != latestDeprem?.date) {
      console.log("Deprem var!", latestDeprem);
      await fs.writeFileSync("latest.json", JSON.stringify(latestDeprem));

      const x = latestDeprem.coordinates[0].toString();
      const y = latestDeprem.coordinates[1].toString();

      const depremEmbed = new EmbedBuilder()
        .setTitle("Deprem Bilgileri")
        .setColor(getDepremColor(latestDeprem.mag))
        .setTimestamp()
        .setImage(
          `https://maps.googleapis.com/maps/api/staticmap?center=${x},${y}&zoom=12&size=800x400&markers=color:blue%7C${x},${y}&key=${process.env.MAPS_API_KEY}`
        )
        .addFields(
          { name: "Lokasyon", value: latestDeprem.lokasyon.toString() },
          { name: "Şiddet", value: latestDeprem.mag.toString() },
          { name: "Tarih", value: latestDeprem.date.toString() },
          {
            name: "Enlem",
            value: latestDeprem.coordinates[0].toString(),
            inline: true,
          },
          {
            name: "Boylam",
            value: latestDeprem.coordinates[1].toString(),
            inline: true,
          },
          {
            name: "Derinlik",
            value: latestDeprem.depth.toString() + "km",
            inline: true,
          }
        )
        .setFooter({ text: "Deprem Botu" });

      const channel = latestDeprem.mag > 4 ? highChannel : lowChannel;
      await (channel as TextChannel).send({ embeds: [depremEmbed] });
    } else {
      console.log("Deprem yok!");
    }
  }, 1000 * 60);
}
