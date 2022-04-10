import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox, Divider } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import style from './Login.module.css';
import { ErrorNotification, SuccessNotification } from "../../helpers/Notifications";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { useAuth } from '../../contexts/AuthContext';


const Login = () => {
    let navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['name']);

    const { name, user, setUser } = useAuth();

    const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        try {
            const res = await fetch(`http://localhost:5000/auth/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values),
            });
            const response = await res.json();
            setCookie('jwt', response.user.token, {
                path: '/', maxAge: 172800, // 2 days
                secure: false
            });
            if (res.ok) {
                setUser(response.user);
                SuccessNotification({ description: response.message });
                navigate("/");
            }
            else ErrorNotification({ description: response.message });
        } catch (error) {
            ErrorNotification({ description: error.message })
        }

    };

    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            className={style.form}
        >
            <h2>Login</h2>
            <Divider />
            <Form.Item
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                ]}

            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                    Forgot password
                </a>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button><br />
                Or <br /> <a href="">register now!</a>
            </Form.Item>
        </Form>
    );
};

export default Login;