import { SlashCommandBuilder } from "@discordjs/builders";
import { EmbedBuilder  } from 'discord.js';
import fetch from "node-fetch";
import { Command } from "../types";

export const deprem: Command = {
  data: new SlashCommandBuilder()
  .setName("deprem")
  .setDescription("En son yaşanan depremi getirir."),
  run: async (interaction) => {
    await interaction.deferReply();
    if (!interaction.isCommand()) return;
    const data = await fetch("https://api.orhanaydogdu.com.tr/deprem/live.php");
    const json = await data.json();
    const latest = json.result[0];

    const depremEmbed = new EmbedBuilder()
      .setTitle("Deprem Bilgileri")
      .setColor(0x0099FF)
      .setTimestamp()
      .addFields(
        { name: "Lokasyon", value: latest.lokasyon.toString()},
        { name: "Şiddet", value: latest.mag.toString()},
        { name: "Tarih", value: latest.date.toString()},
        { name: "Enlem", value: latest.coordinates[0].toString(), inline: true },
        { name: "Boylam", value: latest.coordinates[1].toString(), inline: true },
        { name: "Derinlik", value: latest.depth.toString(), inline: true },
      )
      .setFooter({text: "Deprem Botu"});
      
    await interaction?.editReply({ embeds: [depremEmbed] });
  }
}