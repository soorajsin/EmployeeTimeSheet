import React, { useCallback, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import apiURL from "../../config";

const UpdatePage = () => {
  const api = apiURL.url;
  const { addTimeArrangeId } = useParams();
  //   console.log(addTimeArrangeId);
  const [sendData, setSendData] = useState({
    aprojectname: "",
    adate: "",
    atimefirst: "",
    atimeend: "",
    aprojectdec: ""
  });

  const changeData = (e) => {
    setSendData({
      ...sendData,
      [e.target.name]: e.target.value
    });
  };
  console.log(sendData);

  const fetched = useCallback(async () => {
    const data = await fetch(`${api}/fetchedToemployee`, {
      method: "GET"
    });
    const res = await data.json();
    // console.log(res);
    const matched = await res.data[0].find(
      (addTimeArrange) => addTimeArrange._id.toString() === addTimeArrangeId
    );
    // console.log(matched);
    if (matched) {
      setSendData({
        aprojectname: matched.aprojectname,
        adate: matched.adate,
        atimefirst: matched.atimefirst,
        atimeend: matched.atimeend,
        aprojectdec: matched.aprojectdec
      });
    }
  }, [api, addTimeArrangeId]);
  useEffect(() => {
    fetched();
  }, [fetched]);

  return (
    <>
      <div className="reg">
        <div className="regContainer">
          <div className="form">
            <h1>Welcome to Update</h1>
          </div>
          <div className="form">
            <label htmlFor="aprojectname">Project Name</label>
            <br />
            <input
              type="text"
              name="aprojectname"
              value={sendData.aprojectname}
              onChange={changeData}
              placeholder="Enter name here..."
            />
          </div>
          <div className="form">
            <label htmlFor="adate">Date</label>
            <br />
            <input
              type="date"
              name="adate"
              value={sendData.adate}
              onChange={changeData}
              placeholder="Enter date here..."
            />
          </div>
          <div className="form">
            <label htmlFor="atimefirst">Start Time</label>
            <br />
            <input
              type="time"
              name="atimefirst"
              value={sendData.atimefirst}
              onChange={changeData}
              placeholder="Enter start time"
            />
          </div>
          <div className="form">
            <label htmlFor="atimeend">End Time</label>
            <br />
            <input
              type="time"
              name="atimeend"
              value={sendData.atimeend}
              onChange={changeData}
              placeholder="Enter end time"
            />
          </div>
          <div className="form">
            <label htmlFor="aprojectdec">Description</label>
            <br />
            <textarea
              name="aprojectdec"
              value={sendData.aprojectdec}
              onChange={changeData}
              placeholder="Enter description"
              cols="30"
              rows="2"
            ></textarea>
          </div>
          <div className="form">
            <button>Update</button>
          </div>
          <div className="form">
            <p>
              <NavLink to={"/employee"}>Cancel</NavLink>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePage;
