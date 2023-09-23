import { Menu } from "antd";
import { DatabaseOutlined, BookOutlined, EditOutlined, DashboardOutlined, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export default function MenuSider() {
    const items = [
        {
            key: "overview",
            label: <Link to="/admin">Tổng quan</Link>,
            icon: <DashboardOutlined />
        },
        {
            key: "edit-company-info",
            label: <Link to="/admin/edit-info">Thông tin công ty</Link>,
            icon: <EditOutlined />
        },
        {
            key: "jobs-management",
            label: <Link to="/admin/jobs-management">Quản lí việc làm</Link>, 
            icon: <BookOutlined />
        },
        {
            key: "cv-management",
            label: <Link to="/admin/cv-management">Quản lí CV</Link>,
            icon: <DatabaseOutlined />
        },
        {
            key: "create-job",
            label: <Link to="/admin/create-job">Tạo công việc</Link>,
            icon: <PlusOutlined />
        }
    ]

    return (
        <>
            <Menu mode="inline" items={items}/>
        </>
    )
}