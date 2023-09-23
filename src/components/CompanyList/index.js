import { Button, Card, Col, Row } from "antd";
import "./CompanyList.scss";
import { Link } from "react-router-dom";
import { getCompanyList } from "../../services/companyServices";
import { useState, useEffect } from "react";

export default function CompanyList() {
    const [companyList, setCompanyList] = useState([]); 

    const fetchApi = async () => {
        const result = await getCompanyList();
        let newList = [];
        for (let i = 0; i < 4; i++) {
            newList.push(
                result[i]
            )
        }
        setCompanyList(newList);
    }

    useEffect(() => {
        fetchApi();
    },[])

    return (
        <>
            <div className="some-company">
                <h2>Danh sách một số công ty</h2>
                <Row gutter={[10,10]}>
                    {companyList.length > 0 && companyList.map((company, companyIndex) => 
                        <Col xxl={6} xl={6} lg={12} md={12} sm={24} xs={24} key={companyIndex + 1}>
                            <Card title={company.companyName} style={{width: 300}} extra={<Link to={"/company/" + company.id}>Thêm</Link>} key={companyIndex + 1}>
                                <p>Số người cần tuyển: <b>{company.quantityPeople}</b></p>
                                <p>Địa chỉ: <b>{company.address}</b></p>
                            </Card>
                        </Col>
                    )}
                </Row>
                <Button style={{marginTop: "30px"}} type="primary"><Link to="/company" className="more">Xem thêm</Link></Button>
            </div>
        </>
    )
}