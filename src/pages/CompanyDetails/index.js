import { Card, Col, Row, Tag, Tooltip } from "antd";
import GoBack from "../../components/GoBack";
import "./CompanyDetails.scss";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCompany } from "../../services/companyServices";
import { getJobsOfCompany } from "../../services/jobServices";

export default function CompanyDetails() {
    const param = useParams();
    const [infoCompany, setInfoCompany] = useState({});
    const [jobList, setJobList] = useState([]);

    // const infoCompany =
    // {
    //     id: 1,
    //     name: "Công ty ABC",
    //     address: "123 đường Trần Phú",
    //     personnel: 8,
    //     workingTime: "Thứ 2 - Thứ 6",
    //     linkWeb: "https://abc.com",
    //     description: "loremsdkasd ayisdgyiasgdi afyig79gfUABFIa fvdyifQYDVhkqdgiyfs casdfyagfhkgfu afhfy8fgWIEHFVEWGFCAYIGFYIAVHGwydc guasfcyDHKWVFYIQvdcvyfdcyc  hfyIGFYqvdqQI VQYDFYD VQYUDQYDLqf iwhywegsfyiatfwrg buowryghsbjfhsb b wuifgweufw;  fjwogfuwbwefg yiWEGFYWEF HOITHWJBAWJL" 
    // };

    // const jobList = [
    //     {
    //         id: 1,
    //         idCompany: 1,
    //         name: "Frontent Dev (Angular/ReactJS)",
    //         tags: [
    //             "ReactJS", "Angular", "TypeScript"
    //         ],
    //         salary: "1000",
    //         city: [
    //             "Hà Nội", "Đà Nẵng", "Thanh Hóa"
    //         ],
    //         description: "Top 3 reasons to join us: najsdcbi wudfhuib dcuhbd"
    //     },
    //     {
    //         id: 2,
    //         idCompany: 1,
    //         name: "Backend Dev (NodeJS)",
    //         tags: [
    //             "NodeJS", "PHP", "Ruby"
    //         ],
    //         city: [
    //             "Hà Nội", "Đà Nẵng"
    //         ],
    //         salary: "2000",
    //         description: "Top 3 reasons to join us: najsdcbi wudfhuib dcuhbd"
    //     },
    //     {
    //         id: 3,
    //         idCompany: 1,
    //         name: "Backend Dev",
    //         tags: [
    //             "NodeJS", "PHP"
    //         ],
    //         city: [
    //             "Hà Nội", "TP Hồ Chí Minh"
    //         ],
    //         salary: "1500",
    //         description: "Top 3 reasons to join us: najsdcbi wudfhuib dcuhbd"
    //     }
    // ]

    const fetchApi = async () => {
        const company = await getCompany(param.id);
        const jobs = await getJobsOfCompany(param.id);
        setInfoCompany(company);
        // console.log(...company);
        setJobList(jobs);
        // console.log(jobs);
    }

    // console.log(jobList);

    useEffect(() => {
        fetchApi()
    }, [])

    return (
        <>
            {infoCompany && (
                <>
                    <div className="company p20">
                        <GoBack />
                        <h1 className="company__name">{infoCompany.companyName}</h1>

                        <div className="company__address">
                            <span>Địa chỉ: </span>
                            <strong>{infoCompany.address}</strong>
                        </div>

                        <div className="company__personnel">
                            <span>Số nhân sự cần tuyển: </span>
                            <strong>{infoCompany.quantityPeople}</strong>
                        </div>

                        <div className="company__time">
                            <span>Lịch làm việc: </span>
                            <strong>{infoCompany.workingTime}</strong>
                        </div>

                        <div className="company__website">
                            <span>Link website: </span>
                            <strong>{infoCompany.website}</strong>
                        </div>

                        <div className="company__description">
                            <span>Mô tả: </span>
                            <p>{infoCompany.description}</p>
                        </div>

                        <div className="company__job-list">
                            <p>Danh sách các job</p>
                            <Row gutter={[20,10]}>
                            {jobList.length > 0 ? jobList.map((job, jobIndex) => (
                                <Col span={6} key={jobIndex + 1}>
                                    <Card title={<Tooltip title={job.name}><Link to={"/job/" + job.id}>{job.name}</Link></Tooltip>} size="small">
                                        <p className="overflow">Ngôn ngữ: {job.tags.map((tagItem, tagIndex) => (
                                            <Link to={`search?tag=${tagItem || ""}`} key={tagIndex + 1}><Tag color="processing">{tagItem}</Tag></Link>
                                            ))}
                                        </p>
                                        <p className="overflow">Thành phố: {job.city.map((cityItem, cityIndex) => (
                                            <Link to={`search?tag=${cityItem || ""}`} key={cityIndex + 1}><Tag color="warning">{cityItem}</Tag></Link>
                                        ))}</p>
                                        <p>Lương: <strong>{job.salary}$</strong></p>
                                    </Card>
                                </Col>
                                )) : (
                                    <>
                                        <div>Công ty này chưa có công việc nào</div>
                                    </>
                                )}
                            </Row>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}