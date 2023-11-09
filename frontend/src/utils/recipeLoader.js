import axios from "axios";
import { serverBase } from "./misc";

export default async function loader({ params }) {
  console.debug("loading recipe");
  const res = await axios.get(`${serverBase()}/v1/recipe/${params.slug}`);

  return { recipe: res.data, slug: params.slug };
}
