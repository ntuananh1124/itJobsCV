import { useEffect, useState } from "react";
import GoBack from "../../components/GoBack";
import { useNavigate, useParams } from "react-router";
import { getJobDetails } from "../../services/jobServices";
import { Button, Card, Col, Form, Input, Row, Select, Tag, message } from "antd";
import "./JobDetails.scss"
import { getCompany } from "../../services/companyServices";
import { createCV } from "../../services/cvServices";
import { getCurrentTime } from "../../helpers/getTime";
import { getCookie } from "../../helpers/cookie";
// import UploadFile from "../../components/UploadFile";

export default function JobDetails() {
    const [loading, setLoading] = useState(false);
    const [job, setJob] = useState({});
    const [city, setCity] = useState();
    const [file, setFiles] = useState();
    const [messageApi, contextHolder] = message.useMessage();
    const param = useParams();
    const [isSameCompany, setIsSameCompany] = useState(false);
    const idCompanyC = getCookie('id');
    const [form] = Form.useForm();
    const token = getCookie('token');
    const navigate = useNavigate();

    const rules = [
        {
            required: true,
            message: 'Vui lòng điền!',
        },
    ]

    const messageCustom = (type, content) => {
        messageApi.open({
            type: type,
            content: content,
            duration: 1
        });
    };

    const fetchApi = async () => {
        const result = await getJobDetails(param.id);
        const companyInfo = await getCompany(result.idCompany)
        // console.log(result);
        // console.log(companyInfo);
        // console.log(result);
        if (result) {
            // console.log('have data');
            // console.log('id Company in Cookie', Number(idCompanyC));
            // console.log('id Job Company', result.idCompany);
            if (result.idCompany === Number(idCompanyC)) {
                console.log('is Same');
                setIsSameCompany(true);
            }
            let newData = {
                address: companyInfo.address,
                companyName: companyInfo.companyName,
                ...result
            };
            setJob(newData);
            let abcd = [];
            for (const city of newData.city) {
                abcd = [
                    ...abcd,
                    {
                        label: city,
                        value: city
                    }
                ]
            }
            setCity(abcd);
        }
    }

    // console.log(job);

    useEffect(() => {
        fetchApi();
    }, []);

    const handleFinish = async (dataObject) => {
        // console.log(dataObject);
        setLoading(true);
        let finalData = {
            ...dataObject,
            cv: file,
            idCompany: job.idCompany,
            idJob: job.id,
            statusRead: false,
            createAt: getCurrentTime()
        }
        console.log(finalData);
        if (token) {
            const result = await createCV(finalData);
    
            if (result) {
                setLoading(false);
                messageCustom("success", "Bạn đã gửi CV thành công !");
                form.resetFields();
            }
            else {
                setLoading(false);
                messageCustom("error", "Gửi CV không thành công !");
            }
        }
        else {
            alert('Vui lòng đăng nhập để gửi CV');
            navigate("/login");
        }
    }

    // File Handle

    const handleChangeFile = (event) => {
        console.log(event.target.files[0]);
        setFiles(event.target.files[0]);
    }

    return (
        <>
        {contextHolder}
            {job && city && (<>
                <div className="p20 job-details">
                    <GoBack />
                    <div className="job-details__name-status">
                        <h1 className="job-details__name">{job.name}</h1>
                        {job.status ? <Tag color="green">Đang tuyển</Tag> : <Tag color="red">Không còn tuyển</Tag>}
                    </div>
                    <a href="#formApply" style={{width: "fit-content"}}>
                        <Button disabled={!job.status} style={{width: "fit-content", textTransform: "uppercase"}} type="primary" size="large">Ứng tuyển ngay</Button>
                    </a>
                    <span>Tags: {job.tags && job.tags.map((tagItem, tagIndex) => (<Tag color="blue" key={tagIndex + 1}>{tagItem}</Tag>))} </span>
                    <span>Thành phố: {job.city && job.city.map((cityItem, cityIndex) => (<Tag color="yellow" key={cityIndex + 1}>{cityItem}</Tag>))}</span>
                    <span>Mức lương: <strong>{job.salary}$</strong></span>
                    <span>Tên công ty: <strong>{job.companyName}</strong></span>
                    <span>Địa chỉ công ty: <strong>{job.address}</strong></span>
                    <span>Thời gian đăng bài: <strong>{job.createAt}</strong></span>
                    <span>Mô tả công việc: 
                        <p>{job.detail || job.description}</p>
                    </span>
                    
                    {/**Apply Form */}
                    <Card title="Ứng tuyển ngay" id="formApply">
                        <Form disabled={!job.status} form={form} name="form_apply" onFinish={handleFinish}>
                            <Row gutter={[20,20]}>
                                <Col span={6}>
                                    <Form.Item rules={rules} label="Họ tên" name="name">
                                        <Input placeholder="Họ và tên" />
                                    </Form.Item>
                                </Col>

                                <Col span={6}>
                                    <Form.Item rules={rules} label="Số điện thoại" name="phone">
                                        <Input placeholder="Số điện thoại" />
                                    </Form.Item>
                                </Col>

                                <Col span={6}>
                                    <Form.Item rules={[...rules, {type: "email", message: "Vui lòng điền đúng định dạng email"}]} label="Email" name="email">
                                        <Input placeholder="Email" />
                                    </Form.Item>
                                </Col>

                                <Col span={6}>
                                    <Form.Item rules={rules} label="Thành phố" name="city">
                                        {job.city && <Select options={city} placeholder="Thành phố" allowClear/>}
                                    </Form.Item>
                                </Col>

                                <Col span={24}>
                                    <Form.Item rules={rules} label="Giới thiệu bản thân" name="description">
                                        <Input.TextArea placeholder="Vui lòng điền" style={{minHeight: "200px"}} allowClear />
                                    </Form.Item>
                                </Col>

                                <Col span={24}>
                                    <Form.Item rules={rules} label="Link Project đã làm" name="linkProject">
                                        <Input.TextArea placeholder="Vui lòng điền" style={{minHeight: "200px"}} allowClear />
                                    </Form.Item>
                                </Col>

                                <Col span={24}>
                                    
                                    <input type="file" id="myFile" name="cv" onChange={handleChangeFile}/>
                                    
                                </Col>
                            </Row>

                            <Button loading={loading} htmlType="submit" type="primary" disabled={isSameCompany} style={{textTransform: "uppercase"}}>GỬI YÊU CẦU ỨNG TUYỂN</Button>
                        </Form>
                    </Card>
                </div>
            </>)}
        </>
    )
}