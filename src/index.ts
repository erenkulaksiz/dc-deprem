require('dotenv').config();
import { Client, Interaction }from "discord.js";
import { onInteraction, onReady } from "./events";

(async () => {
  const client = new Client({ intents: ["Guilds"] });

  client.on("ready", () => onReady(client));

  client.on(
    "interactionCreate",
    async (interaction: Interaction) => await onInteraction(interaction)
  );

  await client.login(process.env.BOT_TOKEN);
})();