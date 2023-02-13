import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../types";

export const yapan: Command = {
  data: new SlashCommandBuilder()
  .setName("yapan")
  .setDescription("yapan yakışıklı kişi"),
  run: async (interaction) => {
    await interaction.reply("https://cdn.discordapp.com/attachments/1074682305538437202/1074741895399481465/Adsz.png");
  }
}