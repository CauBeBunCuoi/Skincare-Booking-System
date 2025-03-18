import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { callApi } from "../../api/main/api_call/api";
import { publicApi } from "../../api/instance/axiosInstance";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log(username, password);
    // Call API here
    const response = await callApi({
      instance: publicApi,
      method: "post",
      url: "/accounts/login",
      data: {
        username,
        password,
      },
    });

    if (response.success) {
      const token = response.data.token;
      const user = jwtDecode(token);
      await localStorage.setItem("token", token);
      await localStorage.setItem("user", JSON.stringify(user));
      console.log("User: ", user);
      toast.success("Login successfully!");
      navigate("/");
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div>
        <p>Login</p>
        <div>
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button onClick={() => handleLogin()}>Sign-in</Button>
      </div>
    </div>
  );
};

export default Login;
