import { Card, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { getJobsOfCompany } from "../../../services/jobServices";
import { getCookie } from "../../../helpers/cookie";
import { getCVDetails, getCVListOfCompany } from "../../../services/cvServices";
import { getCompany } from "../../../services/companyServices";

export default function Overview() {
    const [job, setJob] = useState();
    const [cv, setCV] = useState();
    const [company, setCompany] = useState()
    const idCompany = parseInt(getCookie("id")); 
    useEffect(() => {
        const fetchApi = async () => {
            // Job Info
            const resultJobs = await getJobsOfCompany(idCompany);
            if (resultJobs) {
                let obj = {
                    totalJob: 0,
                    jobOn: 0,
                    jobOff: 0
                }
                obj.totalJob = resultJobs.length
                resultJobs.forEach((item) => {
                    item.status ? obj.jobOn++ : obj.jobOff++;
                })
                // console.log(obj);
                setJob(obj);
            }
            
            // CV Info
            const resultCV = await getCVListOfCompany(idCompany);
            if (resultCV) {
                let objCV = {
                    totalCV: 0,
                    readCV: 0,
                    unReadCV: 0
                }
                objCV.totalCV = resultCV.length;
                resultCV.forEach((item) => {
                    item.statusRead ? objCV.readCV++ : objCV.unReadCV++
                })
                setCV(objCV);
            }

            //Company Info
            const companyResult = await getCompany(idCompany);
            if (companyResult) {
                setCompany(companyResult);
            }
        }
        fetchApi()
    }, [])
    return (
        <>
            <div className="overview">
                <Row gutter={[10,10]}>
                    <Col xxl={6} xl={6} lg={8} md={8} sm={24} xs={24}>
                        {job && 
                            <Card title="Job">
                                <p>Số lượng job: <strong>{job.totalJob}</strong></p>
                                <p>Job đang bật: <strong>{job.jobOn}</strong></p>
                                <p>Job đang tắt: <strong>{job.jobOff}</strong></p>
                            </Card>
                        }
                    </Col>
                    <Col xxl={6} xl={6} lg={8} md={8} sm={24} xs={24}>
                        {cv && 
                            <Card title="CV">
                                <p>Số lượng CV: <strong>{cv.totalCV}</strong></p>
                                <p>CV chưa đọc: <strong>{cv.unReadCV}</strong></p>
                                <p>CV đã đọc: <strong>{cv.readCV}</strong></p>
                            </Card>
                        }
                    </Col>
                    <Col xxl={6} xl={6} lg={8} md={8} sm={24} xs={24}>
                        {company && 
                            <Card title="Thông tin công ty">
                                <p>Tên công ty: <strong>{company.companyName}</strong></p>
                                <p>Email: <strong>{company.email}</strong></p>
                                <p>Số nhân sự: <strong>{company.quantityPeople}</strong></p>
                            </Card>
                        }
                    </Col>
                </Row>
            </div>
        </>
    )
}