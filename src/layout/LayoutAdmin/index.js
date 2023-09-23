import { Layout, Button, Avatar } from "antd";
import MenuSider from "../../components/MenuSider";
import { Outlet, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { HomeOutlined, PoweroffOutlined, UserOutlined } from "@ant-design/icons";
import './LayoutAdmin.scss';
import { getCookie } from "../../helpers/cookie";
const { Sider, Content } = Layout;

export default function LayoutAdmin() {
    const companyName = getCookie("companyName");
    const token = getCookie("token");
    const navigate = useNavigate();
    const handleLogOut = () => {
        navigate("/logout");
    }

    return (
        <>
            <Layout>
                <header className="header">
                    <div className="header__name">
                        <Link to="/">IT Jobs Admin</Link>
                    </div>
                    <div className="header__actions">
                        {token ? <>
                        <div className="header__account__name">
                            <Avatar shape="square" icon={<UserOutlined />} />
                            <span className="company-name">{companyName}</span>
                        </div>
                        <Link to="/">
                            <Button icon={<HomeOutlined />}>Trang chủ</Button>
                        </Link>
                        <Button type="primary" icon={<PoweroffOutlined />} onClick={handleLogOut}>
                            Đăng xuất
                        </Button>
                        </> : <>
                            <Button type="text">
                                <Link to="/login">Đăng nhập</Link>
                            </Button>
                            <Button type="primary">
                                <Link to="/register">Đăng kí</Link>
                            </Button>
                        </>}
                    </div>
                </header>

                    <Layout className="admin-main">

                        <Sider className="sider" theme="light">
                            <MenuSider />
                        </Sider>

                        <Content className="content">
                            <Outlet />
                        </Content>

                    </Layout>
            </Layout>
        </>
    )
}