import React, { useContext, useState } from "react";
import "./Login.css";
import Title from "../../components/Title/Title";
import { auth } from "../../authConfig/authConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { LoginContext } from "../../context/LoginContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const { userName, setUserName, email, setEmail, password, setPassword } =
    useContext(LoginContext);
  const [newAccount, setNewAccount] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newAccount) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        setEmail("");
        setPassword("");
        setUserName("");
        navigate("/");
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          toast.error("This email is already registered.");
        } else if (error.code === "auth/invalid-email") {
          toast.error("Invalid email format.");
        } else if (error.code === "auth/weak-password") {
          toast.error("Password should be at least 6 characters.");
        } else {
          toast.error(`Registration failed: ${error.message}`);
        }
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        setEmail("");
        setPassword("");
        navigate("/");
      } catch (error) {
        if (error.code === "auth/invalid-credential") {
          toast.error("Incorrect email or password.");
        } else {
          toast.error("Something went wrong.");
        }
      }
    }
  };

  const handleName = (e) => {
    setUserName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  return (
    <form className="login-container" onSubmit={handleSubmit}>
      <div className="login-title">
        <Title text2={newAccount ? "Sign Up" : "Login"} />
      </div>
      <div className="login-box">
        {newAccount && (
          <input
            type="text"
            placeholder="Name"
            required
            value={userName}
            onChange={handleName}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={handleEmail}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={handlePassword}
        />
        <div className="forget-pass-and-acc">
          <p>Forgot your password?</p>
          <p onClick={() => setNewAccount(!newAccount)}>
            {newAccount ? "Login Here" : "Create account"}
          </p>
        </div>
        <div className="signIn">
          <button type="submit" className="sign-in-btn">
            {newAccount ? "Sign Up" : "Sign In"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default Login;
