import React from 'react';
import { Form, Input } from 'antd';
import http from '../api/http';
import { NotificationSuccess, NotificationError } from '../common/Notification';
function Register({ toggleRegister }) {
    const [form2] = Form.useForm();
    const onFinishRegister = async (value) => {
        try {
            const res = await http.post("/register", {
                username: value.name, email: value.email, password: value.password
            })
            if (res?.status === 200) {
                NotificationSuccess("", res?.data?.msg)
                toggleRegister()
                // form.resetFields()
                form2.resetFields()
            }
        } catch (error) {
            NotificationError("", error.msg)
        }

    }
    const onFinishFailedRegister = (e) => {
        console.log(e);

    }
    return (
        <>
            <h2>Đăng ký</h2>
            <Form
                name="basic"
                onFinish={onFinishRegister}
                onFinishFailed={onFinishFailedRegister}
                layout="vertical"
                className="form"
                form={form2}
            >

                <Form.Item
                    label="Tên người dùng"
                    name="name"
                    rules={[
                        () => ({
                            validator(rule, value) {
                                if (!value) return Promise.reject("Vui lòng nhập Tên người dùng!");
                                if (value?.length > 15) return Promise.reject("Tên người dùng không được lớn hơn 15 ký tự");
                                return Promise.resolve();
                            }
                        })
                    ]}
                >
                    <Input
                        placeholder="Nhập tên của bạn"
                        style={{ borderRadius: '5px', padding: "8px" }}

                    />
                </Form.Item>
                <Form.Item
                    label="Email"
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
                        Đăng ký
                                         </button>
                </Form.Item>
                <p className="title-desc" onClick={toggleRegister}>Đăng nhập nếu đã có tài khoản</p>
            </Form>
        </>
    );
}

export default Register;