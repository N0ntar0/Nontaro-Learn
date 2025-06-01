import type { RouteObject } from "react-router-dom";
import Home from "./pages/Home";
import Roulette from "./pages/Roulette";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "roulette",
        element: <Roulette/>
    }
]

export default routes;