import { useEffect, useState } from "react"
import { getJobDetails, getJobOfCompany, getJobsOfCompany } from "../../services/jobServices";

export default function CVJobName({cv}) {
    // console.log(cv.idJob);
    const [job, setJob] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const result = await getJobOfCompany(cv.idJob, cv.idCompany);
            // console.log(result);
            if (result) {
                // console.log(result);
                setJob(result)
            }
        }
        fetchApi();
    },[])
    // console.log(job);

    return (
        <>
            {job.length > 0 ? <span>{job[0].name}</span> : <span><i>Công việc này đã bị xóa</i></span>}
        </>
    )
}