import React, { useContext, useState } from 'react'
import { Col, Divider, Row } from 'antd';
import { Button, Form, Input, InputNumber } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import Tooltip from '@mui/material/Tooltip';
import { message, Upload } from 'antd';
// use context set value for context
import { UserContext } from '../context/ContextProvider';


const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

const formItemLayout = {
    labelCol: {
        span: 7,
    },
    wrapperCol: {
        span: 32,
    },
};
const formTailLayout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 8,
        offset: 4,
    },
};
function RegisterPage() {
    const Navigate = useNavigate();
    // use context set value for context
    const userContext = useContext(UserContext);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
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
    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );
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
                                    <h3 className='ps-xl-5 ps-lg-4 ms-lg-3 ms-sm-1'>Register</h3>
                                    <div className='form ps-xl-5 ps-lg-4 ms-lg-3 ms-sm-1' >
                                        <Form
                                            form={form}
                                            name="dynamic_rule"
                                            style={{
                                                maxWidth: 600,
                                            }}

                                        >
                                            <Form.Item
                                                {...formItemLayout}
                                                name="username"
                                                label="Name/Email"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input your name',
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="Please input your name" />
                                            </Form.Item>
                                            <Form.Item
                                                name="password"
                                                label="Password"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input your password!',
                                                    },
                                                ]}
                                                hasFeedback
                                            >
                                                <Input.Password showCount maxLength={10} />
                                            </Form.Item>
                                            <Form.Item
                                                name="confirm"
                                                label="Confirm Password"
                                                dependencies={['password']}
                                                hasFeedback
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please confirm your password!',
                                                    },
                                                    ({ getFieldValue }) => ({
                                                        validator(_, value) {
                                                            if (!value || getFieldValue('password') === value) {
                                                                return Promise.resolve();
                                                            }
                                                            return Promise.reject(new Error('The new password that you entered do not match!'));
                                                        },
                                                    }),
                                                ]}
                                            >
                                                <Input.Password showCount maxLength={10} />
                                            </Form.Item>
                                            <Upload
                                                name="avatar"
                                                listType="picture-card"
                                                className="avatar-uploader"
                                                showUploadList={true}
                                                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                                beforeUpload={beforeUpload}
                                                onChange={handleChange}
                                            >
                                                {imageUrl ? (
                                                    <img
                                                        src={imageUrl}
                                                        alt="avatar"
                                                        style={{
                                                            width: '100%',
                                                        }}
                                                    />
                                                ) : (
                                                    uploadButton
                                                )}
                                            </Upload>
                                        </Form>
                                    </div>
                                    <Divider>
                                        <i role='button' className="bi bi-box-arrow-left"></i>
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

export default RegisterPage
