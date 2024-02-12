import React from "react";
import "./Employee.css";
import { useNavigate } from "react-router-dom";

const Employee = () => {
  const history = useNavigate();
  const add = async () => {
    history("/addPage");
  };
  return (
    <>
      <div className="management">
        <div className="magCon">
          <div className="add">
            <button onClick={add}>ADD Arrange</button>
          </div>
          <div className="show"></div>
        </div>
      </div>
    </>
  );
};

export default Employee;
