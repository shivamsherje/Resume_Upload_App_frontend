import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Spinner } from "@chakra-ui/react";

export default function Form() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [position, setPosition] = useState("");
  const [resume, setresume] = useState("");
  const [loading, setLoading] = useState(false);

  const { token } = useContext(AuthContext);

  const SubmitForm = async () => {
    if (name === "" || mobile === "" || position === "") {
      alert("Please enter all the details");
    } else {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", resume);
      formData.append("upload_preset", "ResumeSihivam");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/drijzhqfp/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      let obj = {
        name,
        mobile,
        position,
        resume: data.secure_url,
      };

      await fetch("https://lazy-cyan-trout-wig.cyclic.app/form", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(obj),
      })
        .then((res) => res.json())
        .then((res) => {
          setLoading(false);
          if (res.msg === "Form uploaded sucessfully") {
            alert("Form uploaded sucessful thank you");
          } else {
            alert("Something went wrong");
          }
        })
        .catch((err) => {
          alert("Something went wrong");
          console.log(err);
        });

      setName("");
      setMobile("");
      setPosition("");
      setresume("");
    }
  };

  return (
    <div id="registerAndLoginContainer">
      <h1>Upload Resume</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <input
        type="text"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        placeholder="Enter mobile number"
      />
      <select value={position} onChange={(e) => setPosition(e.target.value)}>
        <option value="">Position apply for</option>
        <option value="SDE 1">SDE 1</option>
        <option value="SDE 2">SDE 2</option>
        <option value="full stack developer">Full Stack Developer</option>
        <option value="software engineer">Software Engineer</option>
        <option value="database engineer">Database Engineer</option>
      </select>
      <input type="file" onChange={(e) => setresume(e.target.files[0])} />
      <button onClick={SubmitForm}>{loading ? <Spinner /> : "Submit"}</button>
    </div>
  );
}
