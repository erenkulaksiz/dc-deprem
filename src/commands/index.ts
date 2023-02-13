import { Command } from "../types";
import { kalp } from "./kalp";
import { deprem } from "./deprem";
import { yapan } from "./yapan";

export const CommandList: Command[] = [kalp, deprem, yapan];