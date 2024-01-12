import React, { useState } from 'react';
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { Descriptions, Modal } from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { Upload, Form, Input, Image, message } from "antd";
import ImgCrop from "antd-img-crop";
import { Divider } from 'antd';
import instance from '../services/axios';


const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
};
function Credential() {
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([
        {
            key: "username",
            label: "UserName",
            children: "Zhou Maomao"
        },
        {
            key: "email",
            label: "Email",
            children: "1810000000"
        },
        {
            key: "phoneNumber",
            label: "Phone Number",
            children: "Hangzhou, Zhejiang"
        },
        {
            key: "picture",
            label: "Picture",
            // sample base64 data
            children: null
        }
    ]);

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
        if (!isJpgOrPng) {
            message.error("You can only upload JPG/PNG file!");
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error("Image must smaller than 2MB!");
        }
        return isJpgOrPng && isLt2M;
    };
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([{}]);
    const [imageUrl, setImageUrl] = useState();
    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8
                }}
            >
                Upload
            </div>
        </div>
    );
    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };
    const handleChange = (info) => {
        if (info.file.status === "uploading") {
            setLoading(true);
            return;
        }
        if (info.file.status === "done") {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                setImageUrl(url);
                form.setFieldsValue({
                    picture: url
                });
            });
        }
    };
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleOnEdit = async (values) => {
        const user = await instance.put(`/editUser`, {
            username: values.username,
            email: values.email,
            phoneNumber: values.phoneNumber,
        });
        const getUsr = JSON.parse( localStorage.getItem("user"));
        getUsr.username = user.data.user.username;
        getUsr.email = user.data.user.email;
        getUsr.phoneNumber = user.data.user.phoneNumber;
        localStorage.setItem("user", JSON.stringify(getUsr));

        setIsModalOpen(false);
    };
    return (
        <>
            <Container className="col">
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between'

                }}>
                <div className='pt-5'><Divider orientation="left" orientationMargin="0"><span className="text-uppercase fw-bold fs-4">Thông tin người dùng</span></Divider></div>
                <div className='pt-5'><Button type="primary" onClick={showModal}>Edit</Button></div>
                </div>

                <Descriptions               >
                    <Descriptions.Item label="username">{JSON.parse(localStorage.getItem("user")).username}</Descriptions.Item>
                    <Descriptions.Item label="Email">{JSON.parse(localStorage.getItem("user")).email}</Descriptions.Item>
                    <Descriptions.Item label="Phone Number">{JSON.parse(localStorage.getItem("user")).phoneNumber}</Descriptions.Item>
               
                </Descriptions>
            </Container>
            <Modal title="User Information" open={isModalOpen} onOk={form.submit} onCancel={handleCancel}>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={
                        {
                            username: JSON.parse(localStorage.getItem("user")).username,
                            email: JSON.parse(localStorage.getItem("user")).email,
                            phoneNumber: JSON.parse(localStorage.getItem("user")).phoneNumber,

                        }
                    }
                    onFinish={handleOnEdit}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Please Input your username!"
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please Input your email!"
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Phone Number"
                        name="phoneNumber"
                        rules={[
                            {
                                required: true,
                                message: "Please Input your Phone Number!"
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default Credential
