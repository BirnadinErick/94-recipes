import axios from "axios";
import { serverBase } from "./misc";

export default async function loader() {
  const res = await axios.get(`${serverBase()}/v1/recipe`);
  return { recipesRetrieved: res.data.recipes };
}
