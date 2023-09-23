import { Button, Popconfirm, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteJob } from "../../services/jobServices";


export default function DeleteJob({jobsId, onReload, onMessage}) {
    const handleConfirm = async () => {
        const result = await deleteJob(jobsId);
        if (result) {
            onMessage("success", "Xóa công việc thành công");
            onReload();
        }
        else {
            onMessage("error", "Xóa không thành công, vui lòng thử lại")
        }
    }

    return (
        <>
        <Popconfirm title="Xóa công việc này"
                description="Bạn có chắc chắn muốn xóa công việc này?"
                onConfirm={handleConfirm}
                okText="Đồng ý"
                cancelText="Hủy" >
            <Tooltip title="Xóa">
                <Button size="small" danger icon={<DeleteOutlined />}/>
            </Tooltip>
        </Popconfirm>
        </>
    )
}