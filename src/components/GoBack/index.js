import { useNavigate } from "react-router";
import { Button } from "antd";
import './GoBack.scss';
import { ArrowLeftOutlined } from "@ant-design/icons";

export default function GoBack() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(-1);
    }

    return (
        <>
            <Button className="btn__back" type="primary" icon={<ArrowLeftOutlined />} onClick={handleClick}>Trở lại</Button>
        </>
    )
}