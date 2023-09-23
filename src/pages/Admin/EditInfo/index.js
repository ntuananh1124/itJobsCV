import { useEffect, useState } from "react";
import "./EditInfo.scss";
import { Button, Card, Col, Form, Input, Row, InputNumber, Modal, message } from "antd";
import { getCookie } from "../../../helpers/cookie";
import { editCompany, getCompany } from "../../../services/companyServices";
import { useDispatch, useSelector } from "react-redux";
import {CheckChangeField} from "../../../actions/CheckChangeField";

export default function EditInfo() {
    const [isEditMode, setEditMode] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const idCompany = getCookie("id");
    const [infoCompany, setInfoCompany] = useState();
    const [openModal, setOpenModal] = useState(false);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const isChange = useSelector(state => state.CheckChangeField);
    const [reload, setReload] = useState(false)

    // console.log(infoCompany);

    const rules = [
        {
            required: true,
            message: "Vui lòng điền"
        }
    ]

    const fetchApi = async () => {
        const result = await getCompany(idCompany);
        if (result) {
            setInfoCompany(result);
        }
    }

    useEffect(() => {
        fetchApi();
    }, [reload])

    const handleClick = () => {
        setEditMode(!isEditMode);
    }

    const messageCustom = (type, content) => {
        messageApi.open({
            type: type,
            content: content,
            duration: 1
        });
    };

    const handleUpdate = async (dataObject) => {
        const result = await editCompany(idCompany, dataObject);
        if (result) {
            messageCustom("success", "Cập nhật thông tin thành công")
            setEditMode(false);
            dispatch(CheckChangeField(false));
            setReload(true);
        }
        else {
            messageCustom("error", "Xin vui lòng thử lại")
        }
    }

    const handleChange = (changedField) => {
        // console.log(changedField[0].touched);
        dispatch(CheckChangeField(true))
    }

    const handleClick2 = () => {
        if (isChange === true) {
            setOpenModal(true);
        }
        else {
            setOpenModal(false);
            setEditMode(!isEditMode);
        }
    }

    const handleOk = () => {
        // setReload(true);
        dispatch(CheckChangeField(false));
        setOpenModal(false);
        form.resetFields();
        setEditMode(!isEditMode)
    }

    const handleCancel = () => {
        setOpenModal(false)
    }

    return (
        <>
        {contextHolder}
        <Modal
        open={openModal}
        title="Thay đổi chưa được lưu, bạn vẫn muốn tiếp tục?"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={(_, { OkBtn, CancelBtn }) => (
            <>
                <CancelBtn />
                <OkBtn />
            </>
        )}>
        </Modal>
            <div className="company__info">
            {infoCompany && 
                (<Card title="Thông tin công ty" extra={isEditMode ? (<Button onClick={handleClick2}>Hủy</Button>) : (<Button onClick={handleClick}>Chỉnh sửa</Button>)}>
                    <Form form={form} disabled={!isEditMode} initialValues={infoCompany} onFinish={handleUpdate} onFieldsChange={handleChange}>
                        <Row gutter={[10,10]}>
                            <Col span={24}>
                                <Form.Item label="Tên công ty" name="companyName" rules={rules}>
                                    <Input placeholder="Vui lòng điền tên công ty" />
                                </Form.Item>
                            </Col>

                            <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
                                <Form.Item label="Email" name="email" rules={[...rules, {type: "email", message: "Vui lòng điền đúng định dạng email!"}]}>
                                    <Input />
                                </Form.Item>
                            </Col>

                            <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
                                <Form.Item label="Số điện thoại" name="phone">
                                    <Input />
                                </Form.Item>
                            </Col>

                            <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
                                <Form.Item label="Địa chỉ công ty" name="address" rules={rules}>
                                    <Input />
                                </Form.Item>
                            </Col>

                            <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
                                <Form.Item label="Số lượng nhân sự" name="quantityPeople">
                                    <InputNumber min={0} />
                                </Form.Item>
                            </Col>

                            <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
                                <Form.Item label="Thời gian làm việc" name="workingTime" rules={rules}>
                                    <Input />
                                </Form.Item>
                            </Col>

                            <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
                                <Form.Item label="Link website" name="website" rules={rules}>
                                    <Input />
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Form.Item label="Mô tả ngắn" name="description" rules={rules}>
                                    <Input.TextArea style={{minHeight: "100px"}} />
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Form.Item label="Chi tiết" name="detail" rules={rules}>
                                    <Input.TextArea style={{minHeight: "100px"}} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Button type="primary" htmlType="submit">Cập nhật</Button>
                    </Form>
                </Card>) }
            </div>
        </> 
    )
}