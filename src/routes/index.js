import LayoutDefault from "../layout/LayoutDefault";
import Home from "../pages/Home";
import JobDetails from "../pages/JobDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Error404 from "../pages/Error404";
import Company from "../pages/Company";
import CompanyDetails from "../pages/CompanyDetails";
import LogOut from "../pages/LogOut";
import Overview from "../pages/Admin/Overview";
import LayoutAdmin from "../layout/LayoutAdmin";
import EditInfo from "../pages/Admin/EditInfo";
import JobsManagement from "../pages/Admin/JobsManagement";
import CVManagement from "../pages/Admin/CVManagement";
import CreateJob from "../pages/Admin/CreateJob";
import DetailsJob from "../pages/Admin/DetailsJob";
import EditJob from "../components/EditJob";
import DetailsCV from "../pages/Admin/DetailsCV";
import SearchResult from "../pages/SearchResult";

export const routes = [
    {
        path: "/",
        element: <LayoutDefault />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "job/:id",
                element: <JobDetails />
            },
            {
                path: "company",
                element: <Company />
            },
            {
                path: "company/:id",
                element: <CompanyDetails />
            },
            {
                path: "logout",
                element: <LogOut />
            },
            {
                path: "search",
                element: <SearchResult />
            },
            {
                path: "*",
                element: <Error404 />
            }
        ],
    },
    {
        path: "admin",
        element: <LayoutAdmin />,
        children: [
            {
                index: true,
                element: <Overview />
            },
            {
                path: "edit-info",
                element: <EditInfo />
            },
            {
                path: "jobs-management",
                element: <JobsManagement />,
            },
            {
                path: "job-details/:id",
                element: <DetailsJob />
            },
            {
                path: "cv-management",
                element: <CVManagement />
            },
            {
                path: "cv-details/:id",
                element: <DetailsCV />
            },
            {
                path: "create-job",
                element: <CreateJob />
            },
            {
                path: "edit-job/:id",
                element: <EditJob />
            }
        ]
    },
]