import { Button, Form, Input, message, Spin } from "antd";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import { loginCompany } from "../../services/companyServices";
import { setCookie } from "../../helpers/cookie";
import GoBack from "../../components/GoBack";

export default function Login() {
    const [messageApi, contextHolder] = message.useMessage();
    const [spinning, setSpinning] = useState(false);
    const navigate = useNavigate();

    // input styles
    const inputStyles = {
        width: "400px"
    }

    const rules = [
        {
            required: true,
            message: 'Vui lòng điền!',
        }
    ]

    const messageCustom = (type, content) => {
        messageApi.open({
            type: type,
            content: content,
            duration: 1
        });
    };

    

    const handleLogin = async (dataObject) => {
        setSpinning(true);
        const result = await loginCompany(dataObject.email, dataObject.password);
        setTimeout(() => {
            if (result.length > 0) {
                setCookie("id", result[0].id, 1)
                setCookie("companyName", result[0].companyName, 1)
                setCookie("email", result[0].email, 1)
                setCookie("token", result[0].token, 1)
                messageCustom("success", "Đăng nhập thành công");
                // console.log(result);
                setTimeout(() => {
                    setSpinning(false);
                    navigate("/");
                }, 500)
            }
            else {
                messageCustom("error", "Đăng nhập thất bại");
                setSpinning(false)
            }
        }, 1000)
    }

    return (
        <>
        {contextHolder}
            <div className="login">
                <Spin spinning={spinning} tip="Vui lòng đợi">
                    <h2 className="login__form__name">Đăng Nhập</h2>
                    <div className="login__form">
                        <Form onFinish={handleLogin}>
                            <Form.Item label="Email" name="email" rules={rules}>
                                <Input placeholder="Email của bạn" style={inputStyles}/>
                            </Form.Item>
                                
                            <Form.Item label="Mật khẩu" name="password" rules={rules}>
                                <Input.Password placeholder="Mật khẩu của bạn" style={inputStyles}/>
                            </Form.Item>
                                
                            <div className="login__form__to-register">
                                <Link to="/register">Bạn chưa có tài khoản? Đăng kí ngay!</Link>
                            </div>

                            <div className="login__form__btn">
                                <Button type="primary" htmlType="submit">Đăng Nhập</Button>
                            </div>
                        </Form>
                    </div>
                </Spin>
            </div>
        </>
    )
}