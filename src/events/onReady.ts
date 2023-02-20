import { REST } from "@discordjs/rest";
import { Client, ActivityType } from "discord.js";
import { Routes } from "discord-api-types/v9";
import { CommandList } from "../commands";
import { onDepremStart } from "./onDepremStart";
import { onDovizStart } from "./onDovizStart";

export async function onReady(client: Client) {
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

  onDepremStart(client);
  await onDovizStart(client);

  console.log("Discord ready!");
}
