import React, { useState } from "react";
import "./Time.css";

function Time() {
  const currDate = new Date().toLocaleDateString();
  let time = new Date().toLocaleTimeString();
  const [ctime, setCtime] = useState(time);

  const UpdateTime = () => {
    time = new Date().toLocaleTimeString();
    setCtime(time);
  };
  setInterval(UpdateTime, 1000);
  return (
    <div className="time_div container fixed-top ">
      <h4 className="Today_Date position-absolute top-50 start-0 translate-middle-y">
        Todays Date: {currDate}
      </h4>
      <p className="Today_Time position-absolute top-50 end-0 translate-middle-y">
        Time: {ctime}
      </p>
    </div>
  );
}

export default Time;
