import { Form, Input, Button, message, Spin, Checkbox } from "antd";
import "./Register.scss";
import { useNavigate } from "react-router";
import { useState } from "react";
import GoBack from '../../components/GoBack';
import { checkExist, registerAccount } from "../../services/companyServices";
import { generateToken } from '../../helpers/token';

export default function Register() {
    const [messageApi, contextHolder] = message.useMessage();
    const [spinning, setSpinning] = useState(false);
    const navigate = useNavigate();
    const [disabled, setDisabled] = useState(true);
    // input styles
    const inputStyles = {
        width: "400px"
    }

    const rules = [
        {
            required: true,
            message: 'Vui lòng điền!',
        }
    ];

    // Custom message:
    const messageCustom = (type, content) => {
        messageApi.open({
            type: type,
            content: content,
            duration: 1
        });
    };

    const handleRegister = async (dataObject) => {
        setSpinning(true);
        const finalData = {
            companyName: dataObject.companyName,
            phone: dataObject.phone,
            email: dataObject.email,
            password: dataObject.password,
            token: generateToken(20),
            quantityPeople: 0,
            description: "",
            detail: "",
            address: dataObject.address,
            workingTime: "",
            website: dataObject.website
        }
        const isExist = await checkExist(dataObject.email);
        // console.log(result)
        if (isExist.length === 0) {
            const result = await registerAccount(finalData);
            setSpinning(false);
            messageCustom("success", "Đăng kí tài khoản thành công");
            setTimeout(() => {
                navigate("/login");
            }, 1000)
        }
        else {
            setSpinning(false)
            messageCustom("warning", "Email này đã được dùng để đăng kí");
        }
    }

    // check terms
    const handleChange = (e) => {
        let checked = e.target.checked;
        if (checked === true) {
            setDisabled(false);
        }
        else setDisabled(true)
    }

    return (
        <>
        {contextHolder}
            <div className="p20">
                <GoBack />
                <div className="register">
                    <Spin spinning={spinning} tip="Vui lòng đợi">
                        <h2 className="register__name">Đăng kí tài khoản</h2>
                        <div className="register__form">
                            <Form onFinish={handleRegister}>
                                <Form.Item label="Tên công ty" name="companyName" rules={rules}>
                                    <Input placeholder="Tên công ty" style={inputStyles}/>
                                </Form.Item>

                                <Form.Item label="Email" name="email" rules={rules}>
                                    <Input placeholder="Email của bạn" style={inputStyles}/>
                                </Form.Item>

                                <Form.Item label="Mật khẩu" name="password" rules={rules}>
                                    <Input.Password placeholder="Mật khẩu của bạn" style={inputStyles}/>
                                </Form.Item>

                                <Form.Item label="Địa chỉ" name="address" rules={rules}>
                                    <Input placeholder="Vui lòng điền địa chỉ" style={inputStyles}/>
                                </Form.Item>

                                <Form.Item label="Website" name="website" rules={rules}>
                                    <Input placeholder="Vui lòng điền website" style={inputStyles}/>
                                </Form.Item>

                                <Form.Item label="Số điện thoại" name="phone">
                                    <Input placeholder="Vui lòng điền số điện thoại của bạn" style={inputStyles}/>
                                </Form.Item>

                                <Form.Item name="agreement" valuePropName="checked">
                                    <Checkbox onChange={handleChange}>Tôi đã đọc và đồng ý với <a href="#">điều khoản</a></Checkbox>
                                </Form.Item>

                                <div className="submit-btn">
                                    <Button disabled={disabled} type="primary" htmlType="submit">Đăng Kí</Button>
                                </div>
                            </Form>
                        </div>
                    </Spin>
                </div>
            </div>
        </>
    )
}