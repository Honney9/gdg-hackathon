import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Signin from "./components/Signin"
import Signup from "./components/Signup"
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import ForgetPassword from "./components/Forgotpassword";

export const router = createBrowserRouter([
    {path: "/", element: <App />},
    {path: "/signup", element: <Signup />},
    {path: "/signin", element: <Signin />},
    {path: "/dashboard", element: (
    <PrivateRoute>
        <Dashboard />
    </PrivateRoute>
    )},
    {path: "/forgot-password", element: <ForgetPassword />}
]);