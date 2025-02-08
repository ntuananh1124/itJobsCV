import { getCookie } from "../../helpers/cookie";
import { Button, Avatar, Popover } from "antd";
import { UserOutlined, UnorderedListOutlined, PoweroffOutlined, SnippetsOutlined, HistoryOutlined } from "@ant-design/icons";
import { Link, Outlet, useNavigate } from "react-router-dom"
import './LayoutDefault.scss';
import { useDispatch } from "react-redux";
import { CheckLogin } from "../../actions/CheckLogin";
// import { useState } from "react";

export default function LayoutDefault() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = getCookie("token");
    const companyName = getCookie("companyName");
    const userFullname = getCookie("fullName");
    const accType = getCookie("type");
    if (token) {
        dispatch(CheckLogin(true));
    };

    const handleLogOut = () => {
        navigate("/logout");
    };

    const popContent = (
        <div>
            <ul className="user-info-list">
                <li className="user-info-item"><Link to="/user-info"><UserOutlined /> Hồ sơ của bạn</Link></li>
                <li className="user-info-item"><Link to="/user-cv"><SnippetsOutlined /> CV</Link></li>
                <li className="user-info-item"><Link to="/user-history"><HistoryOutlined /> Lịch sử</Link></li>
            </ul>
        </div>
    );

    return (
        <>
            <header className="header">
                <div className="header__name">
                    <a href="/">IT Jobs</a>
                </div>
                <div className="header__actions">
                    {!token && 
                        <>
                            <Button type="text">
                                <Link to="/login">Đăng nhập</Link>
                            </Button>
                            <Button type="primary">
                                <Link to="/register">Đăng kí</Link>
                            </Button>
                        </>
                    }
                    {token && accType === 'company' ? 
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
                    (<></>)}
                    {token && accType === 'user' ? 
                    (<>
                        <Popover content={popContent} title={userFullname}>
                            <div className="user-info">
                                <span className="hello-user">Xin chào</span>
                                <Avatar shape="square" icon={<UserOutlined />} />
                                <span className="company-name">{userFullname}</span>
                            </div>
                        </Popover>
                        <Button type="primary" icon={<PoweroffOutlined />} onClick={handleLogOut}>
                            Đăng xuất
                        </Button>
                    </>) : 
                    (<></>)}
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