import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main.jsx";
import Home from "../pages/Home.jsx";
import Login from "../pages/Authentication/Login.jsx";
import Register from "../pages/Authentication/Register.jsx";
import Rooms from "../pages/Rooms.jsx";
import RoomDetails from "../pages/RoomDetails.jsx";
import MyBookings from "../pages/MyBookings.jsx";
import AboutUs from "../pages/AboutUs.jsx";
import ContactUs from "../pages/ContactUs.jsx";
import PrivateRoute from "./PrivateRoute.jsx";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <Main></Main>,
            children: [
                {
                    path: "/",
                    element: <Home></Home>,
                    loader: () => fetch(`${import.meta.env.VITE_API_URL}/rooms`)
                },
                {
                    path: "/login",
                    element: <Login></Login>
                },
                {
                    path: "/registration",
                    element: <Register></Register>
                },
                {
                    path: "/rooms",
                    element: <Rooms></Rooms>,

                },
                {
                    path: "roomDetails/:Id",
                    element: <PrivateRoute><RoomDetails></RoomDetails></PrivateRoute>,
                    loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/rooms/${params.Id}`)
                },
                {
                    path: "/myBookings",
                    element: <PrivateRoute><MyBookings></MyBookings></PrivateRoute>
                },
                {
                    path: "/about",
                    element: <AboutUs></AboutUs>
                },
                {
                    path: "/contact",
                    element: <ContactUs></ContactUs>
                }
            ]
        },

    ]
)

export default router