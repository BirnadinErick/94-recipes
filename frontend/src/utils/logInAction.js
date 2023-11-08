import { redirect } from "react-router-dom";
import axios from "axios";

export async function logInFormAction({ request }) {
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);

  const result = await axios.post(
    "http://localhost:2003/v1/user/login",
    credentials
  );

  switch (result.status) {
    case 200:
      return redirect("/");
    // if login fails, redirect and indicate an error `e`
    //   e == 0 means bad credentials
    //   e == 1 means internal server error
    case 401:
      return redirect("/login?e=0");
    default:
      // some other status, so Internal server error
      return redirect("/login?e=1");
  }
}
