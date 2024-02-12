import React, { useCallback, useEffect, useState } from "react";
import "./Employee.css";
import { useNavigate } from "react-router-dom";
import apiURL from "../config";

const Employee = () => {
  const api = apiURL.url;
  const history = useNavigate();
  const add = async () => {
    history("/addPage");
  };

  const [userData, setUserData] = useState();
  // console.log("user ", userData);
  const fetchedemployee = useCallback(async () => {
    try {
      const data = await fetch(`${api}/fetchedToemployee`, {
        method: "GET"
      });
      const res = await data.json();
      // console.log(res);
      if (res.status === 205) {
        // console.log(res);
        setUserData(res);
      } else {
        console.log("Not fetched data");
      }
    } catch (error) {
      console.log(error);
    }
  }, [api]);

  useEffect(() => {
    fetchedemployee();
  }, [fetchedemployee]);

  const deletetimearrange = async (addTimeArrangeId, index) => {
    try {
      const data = await fetch(`${api}/deletearrangeTime`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ addTimeArrangeId })
      });
      const res = await data.json();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="management">
        <div className="magCon">
          <div className="add">
            <button onClick={add}>ADD Arrange</button>
          </div>
          <div className="show">
            {userData
              ? userData.data[0].map((addTimeArrange, index) => (
                  <div key={index} className="showData">
                    <h2>{addTimeArrange.adate}</h2>
                    <div className="showTime">
                      <h4>{addTimeArrange.atimefirst}</h4> -
                      <h4>{addTimeArrange.atimeend}</h4>
                    </div>
                    <h3>{addTimeArrange.aprojectname}</h3>
                    <p>{addTimeArrange.aprojectdec}</p>
                    <div className="actionCon">
                      <>
                        <i
                          onClick={() =>
                            deletetimearrange(addTimeArrange._id, index)
                          }
                          className="fa-solid fa-delete-left"
                        ></i>
                        <i className="fa-solid fa-pen-nib"></i>
                      </>
                    </div>
                  </div>
                ))
              : ""}
          </div>
        </div>
      </div>
    </>
  );
};

export default Employee;
