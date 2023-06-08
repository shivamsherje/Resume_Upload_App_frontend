import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { Spinner } from "@chakra-ui/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setIsAuth, setAdmin, setToken } = useContext(AuthContext);

  const navigate = useNavigate();

  const UserLogin = async () => {
    setLoading(true);
    let obj = { email, password };

    await fetch("https://lazy-cyan-trout-wig.cyclic.app/user/login", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        if (
          email === "shivam@admin.com" &&
          password === "shivam@123" &&
          res.token
        ) {
          alert("Login Successful as admin");
          navigate("/admin");
          setAdmin(true);
          setIsAuth(true);
          setToken(res.token);
          localStorage.setItem("admin", true);
          localStorage.setItem("token", res.token);
        } else if (res.token) {
          alert("Login Successful");
          setIsAuth(true);
          navigate("/form");
          setAdmin(false);
          setToken(res.token);
          localStorage.setItem("admin", false);
          localStorage.setItem("token", res.token);
        } else if (res.msg === "Wrong Credential") {
          alert("Wrong Credential");
        } else {
          alert("Something went wrong");
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        alert("Something went wrong");
      });
  };

  return (
    <div id="registerAndLoginContainer">
      <h1>Login</h1>
      <input
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email"
      />
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={UserLogin}>{loading ? <Spinner /> : "Login"}</button>
      <p>
        Don't have an account ?{" "}
        <span onClick={() => navigate("/register")}>Register</span>
      </p>
    </div>
  );
}
