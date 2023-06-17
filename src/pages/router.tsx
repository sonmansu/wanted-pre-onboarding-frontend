import { createBrowserRouter } from "react-router-dom";
import { PATH } from "../common/utils/constants";
import { TodoPage } from "./TodoPage";
import { SignUpPage } from "./SignUpPage";
import { SignInPage } from "./SignInPage";

export const router = createBrowserRouter([
    {
        path: `/${PATH.todo}`,
        element: <TodoPage />,
    },
    {
        path: `/${PATH.signUp}`,
        element: <SignUpPage />,
    },
    {
        path: `/${PATH.signIn}`,
        element: <SignInPage />,
    },
]);
