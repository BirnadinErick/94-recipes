import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  // so that, if any property gets obscured due to
  // styling, we can check it with color scemantics
  console.error(error);

  return (
    <div>
      <h1>Oopsie Doopsie!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
