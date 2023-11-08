import axios from "axios";

export default async function loader({ params }) {
  const res = await axios.get(`http://localhost:2003/v1/recipe/${params.slug}`);

  return { recipe: res.data };
}
