import "./index.css";
import { RouterProvider } from "react-router-dom";
import routerPage from "./router/RouterPage";
import axiosInstance from "./utils/AxiosInstance";
import {createBrowserHistory} from "history";

const history = createBrowserHistory();

function App() {
  return (
    <>
      <RouterProvider history={history} router={routerPage}>
        <axiosInstance.Provider>
          <App/>
        </axiosInstance.Provider>
      </RouterProvider>
    </>
  );
}

export default App;
