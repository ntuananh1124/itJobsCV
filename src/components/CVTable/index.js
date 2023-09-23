import { Button, Table, Tag, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { EyeOutlined } from "@ant-design/icons";
import CVJobName from "../CVJobName";
import DeleteCV from "../DeleteCV";

export default function CVTable({cvList, onReload, onMessage}) {
    const dataSource = cvList.map((cv, cvIndex) => {
        return {
            key: cv.id,
            id: cv.id,
            name: cv.name,
            idJob: cv.idJob,
            idCompany: cv.idCompany,
            createAt: cv.createAt,
            email: cv.email,
            statusRead: cv.statusRead,
            city: cv.city,
            description: cv.description,
            linkProject: cv.linkProject,
            phone: cv.phone
        }
    })

    const columns = [
        {
            title: "Tên job",
            key: "idJob",
            dataIndex: "idJob",
            render: (_,record) => (
                <CVJobName cv={record} />
            )
        },
        {
            title: "Họ tên",
            key: "name",
            dataIndex: "name"
        },
        {
            title: "Số điện thoại",
            key: "phone",
            dataIndex: "phone"
        },
        {
            title:"Email",
            key: "email",
            dataIndex: "email"
        },
        {
            title: "Ngày gửi",
            key: "createAt",
            dataIndex: "createAt"
        },
        {
            title: "Trạng thái",
            key: "statusRead",
            dataIndex: "statusRead",
            render: (_,record) => {
                return <>
                    {record.statusRead ? <Tag color="green">Đã đọc</Tag> : <Tag color="gray">Chưa đọc</Tag>}
                </>
            }
        },
        {
            title: "Hành động",
            key: "actions",
            dataIndex: "actions",
            render: (_, record) => {
                return (
                    <div className="actions">
                        <Link to={"/admin/cv-details/" + record.id}>
                            <Tooltip title="Xem chi tiết">
                                <Button size="small" icon={<EyeOutlined />} />
                            </Tooltip>
                        </Link>
                        <DeleteCV idCV={record.id} onReload={onReload} onMessage={onMessage}/>
                    </div>
                )
            }
        }
    ]
    return (
        <>
            <Table dataSource={dataSource} columns={columns}/>
        </>
    )
}