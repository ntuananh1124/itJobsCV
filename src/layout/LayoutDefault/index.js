import { getCookie } from "../../helpers/cookie";
import { Button, Avatar } from "antd";
import { UserOutlined, UnorderedListOutlined, PoweroffOutlined } from "@ant-design/icons";
import { Link, Outlet, useNavigate } from "react-router-dom"
import './LayoutDefault.scss';
import { useDispatch } from "react-redux";
import { CheckLogin } from "../../actions/CheckLogin";

export default function LayoutDefault() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const token = getCookie("token");
    const companyName = getCookie("companyName");
    if (token) {
        dispatch(CheckLogin(true));
    }

    const handleLogOut = () => {
        navigate("/logout");
    }

    return (
        <>
            <header className="header">
                <div className="header__name">
                    <a href="/">IT Jobs</a>
                </div>
                <div className="header__actions">
                    {token ? 
                    (<>
                        <Avatar shape="square" icon={<UserOutlined />} />
                        <span className="company-name">{companyName}</span>
                        <Link to="/admin">
                            <Button icon={<UnorderedListOutlined />}>Quản lý</Button>
                        </Link>
                        <Button type="primary" icon={<PoweroffOutlined />} onClick={handleLogOut}>
                            Đăng xuất
                        </Button>
                    </>) : 
                    (<>
                        <Button type="text">
                            <Link to="/login">Đăng nhập</Link>
                        </Button>
                        <Button type="primary">
                            <Link to="/register">Đăng kí</Link>
                        </Button>
                    </>)}
                </div>
            </header>

            <main>
                <Outlet />
            </main>
        </>
    )
}