import { useEffect, useState } from "react";
import { getJobsOfCompany } from "../../../services/jobServices";
import { getCookie } from "../../../helpers/cookie";
import JobsTable from "../../../components/JobsTable";
import { message } from "antd";

export default function JobsManagement() {
    const [messageApi, contextHolder] = message.useMessage();
    const idCompany = parseInt(getCookie("id"));
    const [reload, setReload] = useState(false);
    const [jobs, setJobs] = useState([]);

    const messageCustom = (type, content) => {
        messageApi.open({
            type: type,
            content: content,
            duration: 2
        });
    };

    const fetchApi = async () => {
        const response = await getJobsOfCompany(idCompany);
        // console.log(response);
        setJobs(response.reverse());
    }
    // console.log(jobs);

    useEffect(() => {
        fetchApi();
    }, [reload])

    const handleReload = () => {
        setReload(!reload);
    }

    return (
        <>
        {contextHolder}
            {jobs.length > 0 ? <JobsTable jobs={jobs} onReload={handleReload} onMessage={messageCustom}/> : <>Chưa có việc làm nào</>}
        </>
    )
}