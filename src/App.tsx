import { Toaster } from "sonner";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Toaster richColors expand={true} />
      <Home />
    </>
  );
}

export default App;
