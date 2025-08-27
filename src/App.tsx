import { Toaster } from "sonner";
import Home from "./pages/Home";
import { ThemeProvider } from "next-themes";

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Toaster richColors expand={true} />
      <Home />
    </ThemeProvider>
  );
}

export default App;
