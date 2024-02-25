import React, { useCallback, useEffect, useState } from "react";
import apiURL from "../config";
import "./ManagerPage.css";

const ManagerPage = () => {
  const api = apiURL.url;
  const [userData, setUserData] = useState();
  console.log(userData);
  const fetched = useCallback(async () => {
    const data = await fetch(`${api}/fetchedToemployee`, {
      method: "GET"
    });
    const res = await data.json();
    // console.log(res);
    if (res.status === 205) {
      // console.log(res);
      setUserData(res);
    } else {
      console.log("not present data");
    }
  }, [api]);
  useEffect(() => {
    fetched();
  }, [fetched]);

  return (
    <>
      <div className="management">
        <div className="magCon">
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
                        <input
                          type="number"
                          min={"0"}
                          max={"5"}
                          placeholder="Enter your review"
                        />
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

export default ManagerPage;
