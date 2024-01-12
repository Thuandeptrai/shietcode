import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// Grid atnd
import { Row, Col, Switch } from "antd";
import { Pie } from "react-chartjs-2";
import { Intensity, PM, Temperature } from "react-environment-chart";
import instance from "./services/axios";
import { Routes, Route, useParams } from "react-router-dom";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function DetailsPage2() {
  let { id } = useParams();
  const [data, setData] = useState(null);
  const [currentData, setCurrentData] = useState(null);
  const [stateDevice, setStateDevice] = useState(false);
  const [enable, setEnable] = useState(false);
  const [enable2, setEnable2] = useState(false);
  const websocket = React.useRef(null);

  useEffect(() => {

    const getDetailKey = async () => {
    websocket.current = new WebSocket("ws://159.223.71.166:8120");
      
      const res = await instance.get(`/key/${id}`);
      console.log(res.data);
      setData(res.data);
      websocket.current.onopen = () => {
        console.log("connected");
      };
      websocket.current.onmessage = (event) => {
        // check if is valid JSON type
        try {
          const data = JSON.parse(event.data);
          if (data.length === 0) {
            setCurrentData([]);
            setStateDevice(false);
            return;
          }
          for (let i = 0; i < data.length; i++) {
            if (data[i].id === res.data.key) {
              setStateDevice(true);
              setCurrentData(data[i]);
            }
          }
        } catch (err) {
          console.log(err);
        }
      };
    };
    getDetailKey();
  }, []);
  const onChangeDevice1 = (checked) => {
    // wait 1 second
    websocket.current.send(JSON.stringify({ type: "message", id: data.key, device1: checked ? 1 : 0 }));

    // set Disable Switch for 1 second
  };
  const onChangeDevice2 = (checked) => {
    console.log(`switch to ${checked}`);
    websocket.current.send(JSON.stringify({ type: "message", id: data.key, device2: checked ? 1 : 0 }));
  };
  console.log("currentData", currentData);
  return (
    <>
      {/* need divine matrix 3x3 */}
      <div className="col ">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "space-between",
            height: "100px"
          }}
        >
          <h1>State of Device {stateDevice ? "On" : "Off"}</h1>
          <h1>Device Id: {data?.key}</h1>
        </div>
        <Row
          style={{
            height: "300px",
            width: "100%"
          }}
        >
          <Col
            span={8}
            style={{
              // center all element
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <h3>{data?.device1}</h3>
            <Switch
              onChange={onChangeDevice1}
              value={currentData?.device1 === 1 ? true : false}
              checkedChildren="On"
              unCheckedChildren="Off"
              disabled={enable || stateDevice ? false : true}
            />
          </Col>
          <Col
            span={8}
            style={{
              // center all element
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <h3>{data?.device2}</h3>
            {/* set Size Switch Bigger */}
            <Switch
              size="large"
              defaultChecked
              onChange={onChangeDevice2}
              value={currentData?.device2 === 1 ? true : false}
              checkedChildren="On"
              unCheckedChildren="Off"
              disabled={enable2 || stateDevice ? false : true}
            />
          </Col>
          <Col
            span={8}
            style={{
              // center all element
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <h3>{data?.device3}</h3>
            <Switch
              value={currentData?.device3 === 1 ? true : false}
              checkedChildren="On"
              unCheckedChildren="Off"
              disabled
            />
          </Col>
        </Row>
        <Row>
          <Col
            span={8}
            style={{
              // center all element
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <h3>{data?.device4.label}</h3>
            {data?.device4?.Chart === 0 ? (
              <Temperature value={currentData?.device4 ? currentData?.device4 : 0} height={350} />
            ) : (
              <PM value={currentData?.device4 ? currentData?.device4 : 0} />
            )}
          </Col>
          <Col
            span={8}
            style={{
              // center all element
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <h3>{data?.device5}</h3>
            <Switch
              value={currentData?.device5 === 1 ? true : false}
              checkedChildren="On"
              unCheckedChildren="Off"
              disabled
            />
          </Col>
          <Col
            span={8}
            style={{
              // center all element
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <h3>{data?.device6}</h3>
            <Switch
              value={currentData?.device6 === 1 ? true : false}
              checkedChildren="On"
              unCheckedChildren="Off"
              disabled
            />
          </Col>
        </Row>
      </div>
    </>
  );
}
