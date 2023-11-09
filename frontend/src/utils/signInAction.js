import { redirect } from "react-router-dom";
import axios from "axios";
import { serverBase } from "./misc";

export default async function signInAction({ request }) {
  const formData = await request.formData();
  const details = Object.fromEntries(formData);

  const result = await axios.post(`${serverBase()}/v1/user`, details);

  return redirect(`/login?u=${result.data.uname}`);
}
