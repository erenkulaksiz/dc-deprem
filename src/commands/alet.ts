import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../types";

export const alet: Command = {
  data: new SlashCommandBuilder()
    .setName("alet")
    .setDescription("aletinizi ölçün"),
  run: async (interaction) => {
    const random = Math.floor(Math.random() * 40) + 1;
    const name = await interaction.guild?.members
      .fetch(interaction.user.id)
      .then((member) => member.displayName);
    const seyBuild = `8${Array.from(Array(Math.floor(random / 4)))
      .map(() => "=")
      .join("")}D`;
    await interaction.reply(
      `**${name}**'in aleti **${random}**cm! ${seyBuild}`
    );
  },
};
