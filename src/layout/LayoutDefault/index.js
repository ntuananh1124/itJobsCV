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

            <footer className="footer">
                <div className="footer_main">
                    <ul>
                        <h4>Về chúng tôi</h4>
                        <li>Giới thiệu</li>
                        <li>Tuyển dụng</li>
                        <li>Điều khoản</li>
                        <li>Chính sách hoạt động</li>
                    </ul>
                    <ul>
                        <h4>Liên hệ</h4>
                        <li>Gmail</li>
                        <li>Telegram</li>
                        <li>Facebook</li>
                    </ul>
                    <ul>
                        <h4>FAQ</h4>
                        <li>Câu hỏi thường gặp</li>
                        <li>Giới thiệu về ITJOBS</li>
                    </ul>
                </div>
            </footer>
        </>
    )
}