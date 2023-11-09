import axios from "axios";

export default async function loader() {
  const res = await axios.get("http://localhost:2003/v1/recipe");
  return { recipesRetrieved: res.data.recipes };
}
