import { useDispatch } from "react-redux";
import { useNavigate } from "react-router"
import { CheckLogin } from "../../actions/CheckLogin";
import { useEffect } from "react";
import { deleteAllCookies } from "../../helpers/cookie";

export default function LogOut() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        deleteAllCookies();
        dispatch(CheckLogin(false));
        navigate("/login");
    }, [])

    return (
        <>
        </>
    )
}