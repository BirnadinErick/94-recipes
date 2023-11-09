import { useState } from "react";
import { Form } from "react-router-dom";

export default function SignUp() {
  let [bio, setBio] = useState("");
  return (
    <section>
      <Form method="post">
        <input
          className="block my-2 bg-gray-800 p-2 rounded-md text-white"
          type="text"
          name="uname"
          id="uname"
          placeholder="Username"
          required
          autoFocus
        />
        <input
          className="block my-2 bg-gray-800 p-2 rounded-md text-white"
          type="password"
          name="passwd"
          id="passwd"
          placeholder="Password"
          required
        />
        <textarea
          className="bg-gray-800 text-white p-2 rounded-md block"
          name="bio"
          value={bio === "" ? undefined : bio}
          placeholder="Something about you...(optional)"
          onChange={(e) => {
            setBio(e.target.value);
          }}
        ></textarea>
        <div className="space-x-4 my-2">
          <button
            className="border border-amber-500 p-2 rounded-md"
            type="reset"
          >
            Clear
          </button>
          <button
            className="bg-blue-700 p-2 text-white rounded-md"
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </Form>
    </section>
  );
}
