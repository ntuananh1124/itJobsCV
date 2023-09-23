// eslint-disable-next-line
import { Button, Card, Col, Form, Input, Row, Select, Switch, message } from "antd";
import { useEffect, useState } from "react";
import { getCities } from "../../services/cityServices";
import { getTags } from "../../services/tagsServices";
import { getJobDetails, updateJob } from "../../services/jobServices";
import GoBack from "../../components/GoBack";
import { useParams } from "react-router";
import { getCurrentTime } from "../../helpers/getTime";
import { useDispatch, useSelector } from "react-redux";
import { CheckChangeField } from "../../actions/CheckChangeField";

export default function EditJob() {
    const [messageApi, contextHolder] = message.useMessage();
    const [cities, setCities] = useState();
    const [tags, setTags] = useState();
    const [form] = Form.useForm();
    const [job, setJob] = useState();
    const params = useParams();
    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [isDisabled, setDisabled] = useState(true)
    const isChange = useSelector(state => state.CheckChangeField);
    const [reload, setReload] = useState(false);

    // console.log(job);

    const rules = [
        {
            required: true,
            message: 'Vui lòng điền !',
        }
    ]

    const messageCustom = (type, content) => {
        messageApi.open({
            type: type,
            content: content,
            duration: 2
        });
    };

    const handleReload = () => {
        setReload(true)
    }

    const handleOk = async (dataObject) => {
        dataObject.updateAt = getCurrentTime();
        setLoading(true)
        // console.log(dataObject);
        const response = await updateJob(job.id, dataObject);
        if (response) {
            messageCustom("success", "Cập nhật thành công !");
            setLoading(false);
            setDisabled(true);
        }
        else {
            messageCustom("error", "Cập nhật không thành công !");
            setLoading(false);
            handleReload();
        }
    }

    const fetchApi = async () => {
        const resultCities = await getCities();
        if (resultCities) {
            setCities(resultCities);
        }

        const tagsResult = await getTags();
        if (tagsResult) {
            setTags(tagsResult);
        }

        const jobInfo = await getJobDetails(params.id)
        if (jobInfo) {
            setJob(jobInfo)
        }
    }

    useEffect(() => {
        fetchApi();
    }, [reload])

    const handleChange = (changedField) => {
        console.log(changedField[0].touched);
        dispatch(CheckChangeField(true))
        if (isChange === true) {
            setDisabled(false)
        }
    }

    return (
        <>
        {contextHolder}
        {job && <>
            <GoBack />
            <Card title="Chỉnh sửa thông tin việc làm" style={{marginTop: "10px"}}>
                <Form form={form} initialValues={job} onFinish={handleOk} onFieldsChange={handleChange}>
                    <Row gutter={[10,10]}>
                        <Col span={24}>
                            <Form.Item label="Tên công việc" name="name" rules={rules}>
                                <Input placeholder="Tên công việc" />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item label="Mức lương" name="salary" rules={rules}>
                                <Input addonAfter="$" placeholder="Chọn mức lương"/>
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item label="Tags" name="tags" rules={rules}>
                                {tags && <Select placeholder="Chọn tags" mode="multiple" options={tags} placement="bottom" allowClear/>}
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item label="Thành phố" name="city" rules={rules}> 
                                {cities && <Select placeholder="Chọn thành phố" mode="multiple" options={cities} placement="bottom" allowClear/>}
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item label="Chi tiết" name="detail" rules={rules}>
                                <Input.TextArea style={{minHeight: "150px"}} allowClear />
                            </Form.Item>
                        </Col>

                    </Row>
                    <Form.Item label="Trạng thái" name="status" rules={rules}>
                        <Switch checkedChildren="Bật" unCheckedChildren="Tắt" defaultChecked={job.status}/>
                    </Form.Item>
                    <Button disabled={isDisabled} type="primary" loading={isLoading} htmlType="submit">Cập nhật</Button>
                </Form>
            </Card>
        </>}
    </>
    )
}