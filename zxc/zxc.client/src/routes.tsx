import { createBrowserRouter } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { AppLayout } from "./pages/Layout";
import { ResultPage } from "./pages/ResultPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: <MainPage />
            },
            {
                path: '/result',
                element: <ResultPage />
            }
        ]
    }
])
