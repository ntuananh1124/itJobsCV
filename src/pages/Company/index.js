import './Company.scss';
import GoBack from "../../components/GoBack";
import { Row, Col, Card } from "antd";
import { Link } from 'react-router-dom';
import { getCompanyListPagi } from '../../services/companyServices';
import { useEffect, useState } from 'react';
import { Pagination } from 'antd';

export default function Company() {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(4);
    const [companyList, setCompanyList] = useState([]);

    const fetchApi = async () => {
        const result = await getCompanyListPagi(page, limit);
        setCompanyList(result);
    };

    useEffect(() => {
        fetchApi();
    },[page]);

    const onSizeChange = (crr, pageSize) => {
        // console.log(crr, pageSize);
        setPage(crr);
    };

    return (
        <>
            <div className="company-list p20">
            <GoBack />
                <h2 className='company-list__name'>Danh sách các công ty</h2>
                <Row gutter={[10,10]}>
                    {companyList.length > 0 && companyList.map((company, companyIndex) => 
                        <>
                            <Col xxl={6} xl={6} lg={12} md={12} sm={24} xs={24} key={company.id}>
                                <Card title={company.companyName} style={{width: 300}} key={company.id} extra={<Link to={"/company/" + company.id}>Thêm</Link>}>
                                    <p>Số người cần tuyển: <b>{company.quantityPeople}</b></p>
                                    <p>Địa chỉ: <b>{company.address}</b></p>
                                </Card>
                            </Col>
                        </>
                    )}
                </Row>
                <Pagination
                    // showSizeChanger
                    onChange={onSizeChange}
                    current={page}
                    // align="center"
                    total={30}
                />
            </div>
        </>
    )
} 