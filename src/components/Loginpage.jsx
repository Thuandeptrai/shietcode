import React, { useEffect, useState, useContext } from "react";
import { Col, Divider, Row } from "antd";
import { Button, Form, Input, InputNumber, Checkbox } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { UserContext } from "../context/ContextProvider";
import { ToastContainer, toast } from "react-toastify";
import instance from "./services/axios";
import Tooltip from "@mui/material/Tooltip";
// use context set value for context
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "./Loginform.scss";

function Loginpage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  // use context set value for context
  const userContext = useContext(UserContext);
  const handleLogin = async () => {
    setLoading(true);
    try {
      const { username, password } = form.getFieldsValue();
      const res = await instance.post("/loginWithPassword", { username, password });
    if (res.status === 200) {
        toast.success("Login success",{
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
        });
        setTimeout(() => {
          userContext.setUser(res.data.message);
          localStorage.setItem("user", JSON.stringify(res.data.message));
        }, 5000);
        
      }
      setLoading(false);
    } catch (error) {
      toast.error("Login fail",{
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
      });
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <div className="app vh-100  d-flex align-items-center">
      <div className="container bg-tertiary">
        <div className="form py-4 row justify-content-center">
          <div className="col-md-12 col-lg-10 rounded">
            <div className="d-md-flex wrap border rounded ">
              <img src={require("../1.jpg")} className="img" alt="..." />

              <div className="container">
                <div>
                  <Divider>
                    <img src={require("../logo1.png")} width="40" alt="" />
                  </Divider>
                </div>

                <div className="d-flex ps-1 pb-3 flex-column justify-content-center">
                  <h3 className="ps-xl-5 ps-lg-4 ms-lg-3 ms-sm-1">Sign-In</h3>
                  <div className="form ps-xl-5 ps-lg-4 ms-lg-3 ms-sm-1">
                    <Form
                      form={form}
                      name="normal_login"
                      className="login-form"
                      initialValues={{
                        remember: true
                      }}
                    >
                      <Form.Item
                        name="username"
                        rules={[
                          {
                            required: true,
                            message: "Please input your Username!"
                          }
                        ]}
                      >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                      </Form.Item>
                      <Form.Item
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "Please input your Password!"
                          }
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
                        <Button
                          type="primary"
                          className="login-form-button"
                          onClick={handleLogin}
                          disabled={loading === true ? true : false}
                        >
                          Log in
                        </Button>
                      </Form.Item>
                      <Form.Item>
                        <Link to="/auth/faceid">
                          <Button type="primary" className="login-form-button">
                            Click here to login with FaceID
                          </Button>
                        </Link>
                      </Form.Item>
                      <Form.Item>
                        <Link to="/auth/register">Register now!</Link>
                      </Form.Item>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginpage;
