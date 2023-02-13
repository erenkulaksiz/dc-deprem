import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../types";

export const kalp: Command = {
  data: new SlashCommandBuilder()
  .setName("kalp")
  .setDescription("yanımdaki kim?"),
  run: async (interaction) => {
    await interaction.reply("https://cdn.discordapp.com/attachments/1043549655738363916/1074706029729820703/4db68067-074d-4e4e-8f91-e1c845754143.JPG");
  }
}