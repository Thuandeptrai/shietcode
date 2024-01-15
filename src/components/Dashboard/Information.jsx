import React, { useEffect, useState } from "react";
import "./Information.scss";
import axiosInstance from "../services/axios";


function Information({data, setData}) {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    setInterval(() => setCurrentTime(new Date()), 1000);
  }, []);
  console.log("dawdawdawd",data)

  return (
    <div className=" col-md-2 col-lg-3 col-ms-1  d-flex flex-column flex-nowrap bg-warning-subtle border-end position-relative">
      <h2 className="filer-listname h3 p-0 mt-lg-4 mt-md-3 mb-1 fw-semibold">
        Bảng <span className="text-warning text-opacity-75">điều khiển</span>
      </h2>
      <div className="filer-list d-flex flex-column">
        <div className="search-filerbox g-4 pt-5 d-flex flex-column">
          <div className="devices">
            <div className="devices-box d-flex justify-content-between">
              <i class="bi bi-box p-2 ">
                <span className="p-2 fs-md-4 fs-ms-2 text-warning-emphasis fw-bold">Thiet bi </span>
              </i>
              <i className="bi bi-search p-2" role="button"></i>
            </div>
            <div
              className="fs-6 p-1"
              style={{
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <div>Số lượng Thiet bi</div>
               <div>{data.length}</div>
            </div>
           
          </div>
        </div>
        <div className="search-filerbox g-4 pt-1 d-flex flex-column">
          <div className="devices">
            <div className="devices-box d-flex justify-content-between">
              <i class="bi bi-geo p-2 ">
                <span className="p-2 text-warning-emphasis fw-bold">Vị trí</span>
              </i>
              <i className="bi bi-search p-2" role="button"></i>
            </div>
            <div
              className="fs-6 p-1"
              style={{
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <div>Số lượng Thiet bi</div>
               <div>{data.length * 6}</div>
            </div>
          </div>
        </div>
        <div className="search-filerbox g-4 pt-1 d-flex flex-column">
          <div className="devices">
            <div className="devices-box d-flex justify-content-between">
              <i class="bi bi-person-badge p-2 ">
                <span className="p-2 fw-bold text-warning-emphasis">Người dùng</span>
              </i>
              <i className="bi bi-search p-2" role="button"></i>
            </div>
            <div
              className="fs-6 p-1"
              style={{
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <div>Tên :</div>
              <div>{JSON.parse(localStorage.getItem("user")).username}</div>
            </div>
            <div
              className="fs-6 p-1"
              style={{
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <div>Tên :</div>
              <div>{JSON.parse(localStorage.getItem("user")).email}</div>
            </div>
            <div
              className="fs-6 p-1"
              style={{
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <div>So dien thoai :</div>
              <div>{JSON.parse(localStorage.getItem("user")).phoneNumber}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex">
        <p className="flex-grow-1 position-absolute bottom-0 start-0 mx-3 fw-semibold">
          {currentTime.toLocaleDateString()}
        </p>
        <p className="position-absolute bottom-0 end-0 mx-3 fw-semibold">{currentTime.toLocaleTimeString()}</p>
      </div>
    </div>
  );
}

export default Information;
