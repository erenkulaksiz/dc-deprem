import fetch from "node-fetch";

export async function getLatestDeprem() {
  const data = await fetch("https://api.orhanaydogdu.com.tr/deprem/live.php");
  const json = await data.json();

  return json.result[0];
}

export async function getDoviz() {
  const data = await fetch("https://api.genelpara.com/embed/borsa.json");
  const json = await data.json();

  return json;
}

export { formatDateToHuman } from "./formatDateToHuman";
