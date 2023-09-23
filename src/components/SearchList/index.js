import { Card, Col, Row, Tag, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCompanyList } from "../../services/companyServices";


export default function SearchList({data}) {
    const [finalData, setFinalData] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const companyListResult = await getCompanyList();
            if (companyListResult) {
                let newData = data.map((itemData) => {
                    const infoCompany = companyListResult.find((item) => item.id == itemData.idCompany);
                    return {
                        infoCompany: infoCompany,
                        ...itemData
                    }
                })
                // console.log(newData);
                setFinalData(newData);
            }
        }
        fetchApi();
    }, [])

    return (
        <>
            {finalData.length > 0 ? <>
                    <Row gutter={[20,20]}>
                        {finalData.map((job, jobIndex) => (
                            <Col xxl={6} xl={6} lg={8} md={8} sm={12} xs={24} key={jobIndex + 1}>
                                <Card size="small" title={<Tooltip title={job.name}><Link to={"/job/" + job.id}>{job.name}</Link></Tooltip>}>
                                    <p className="overflow">Ngôn ngữ: {job.tags.map((tagItem, tagIndex) => (
                                        <Link to={`search?tag=${tagItem || ""}`} key={tagIndex + 1}><Tag color="processing">{tagItem}</Tag></Link>
                                    ))}</p>
                                    <p className="overflow">Thành phố: {job.city.map((cityItem, cityIndex) => (
                                        <Link to={`search?tag=${cityItem || ""}`} key={cityIndex + 1}><Tag color="warning">{cityItem}</Tag></Link>
                                    ))}</p>
                                    <p>Công ty: <strong>{job.infoCompany.companyName}</strong></p>
                                    <p>Lương: <strong>{job.salary}$</strong></p>
                                    <p>Ngày tạo: <strong>{job.createAt}</strong></p>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </> : <>
                        <div>Không có kết quả</div>
            </>}
        </>
    )
}