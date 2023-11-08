import { redirect } from "react-router-dom";
import axios from "axios";

export default async function signInAction({ request }) {
  const formData = await request.formData();
  const details = Object.fromEntries(formData);

  const result = await axios.post("http://localhost:2003/v1/user", details);

  return redirect(`/login/${result.data.uname}`);
}
