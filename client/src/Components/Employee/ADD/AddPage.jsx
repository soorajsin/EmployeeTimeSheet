import React from "react";
import "./AddPage.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import apiURL from "../../config";

const AddPage = () => {
  const api = apiURL.url;
  const history = useNavigate();
  const [sendData, setSendData] = useState([
    {
      adate: "",
      atimefirst: "",
      atimeend: "",
      aprojectname: "",
      aprojectdec: ""
    }
  ]);

  const addForm = () => {
    const newForm = {
      adate: "",
      atimefirst: "",
      atimeend: "",
      aprojectname: "",
      aprojectdec: ""
    };
    setSendData([...sendData, newForm]);
  };
  console.log(sendData);

  const submitToAdd = async () => {
    try {
      const emptyFields = sendData.some(
        (form) =>
          !form.adate || !form.atimefirst || !form.atimeend || !form.aprojectdec
      );
      if (emptyFields) {
        alert("Please Enter all fields");
      } else {
        console.log("add");
        const data = await fetch(`${api}/addTimeArrange`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ sendData })
        });
        const res = await data.json();
        // console.log(res);
        if (res.status === 203) {
          console.log(res);
          history("/employee");
          window.location.reload();
        } else {
          alert("Not save data");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="reg">
        <div className="regContainer">
          <div className="form">
            <h2>Welcome to Time Arrange</h2>
          </div>
          {sendData.map((subForm, index) => (
            <div key={index}>
              <div className="form">
                <label htmlFor="adate">Date</label>
                <br />
                <input
                  type="date"
                  value={sendData.adate}
                  onChange={(e) => {
                    const updatedUser = [...sendData];
                    updatedUser[index].adate = e.target.value;
                    setSendData(updatedUser);
                  }}
                  placeholder="Enter data"
                />
              </div>
              <div className="form">
                <label htmlFor="atimefirst">Start Time</label>
                <input
                  type="time"
                  value={sendData.atimefirst}
                  onChange={(e) => {
                    const updatedUser = [...sendData];
                    updatedUser[index].atimefirst = e.target.value;
                    setSendData(updatedUser);
                  }}
                  placeholder="Enter here"
                />
              </div>
              <div className="form">
                <label htmlFor="atimeend">End Time</label>
                <input
                  type="time"
                  value={sendData.atimeend}
                  onChange={(e) => {
                    const updatedUser = [...sendData];
                    updatedUser[index].atimeend = e.target.value;
                    setSendData(updatedUser);
                  }}
                  placeholder="Enter here"
                />
              </div>
              <div className="form">
                <label htmlFor="aprojectname">Project Name</label>
                <input
                  type="text"
                  value={sendData.aprojectname}
                  onChange={(e) => {
                    const updatedUser = [...sendData];
                    updatedUser[index].aprojectname = e.target.value;
                    setSendData(updatedUser);
                  }}
                  placeholder="Enter here"
                />
              </div>
              <div className="form">
                <label htmlFor="aprojectdec">Project Description</label>
                <textarea
                  value={sendData.aprojectdec}
                  onChange={(e) => {
                    const updatedUser = [...sendData];
                    updatedUser[index].aprojectdec = e.target.value;
                    setSendData(updatedUser);
                  }}
                  placeholder="Entere here"
                  cols="30"
                  rows="2"
                ></textarea>
              </div>
            </div>
          ))}
          <div className="form">
            <button onClick={addForm}>ADD</button>
          </div>
          <div className="form">
            <button onClick={submitToAdd}>Submit</button>
          </div>
          <div className="form">
            <p>
              <NavLink to={"/employees"}>Cancel</NavLink>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPage;
