import axios from "axios";
import { serverBase } from "./misc";

export default async function logInFormAction(credentials) {
  const result = await axios.post(`${serverBase()}/v1/user/login`, credentials);

  // using switch statements as this would not result in
  // branching **most** of the times
  switch (result.status) {
    case 200:
      return result.data;
    // if login fails, redirect and indicate an error `e`
    //   e == 0 means bad credentials
    //   e == 1 means internal server error
    default:
      return result.status;
  }
}
