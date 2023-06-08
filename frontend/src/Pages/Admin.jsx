import React, { useContext, useEffect, useState } from "react";

import { MdDelete } from "react-icons/md";
import { AuthContext } from "../Context/AuthContext";

export default function Admin() {
  const [arr, setArr] = useState([]);

  const { token } = useContext(AuthContext);

  useEffect(() => {
    getData();
  });

  const getData = async () => {
    await fetch("https://lazy-cyan-trout-wig.cyclic.app/form", {
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((res) => setArr(res))
      .catch((err) => console.log(err));
  };

  const DeleteResume = async (id) => {
    await fetch(`https://lazy-cyan-trout-wig.cyclic.app/form/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        getData();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="admin-main-container">
      <div className="cont-1">
        <div className="profile-image-div">
          <img
            src="https://img.freepik.com/premium-vector/freelance-sticker-logo-icon-vector-man-with-desktop-blogger-with-laptop-icon-vector-isolated-background-eps-10_399089-1098.jpg"
            alt=""
          />
        </div>
        <div className="detail-container">
          <h2>Shivam Sherje</h2>
          <p>shivam@admin.com</p>
        </div>
      </div>
      <div className="cont-2">
        <h1>Students Resume</h1>
        <div className="resumecontainer">
          {arr &&
            arr.map((ele) => (
              <div className="resumeCard">
                <img src={ele.resume} alt="" />
                <p>
                  {ele.name} <MdDelete onClick={() => DeleteResume(ele._id)} />{" "}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
