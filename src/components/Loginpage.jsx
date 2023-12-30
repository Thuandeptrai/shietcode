import React, { useEffect, useState, useContext } from 'react'
import { Col, Divider, Row } from 'antd';
import { Button, Form, Input, InputNumber, Checkbox } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { UserContext } from '../context/ContextProvider';
import Tooltip from '@mui/material/Tooltip';
// use context set value for context
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import './Loginform.scss'


function Loginpage() {
    const Navigate = useNavigate();
    // use context set value for context
    const userContext = useContext(UserContext);
    const handleLogin = () => {
        userContext.setUser({
            name: 'admin',
            email: '',
        })
        localStorage.setItem('user', JSON.stringify({
            name: 'admin',
            email: '',
        }))
        Navigate('/dashboard')
    }
    return (
        <div className='app vh-100  d-flex align-items-center'>
            <div className='container bg-tertiary'>

                <div className='form py-4 row justify-content-center'>
                    <div className='col-md-12 col-lg-10 rounded'>
                        <div className='d-md-flex wrap border rounded '>


                            <img src={require('../1.jpg')} className="img" alt="..." />

                            <div className='container'>
                                <div >
                                    <Divider>
                                        <img src={require('../logo1.png')} width='40' alt="" />
                                    </Divider>

                                </div>

                                <div className='d-flex ps-1 pb-3 flex-column justify-content-center'>
                                    <h3 className='ps-xl-5 ps-lg-4 ms-lg-3 ms-sm-1'>Sign-In</h3>
                                    <div className='form ps-xl-5 ps-lg-4 ms-lg-3 ms-sm-1'>
                                        <Form
                                            name="normal_login"
                                            className="login-form"
                                            initialValues={{
                                                remember: true,
                                            }}

                                        >
                                            <Form.Item
                                                name="username"

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
                                            </Form.Item>

                                            <Form.Item>
                                                <Button type="primary" htmlType="submit" className="login-form-button" onClick={handleLogin}>
                                                    Log in
                                                </Button>

                                            </Form.Item>
                                            <Form.Item>
                                                <Button type="primary" htmlType="submit" className="login-form-button">
                                                    Face-ID <span className='opacity-0'>_</span> <i class="bi bi-person-bounding-box"></i>
                                                </Button>
                                                Or <a data-toggle="tab" href="auth/register">Register Now!</a>
                                            </Form.Item>
                                        </Form>
                                    </div>
                                    <Divider>
                                        <i role='button' onClick={Navigate('/')} className="bi bi-box-arrow-left"></i>
                                    </Divider>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loginpage
