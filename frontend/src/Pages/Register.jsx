import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const UserRegister = async () => {
    if (name === "" || email === "" || password === "" || gender === "") {
      alert("Please fill all details");
    } else {
      setLoading(true);
      let obj = {
        name,
        email,
        password,
        gender,
      };

      await fetch("https://lazy-cyan-trout-wig.cyclic.app/user/register", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setLoading(false);
          if (res.msg === "new user has been register") {
            alert("Register Sucessfull");
            navigate("/");
          } else if (res.msg === "Already have account") {
            alert("Already have an account please login");
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Something went wrong");
          setLoading(false);
        });
    }
  };

  return (
    <div id="registerAndLoginContainer" className={loading && "loading"}>
      <h1>Registration</h1>

      <input
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Enter your name"
      />
      <input
        onChange={(e) => setEmail(e.target.value)}
        type="mail"
        placeholder="Enter your email"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
      />
      <select onChange={(e) => setGender(e.target.value)}>
        <option value="">Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="na">Not to disclose</option>
      </select>
      <button onClick={UserRegister}>
        {loading ? <Spinner /> : "Register"}
      </button>
      <p>
        Already have an account ?{" "}
        <span onClick={() => navigate("/")}>Login</span>
      </p>
    </div>
  );
}
