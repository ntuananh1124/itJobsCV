import { useParams } from "react-router"
import GoBack from "../../../components/GoBack";
import { useEffect, useState } from "react";
import { changeStatusCV, getCVDetails } from "../../../services/cvServices";
import { Card, Col, Row, Tag } from "antd";
import './DetailsCV.scss';
import { getJobDetails } from "../../../services/jobServices";

export default function DetailsCV() {
    const params = useParams();
    const [cvDetails, setCVDetails] = useState();
    const [jobDetails, setJobDetails] = useState();

    useEffect(() => {
        const fetchApi = async () => {
            const result = await getCVDetails(params.id);
            if (result) {
                const responseJob = await getJobDetails(result.idJob)
                setCVDetails(result);
                setJobDetails(responseJob);
                // console.log(responseJob);
            }
            
            changeStatusCV(params.id, {statusRead: true});
        } 
        fetchApi()
    },[])

    return (
        <>
            {cvDetails && 
            <>
                <GoBack />
                <Row gutter={[20,20]} className="mt-10">
                    <Col span={24}>
                        <Card title={"Tên ứng viên: " + cvDetails.name}>
                            <p>Ngày gửi: <strong>{cvDetails.createAt}</strong></p>
                            <p>Số điện thoại: <strong>{cvDetails.phone}</strong></p>
                            <p>Email: <strong>{cvDetails.email}</strong></p>
                            <p>Thành phố ứng tuyển: <strong>{cvDetails.city}</strong></p>
                            <span>Giới thiệu bản thân:</span>
                            <p>{cvDetails.description}</p>
                            <span>Link Project:</span>
                            <p>{cvDetails.linkProject}</p>
                            <span>CV:</span>
                            <p>{cvDetails.cv.name ? cvDetails.cv : "Chua co cv"}</p>
                        </Card>
                    </Col>
                    {jobDetails && 
                    <Col span={24}>
                        <Card title={"Thông tin job: " + jobDetails.name}>
                            <p>Tags: {jobDetails.tags.map((tagItem, tagIndex) => <Tag key={tagIndex + 1} color="blue">{tagItem}</Tag>)}</p>
                            <p>Thành phố: {jobDetails.city.map((cityItem, cityIndex) => <Tag key={cityIndex + 1} color="yellow">{cityItem}</Tag>)}</p>
                            <p>Mức lương: <strong>{jobDetails.salary}$</strong></p>
                            <p>Tạo vào: <strong>{jobDetails.createAt}</strong></p>
                            {jobDetails.updateAt && 
                            <p>Chỉnh sửa lần cuối: <strong>{jobDetails.updateAt}</strong></p>
                            }
                            <span>Mô tả:</span>
                            <p>{jobDetails.detail || jobDetails.description}</p>
                        </Card>
                    </Col>
                    }
                </Row>
            </>}
        </>
    )
}