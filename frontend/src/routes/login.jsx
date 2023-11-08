import { Form } from "react-router-dom";

export default function LogIn() {
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

        <div className="space-x-4 my-2">
          <button
            className="bg-blue-700 p-2 text-white rounded-md"
            type="submit"
          >
            Log In
          </button>
        </div>
      </Form>
    </section>
  );
}
