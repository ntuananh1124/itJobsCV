import { useEffect, useState } from "react";
import CVTable from "../../../components/CVTable";
import { getCVListOfCompany } from "../../../services/cvServices";
import { message } from "antd";
import { getCookie } from "../../../helpers/cookie";

export default function CVManagement() {
    const idCompany = parseInt(getCookie("id"));
    const [cvList, setCVList] = useState();
    const [messageApi, contextHolder] = message.useMessage();
    const [reload, setReload] = useState(false);

    const messageCustom = (type, content) => {
        messageApi.open({
            type: type,
            content: content,
            duration: 2
        });
    };

    useEffect(() => {
        const fetchApi = async () => {
            const result = await getCVListOfCompany(idCompany);
            if (result) {
                setCVList(result.reverse())
            }
        }
        fetchApi()
    }, [reload]);

    const handleReload = () => {
        setReload(!reload);
    }
    return (
        <>
        {contextHolder}
            {cvList && <CVTable cvList={cvList} onReload={handleReload} onMessage={messageCustom} />}
        </>
    )
}