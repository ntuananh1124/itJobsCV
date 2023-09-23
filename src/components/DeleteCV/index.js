import { Button, Popconfirm, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteCV } from "../../services/cvServices";


export default function DeleteCV({idCV, onReload, onMessage}) {
    const handleConfirm = async () => {
        const result = await deleteCV(idCV);
        if (result) {
            onMessage("success", "Xóa CV thành công");
            onReload();
        }
        else {
            onMessage("error", "Xóa không thành công, vui lòng thử lại")
        }
    }

    return (
        <>
            <Popconfirm title="Xóa CV này"
                    description="Bạn có chắc chắn muốn xóa CV này?"
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