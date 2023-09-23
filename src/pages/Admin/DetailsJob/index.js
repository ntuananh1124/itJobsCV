import { useEffect, useState } from "react";
import GoBack from "../../../components/GoBack";
import { getJobDetails } from "../../../services/jobServices";
import { Tag } from "antd";
import { useParams } from "react-router";

export default function DetailsJob() {
    const [job, setJob] = useState();
    const params = useParams();
// console.log(job);
    useEffect(() => {
        const fetchApi = async () => {
            const result = await getJobDetails(params.id);
            if (result) {
                setJob(result)
            }
        }
        fetchApi();
    }, [])

    return (
        <>
        {job && <div className="job-details">
                <GoBack />
                <div className="job-details__name-status">
                    <h1 className="job-details__name">{job.name}</h1>
                    {job.status ? <Tag color="green">Đang tuyển</Tag> : <Tag color="red">Không còn tuyển</Tag>}
                </div>
                <span>Tags: {job.tags && job.tags.map((tagItem, tagIndex) => (<Tag color="blue" key={tagIndex + 1}>{tagItem}</Tag>))} </span>
                <span>Thành phố: {job.city && job.city.map((cityItem, cityIndex) => (<Tag color="yellow" key={cityIndex + 1}>{cityItem}</Tag>))}</span>
                <span>Mức lương: <strong>{job.salary}$</strong></span>
                <span>Địa chỉ công ty: <strong>{job.address}</strong></span>
                <span>Thời gian đăng bài: <strong>{job.createAt}</strong></span>
                <span>Mô tả công việc: 
                    <p>{job.detail || job.description}</p>
                </span>
            </div>}
        </>
    )
}