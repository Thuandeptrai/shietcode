import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Room.scss";
import { Card, CardContent, TextField, Modal, Button as Button1, Checkbox, Form, Input,Space, Table, Tag } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ButtonGroup from "@mui/material/ButtonGroup";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { Divider } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import { Button as button1, Flex } from 'antd';
import instance from "../services/axios";
const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

function Room({ showToast }) {
  const [dataroom, dataroomchange] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [from] = Form.useForm();
  useEffect(() => {
    const getAllKey = async () => {
       const res = await instance.get("/key");
      dataroomchange(res.data);
    }
    getAllKey();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Container className="col bg-body-tertiary">
        <div className="head-bar pt-5 d-flex justify-content-between">
          <Divider orientation="left" orientationMargin="0"><span className="text-uppercase fw-bold fs-4">Vị trí</span></Divider>
        </div>
        <ToastContainer limit={2} />
        <div className="badge-button mt-3 d-flex ">
          <button className="btn btn-outline-secondary btn-sm me-3">
            Tổng số thiết bị <span className="badge text-bg-secondary">4</span>
          </button>
          <button className="btn btn-outline-secondary  btn-sm">
            Thiết bị đang hoạt động <span className="badge text-bg-secondary">4</span>
          </button>
          <button type="button" className="btn btn-success ms-auto" size="small" onClick={showModal}>
            <i class="bi  bi-plus"></i>Thêm phòng
          </button>
        </div>
        <div className="table-devices pt-4">
          <table className="table table-hover table-sm ">
            <thead>
              <tr className="table-warning">
                <th>TT</th>
                <th>Vị trí</th>
                <th>Key</th>

                <th>Hoạt động</th>
              </tr>
            </thead>
            <tbody>
              {dataroom && dataroom.length > 0 ? (
                // Dataroom && Dataroom.length > 0 ?
                dataroom &&
                dataroom.map((item, idx) => {
                  return (
                    <tr key={idx}>
                      <td>{idx}</td>

                      <td role="button" className="text-warning">
                        {item.name}
                      </td>
                      <td role="button" className="text-warning">
                        {item.key}
                      </td>
                      <td>
                        {item.isActive ? (<Tag color="success">Hoạt động</Tag>) : (<Tag color="error">Không hoạt động</Tag>)}
                      </td>
                      {/* <td>
                        <ButtonGroup variant="text" aria-label="outlined button group">
                          <Button size="small" onClick={() => alert(item.id)}>
                            <i class="bi bi-pencil"></i>
                          </Button>
                          <Button size="small">
                            <i class="bi  bi-trash" onClick={() => alert(item.id)}></i>
                          </Button>
                        </ButtonGroup>
                      </td> */}
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="text-center">
                    <Stack sx={{ width: "100%" }} spacing={2}>
                      <Alert severity="info">
                        Chưa có thiết bị nào trong phòng | <b>Nhấn 'Thêm thiết bị' để tạo thiết bị mới</b>
                      </Alert>
                    </Stack>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Container>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Card sx={{ minWidth: 275 }}>
          <Form
            from={from}
            name="basic"
            labelCol={{
              span: 8
            }}
            wrapperCol={{
              span: 16
            }}
            style={{
              maxWidth: 600
            }}
            initialValues={{
              remember: true
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Tên Phòng"
              name="roomname"
              rules={[
                {
                  required: true,
                  message: "Ten phong khong duoc de trong"
                }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Mô tả"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Mo ta khong duoc de trong"
                }
              ]}
            >
              <Input />
            </Form.Item>




          </Form>
        </Card>
      </Modal>
    </>
  );
}

export default Room;
