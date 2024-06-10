import { Toaster } from "react-hot-toast";
import { Router } from "./routes/router";
import { Loading } from "./components/loading";

function App() {
  return (
    <>
      <Toaster />
      <Loading />
      <Router />
    </>
  );
}

export default App;
