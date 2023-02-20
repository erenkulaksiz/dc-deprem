import { Client, VoiceChannel } from "discord.js";
import { getDoviz, formatDateToHuman } from "../utils";

export async function onDovizStart(client: Client) {
  console.log("Döviz started!");
  const voiceChannel = client.guilds.cache
    .get(process.env.GUILD_ID as string)
    ?.channels.cache.get(
      process.env.VOICE_CHANNEL_ID as string
    ) as VoiceChannel;
  if (!voiceChannel) throw new Error("Voice channel not found!");

  setInterval(async () => {
    console.log("Döviz update");
    const doviz = await getDoviz();
    const dolar = Number(doviz.USD.satis).toFixed(2).toString();
    const final = `${
      doviz.USD.d_yon === "caret-up" ? "⬆️" : "⬇️"
    } ${dolar}TL - ${formatDateToHuman({
      date: Date.now(),
      output: "{HOURS}:{MINUTES}:{SECONDS}",
    })}`;

    await voiceChannel.setName(final);
  }, 1000 * 60 * 15);
}
