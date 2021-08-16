import React from 'react';
import { Form, Input } from 'antd';
import http from '../api/http';
import { NotificationSuccess, NotificationError } from '../common/Notification';
import { useHistory } from 'react-router-dom';

function Login({ toggleRegister }) {
    const [form2] = Form.useForm();
    const history = useHistory();
    const onFinishLogin = async (values) => {
        try {
            const res = await http.post("/login", values)
            if (res?.status === 200) {
                // console.log("res", res);
                NotificationSuccess("", res?.data?.msg)
                localStorage.setItem("isLogin", true)
                localStorage.setItem("access_token", res?.data?.access_token)
                localStorage.setItem("refresh_token", res?.data?.refresh_token)
                localStorage.setItem("user", JSON.stringify(res?.data?.userInfo))
                history.push("/")
                form2.resetFields()
            }
        } catch (error) {
            NotificationError("", error?.msg)
        }

    };
    const onFinishFailedLogin = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            <h2>Đăng nhập</h2>
            <Form
                name="basic"
                onFinish={onFinishLogin}
                onFinishFailed={onFinishFailedLogin}
                layout="vertical"
                className="form"
                form={form2}
            >
                <Form.Item
                    label="Tài khoản"
                    name="email"
                    rules={[
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                const validation = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
                                if (value) {
                                    const listCheck = value.split("@");

                                    if (
                                        value.includes("..") ||
                                        listCheck[0].startsWith(".") ||
                                        listCheck[0].endsWith(".") ||
                                        (listCheck.length > 1 &&
                                            listCheck[1].startsWith(".")) ||
                                        (listCheck.length > 1 &&
                                            listCheck[1].endsWith("."))
                                    ) {
                                        return Promise.reject(
                                            "Email không đúng định dạng!"
                                        );
                                    }
                                    if (value.length > 255) {
                                        return Promise.reject(
                                            "Email vượt quá 255 ký tự!"
                                        );
                                    }
                                    if (validation.test(value)) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        "Email không đúng định dạng!"
                                    );
                                } else {
                                    return Promise.reject(`Vui lòng nhập Email!`);
                                }
                            },
                        }),
                    ]}
                >
                    <Input
                        placeholder="Nhập email của bạn"
                        style={{ borderRadius: '5px', padding: "8px" }}

                    // prefix={<MailOutlined twoToneColor="#ccc" className="icon-input" />}
                    />
                </Form.Item>

                <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value) {
                                    return Promise.reject(`Vui lòng nhập Mật khẩu!`);
                                }
                                if (value.length < 6) {
                                    return Promise.reject(
                                        "Mật khẩu phải có ít nhất 6-20 ký tự"
                                    );
                                }
                                if (value.length > 20) {
                                    return Promise.reject(
                                        "Mật khẩu không được quá 20 ký tự"
                                    );
                                }
                                return Promise.resolve();
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        placeholder="Nhập mật khẩu của bạn"
                        style={{ borderRadius: '5px', padding: "8px" }}
                    // prefix={<LockOutlined className="site-form-item-icon" />}
                    />
                </Form.Item>
                <Form.Item >
                    <button className="btn-login"
                        htmltype="submit">
                        Đăng nhập
                                            </button>
                    <p className="title-desc" style={{ paddingTop: "10px" }} onClick={toggleRegister}>Đăng ký tài khoản </p>
                </Form.Item>
            </Form>
        </>
    );
}

export default Login;