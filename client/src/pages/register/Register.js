import React, { useState } from "react";
import "antd/dist/antd.css";
import style from "./Register.module.css";
import { useCookies } from 'react-cookie';
import {
    Form,
    Input,
    Select,
    Checkbox,
    Button,
} from "antd";
import { ErrorNotification, SuccessNotification } from "../../helpers/Notifications";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';

const { Option } = Select;



const formItemLayout = {
    labelCol: {
        xs: {
            span: 24
        },
        sm: {
            span: 8
        }
    },
    wrapperCol: {
        xs: {
            span: 24
        },
        sm: {
            span: 16
        }
    }
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0
        },
        sm: {
            span: 16,
            offset: 8
        }
    }
};

const Register = () => {
    const [form] = Form.useForm();
    const [cookies, setCookie] = useCookies(['name']);
    let navigate = useNavigate();
    const { name, user, setUser } = useAuth();

    const onFinish = async (values) => {
        try {
            const res = await fetch(`http://localhost:5000/auth/register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values),
            });
            const response = await res.json();
            console.log(response);
            setCookie('jwt', response.user.token, {
                path: '/', maxAge: 86400,
                secure: false
            });
            setUser(response.user);
            SuccessNotification({ description: response.message });
            navigate("/")
        } catch (error) {
            ErrorNotification({ description: error.message })
        }

    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 70
                }}
            >
                {Array.from(Array(100).keys()).map((value) => (<Option key={value} value={value}>+{value}</Option>))}

            </Select>
        </Form.Item>
    );

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
                residence: ["zhejiang", "hangzhou", "xihu"],
                prefix: "+41"
            }}
            scrollToFirstError
            className={style.form}
        >
            <h2>Register</h2>
            <Form.Item
                name="first_name"
                label="First Name"
                rules={[
                    {
                        required: true,
                        message: "Please input your first name!",
                        whitespace: true
                    }
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="last_name"
                label="Last Name"
                rules={[
                    {
                        required: true,
                        message: "Please input your last name!",
                        whitespace: true
                    }
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: "email",
                        message: "The input is not valid E-mail!"
                    },
                    {
                        required: true,
                        message: "Please input your E-mail!"
                    }
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: "Please input your password!"
                    }
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: "Please confirm your password!"
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                                return Promise.resolve();
                            }

                            return Promise.reject(
                                new Error("The two passwords that you entered do not match!")
                            );
                        }
                    })
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                    {
                        required: true,
                        message: "Please input your phone number!"
                    }
                ]}
            >
                <Input
                    addonBefore={prefixSelector}
                    style={{
                        width: "100%"
                    }}
                />
            </Form.Item>

            <Form.Item
                name="gender"
                label="Gender"
                rules={[
                    {
                        required: true,
                        message: "Please select gender!"
                    }
                ]}
            >
                <Select placeholder="select your gender">
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                    <Option value="other">Other</Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                    {
                        validator: (_, value) =>
                            value
                                ? Promise.resolve()
                                : Promise.reject(new Error("Should accept agreement"))
                    }
                ]}
                {...tailFormItemLayout}
            >
                <Checkbox>
                    I have read the <a href="">agreement</a>
                </Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
            </Form.Item>
        </Form>
    );
};
export default Register;