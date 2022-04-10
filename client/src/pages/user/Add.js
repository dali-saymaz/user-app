import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, InputNumber, Button } from 'antd';
import style from './addUser.module.css';
import { useNavigate } from 'react-router-dom';
import { SuccessNotification } from '../../helpers/Notifications';

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};


const Add = () => {
    let navigate = useNavigate();
    const onFinish = async (values) => {
        console.log(values['user']);

        const res = await fetch(`http://localhost:5000/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(values['user']),
        });
        const response = await res.json();
        SuccessNotification({ description: response.message });
        navigate("/")
        console.log(response);


    };



    return (
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} className={style.form}>
            <h2 className={style.title}>Add A New User</h2>
            <Form.Item
                name={['user', 'name']}
                label="Name"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name={['user', 'username']}
                label="Username"
                rules={[
                    {
                        type: 'string',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name={['user', 'email']}
                label="Email"
                rules={[
                    {
                        type: 'email',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            {/* <Form.Item
                name={['user', 'age']}
                label="Age"
                rules={[
                    {
                        type: 'number',
                        min: 0,
                        max: 99,
                    },
                ]}
            >
                <InputNumber />
            </Form.Item>
            <Form.Item name={['user', 'website']} label="Website">
                <Input />
            </Form.Item>
            <Form.Item name={['user', 'introduction']} label="Introduction">
                <Input.TextArea />
            </Form.Item> */}
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit" >
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Add