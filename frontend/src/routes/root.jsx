import { Outlet, useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import AltHome from "../components/AlternateHome";

export default function Root() {
  // eslint-disable-next-line no-unused-vars
  const [searchParams, _] = useSearchParams();
  const isDoc = searchParams.get("me");

  return (
    <main>
      <Header />
      {isDoc ? <AltHome /> : <Outlet />}
    </main>
  );
}
