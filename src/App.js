import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import routes from "./Routes/Routes";

function App() {
  return (
    <>
      <RouterProvider router={routes} />
      <Toaster
        toastOptions={{
          // Define default options
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
    </>
  );
}

export default App;
