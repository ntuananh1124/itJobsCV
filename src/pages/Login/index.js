import { Button, Form, Input, message, Spin, Segmented } from "antd";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import { loginCompany } from "../../services/companyServices";
import { setCookie } from "../../helpers/cookie";
// import GoBack from "../../components/GoBack";
import { UserOutlined, HomeOutlined } from '@ant-design/icons';
import { loginUser } from "../../services/usersServices";
import FacebookLogin from "react-facebook-login";

export default function Login() {
    const [messageApi, contextHolder] = message.useMessage();
    const [spinning, setSpinning] = useState(false);
    const navigate = useNavigate();
    const [registerType, setType] =  useState('user');

    // input styles
    const inputStyles = {
        width: "400px"
    };

    const rules = [
        {
            required: true,
            message: 'Vui lòng điền!',
        }
    ];

    const messageCustom = (type, content) => {
        messageApi.open({
            type: type,
            content: content,
            duration: 1
        });
    };

    const handleLogin = async (dataObject) => {
        setSpinning(true);
        if (registerType === 'company') {
            const result = await loginCompany(dataObject.email, dataObject.password);
            setTimeout(() => {
                if (result.length > 0) {
                    setCookie("id", result[0].id, 1);
                    setCookie("companyName", result[0].companyName, 1);
                    setCookie("email", result[0].email, 1);
                    setCookie("token", result[0].token, 1);
                    setCookie("type", registerType);
                    messageCustom("success", "Đăng nhập thành công");
                    // console.log(result);
                    setTimeout(() => {
                        setSpinning(false);
                        navigate("/");
                    }, 500)
                }
                else {
                    messageCustom("error", "Đăng nhập thất bại");
                    setSpinning(false);
                }
            }, 1000);
        } else {
            setSpinning(true);
            const result = await loginUser(dataObject.email, dataObject.password);
            setTimeout(() => {
                if (result.length > 0) {
                    setCookie("id", result[0].id, 1);
                    setCookie("fullName", result[0].fullName, 1);
                    setCookie("email", result[0].email, 1);
                    setCookie("token", result[0].token, 1);
                    setCookie("type", registerType, 1);
                    messageCustom("success", "Đăng nhập thành công");
                    // console.log(result);
                    setTimeout(() => {
                        setSpinning(false);
                        navigate("/");
                    }, 500)
                }
                else {
                    messageCustom("error", "Đăng nhập thất bại");
                    setSpinning(false);
                }
            }, 1000);
        }
    }

    // change Segment
    const handleChangeSeg = (value) => {
        value === 'company' ? setType('company') : setType('user');
    };

    // fb login handle
    const responseFacebook = (res) => {
        console.log(res);
        if (res.error === undefined && res.status !== 'unknown') {
            setCookie("id", res.id, 1);
            setCookie("fullName", res.name, 1);
            setCookie("email", res.email, 1);
            setCookie("token", res.accessToken, 1);
            setCookie("type", registerType, 1);
            messageCustom("success", "Đăng nhập thành công");
            // console.log(result);
            setTimeout(() => {
                setSpinning(false);
                navigate("/");
            }, 500)
        } else {
            messageCustom("error", "Đăng nhập thất bại");
            setSpinning(false);
        }
    };

    return (
        <>
        {contextHolder}
            <div className="login">
                <Spin spinning={spinning} tip="Vui lòng đợi">
                    <h2 className="login__form__name">Đăng Nhập</h2>
                    <div className="center">
                        <span>Bạn là:</span>
                        <Segmented 
                            onChange={handleChangeSeg}
                            defaultValue={'user'}
                            options={[
                                {
                                label: 'Cá nhân',
                                value: 'user',
                                icon: <UserOutlined />,
                                },
                                {
                                label: 'Doanh nghiệp',
                                value: 'company',
                                icon: <HomeOutlined />,
                                },
                            ]}
                        />
                    </div>
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
                        {registerType === 'user' && <>    
                            <div className="or">OR</div>
                            <div className="login-with-fb">
                                <FacebookLogin
                                    appId="972059824510963"
                                    autoLoad={false}
                                    fields="name,email,picture"
                                    callback={responseFacebook}
                                    textButton="Đăng nhập với Facebook"
                                    cssClass="custom-facebook-button"
                                    icon="fa-facebook"
                                />
                            </div>
                        </>}
                    </div>
                </Spin>
            </div>
        </>
    )
}