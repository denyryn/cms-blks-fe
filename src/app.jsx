import { RouterProvider } from "react-router";
import { ThemeProvider } from "next-themes";
import router from "@/routes";
import { Toaster } from "sonner";

export default function App() {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <RouterProvider router={router} />
        <Toaster position="bottom-right" />
      </ThemeProvider>
    </>
  );
}
