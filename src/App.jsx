import "./index.css";
import { RouterProvider } from "react-router-dom";
import routerPage from "./router/RouterPage";

function App() {
  return <RouterProvider router={routerPage} />;
}

export default App;
