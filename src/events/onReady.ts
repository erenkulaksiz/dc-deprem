import { REST } from "@discordjs/rest";
import { Client, ActivityType, TextChannel, EmbedBuilder } from "discord.js";
import { Routes } from "discord-api-types/v9";
import fetch from "node-fetch";
import fs from "fs";
import { CommandList } from "../commands";

async function getLatestDeprem(){
  const data = await fetch("https://api.orhanaydogdu.com.tr/deprem/live.php");
  const json = await data.json();

  return json.result[0];
}

async function start(client: Client){
  console.log("started deprem");
  const lowChannel = client.channels.cache.get(process.env.LOW_CHANNEL_ID as string);
  const highChannel = client.channels.cache.get(process.env.HIGH_CHANNEL_ID as string);
  setInterval(async () => {
    console.log("checking deprem");
    const latestDeprem = await getLatestDeprem();

    const file = await fs.readFileSync("latest.json", "utf-8");
    if(!file) throw new Error("latest.json not found!");

    const latest = JSON.parse(file);

    if(latest?.date != latestDeprem?.date) {
      console.log("Deprem var!", latestDeprem);
      await fs.writeFileSync("latest.json", JSON.stringify(latestDeprem));

      const depremEmbed = new EmbedBuilder()
        .setTitle("Deprem Bilgileri")
        .setColor(0x0099FF)
        .setTimestamp()
        .addFields(
          { name: "Lokasyon", value: latestDeprem.lokasyon.toString()},
          { name: "Şiddet", value: latestDeprem.mag.toString()},
          { name: "Tarih", value: latestDeprem.date.toString()},
          { name: "Enlem", value: latestDeprem.coordinates[0].toString(), inline: true },
          { name: "Boylam", value: latestDeprem.coordinates[1].toString(), inline: true },
          { name: "Derinlik", value: latestDeprem.depth.toString(), inline: true },
        )
        .setFooter({text: "Deprem Botu"});
      
      const channel = latestDeprem.mag > 4 ? highChannel : lowChannel;
      await (channel as TextChannel).send({ embeds: [depremEmbed] });
    }else{
      console.log("Deprem yok!");
    }
  }, 1000*60*5);
}

export async function onReady(client: Client){
  const rest = new REST({ version: "9" }).setToken(
    process.env.BOT_TOKEN as string
  );

  const commandData = CommandList.map((command) => command.data.toJSON());

  await rest.put(
    Routes.applicationGuildCommands(
      client.user?.id || "missing id",
      process.env.GUILD_ID as string
    ),
    { body: commandData }
  );

  client.user?.setActivity("Deprem", { type: ActivityType.Playing });
  client.user?.setStatus("online");
  start(client);

  console.log("Discord ready!");
};