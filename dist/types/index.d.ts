import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
export interface Command {
    data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
    run: (interaction: CommandInteraction) => Promise<void>;
}
//# sourceMappingURL=index.d.ts.map