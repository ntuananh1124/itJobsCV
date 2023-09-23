import { Button, Card, Col, Form, Input, Row, Select, message } from "antd";
import { useEffect, useState } from "react";
import { getTags } from "../../../services/tagsServices";
import { getCities } from "../../../services/cityServices";
import { getCookie } from "../../../helpers/cookie";
import { getCurrentTime } from "../../../helpers/getTime";
import { createJob } from "../../../services/jobServices";

export default function CreateJob() {
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const [tags, setTags] = useState([]);
    const [cities, setCities] = useState([]);
    const idCompany = getCookie("id");
    const [loading, setLoading] = useState(false)

    const rules = [
        {
            required: true,
            message: "Vui lòng điền"
        }
    ]

    const messageCustom = (type, content) => {
        messageApi.open({
            type: type,
            content: content,
            duration: 1
        });
    };

    const handleFinish = (dataObject) => {
        setLoading(true);
        let finalData = {
            ...dataObject,
            idCompany: parseInt(idCompany),
            status: true,
            createAt: getCurrentTime()
        }
        const postJob = createJob(finalData);
        if (postJob) {
            messageCustom("success", "Tạo công việc mới thành công")
            console.log(postJob);
            setLoading(false)
            form.resetFields();
        }
        else {
            messageCustom("error", "Tạo công việc mới không thành công");
            setLoading(false)
        }
    }

    const fetchApi = async () => {
        const result = await getTags();
        const cities = await getCities()
        if (result) {
            // console.log(result);
            setTags(result)
        }
        if (cities) {
            // console.log(cities);
            setCities(cities);
        }
    }

    useEffect(() => {
        fetchApi()
    }, [])

    return (
        <>
        {contextHolder}
            <Card title="Tạo công việc">
                <Form form={form} onFinish={handleFinish}>
                    <Row gutter={[10,10]}>
                        <Col span={24}>
                            <Form.Item label="Tên công việc" name="name" rules={rules}>
                                <Input placeholder="Vui lòng điền tên công việc" />
                            </Form.Item>
                        </Col>

                        <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
                            <Form.Item label="Mức lương" name="salary" rules={rules}>
                                <Input addonAfter="$" placeholder="Chọn mức lương"/>
                            </Form.Item>
                        </Col>

                        <Col xxl={16} xl={16} lg={16} md={12} sm={24} xs={24}>
                            <Form.Item label="Tags" name="tags" rules={rules}>
                                {tags && <Select placeholder="Chọn tags" mode="multiple" options={tags} placement="bottom"/>}
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item label="Thành phố" name="city" rules={rules}>
                                {cities && <Select placeholder="Chọn thành phố" mode="multiple" options={cities} placement="bottom"/>}
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item label="Chi tiết" name="detail" rules={rules}>
                                <Input.TextArea style={{minHeight: "150px"}} allowClear />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Button loading={loading} type="primary" htmlType="submit">Tạo</Button>
                </Form>
            </Card>
        </>
    )
}