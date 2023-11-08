import { useState } from "react";
import logInAction from "../utils/logInAction";
import { useDispatch } from "react-redux";
import { login } from "../utils/state/authSlice";

export default function LogIn() {
  const [uname, setUname] = useState("");
  const [passwd, setPasswd] = useState("");
  const dispatch = useDispatch();

  return (
    <section>
      <form
        method="post"
        onSubmit={(e) => {
          e.preventDefault();
          Promise.resolve(logInAction({ uname, passwd })).then((data) => {
            if (typeof data === "number") {
              // error happened
              document.location.reload();
            }
            // dispatch login action and set the username
            dispatch(login({ uname: data.uname }));
            document.location.replace("/");
          });
        }}
      >
        <input
          className="block my-2 bg-gray-800 p-2 rounded-md text-white"
          type="text"
          name="uname"
          id="uname"
          placeholder="Username"
          required
          autoFocus
          value={uname}
          onChange={(e) => setUname(e.target.value)}
        />
        <input
          className="block my-2 bg-gray-800 p-2 rounded-md text-white"
          type="password"
          name="passwd"
          id="passwd"
          placeholder="Password"
          required
          value={passwd}
          onChange={(e) => setPasswd(e.target.value)}
        />

        <div className="space-x-4 my-2">
          <button
            className="bg-blue-700 p-2 text-white rounded-md"
            type="submit"
          >
            Log In
          </button>
        </div>
      </form>
    </section>
  );
}
