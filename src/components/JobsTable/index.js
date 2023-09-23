import { Button, Table, Tag, Tooltip } from "antd";
import EditJob from "../EditJob";
import DeleteJob from "../DeleteJob";
import "./JobsTable.scss";
import { Link } from "react-router-dom";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";

export default function JobsTable({jobs, onReload, onMessage}) {
    // console.log(jobs);
    const dataSource = jobs.map((job, jobIndex) => {
        return {
            key: job.id,
            id: job.id,
            name: job.name,
            salary: job.salary,
            createAt: job.createAt,
            tags: job.tags,
            status: job.status,
            city: job.city,
            detail: job.detail || job.description
        }
    })

    const columns = [
        {
            title: "Tên job",
            key: "name",
            dataIndex: "name",
        },
        {
            title: "Tags",
            key: "tags",
            dataIndex: "tags",
            render: (_, record) => {
                return record.tags.map((tag, tagIndex) => (
                    <Tag color="blue" key={tagIndex + 1}>{tag}</Tag>
                ))
            }
        },
        {
            title: "Mức lương ($)",
            key: "salary",
            dataIndex: "salary"
        },
        {
            title:"Ngày tạo",
            key: "createAt",
            dataIndex: "createAt"
        },
        {
            title: "Trạng thái",
            key: "status",
            dataIndex: "status",
            render: (_, record) => {
                return (record.status ? <Tag color="green">Đang bật</Tag> : <Tag color="red">Đang đóng</Tag>)
            }
        },
        {
            title: "Hành động",
            key: "actions",
            dataIndex: "actions",
            render: (_, record) => {
                return (
                    <div className="actions">
                        <Link to={"/admin/edit-job/" + record.id}>
                            <Tooltip title="Chỉnh sửa">
                                <Button size="small" icon={<EditOutlined />} />
                            </Tooltip>
                        </Link>
                        {/* <EditJob job={record} onReload={onReload} onMessage={onMessage}/> */}
                        <DeleteJob jobsId={record.id} onReload={onReload} onMessage={onMessage}/>
                        <Link to={"/admin/job-details/" + record.id}>
                            <Tooltip title="Xem chi tiết">
                                <Button size="small" icon={<EyeOutlined />} />
                            </Tooltip>
                        </Link>
                    </div>
                )
            }
        }
    ]

    return (
        <>
            <Table dataSource={dataSource} columns={columns} />
        </>
    )
}