import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const LoginModal = ({
  open,
  user,
  onClose,
  setOpenLoginModal,
  setOpenSignupModal,
  setProfile,
  darkMode
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const toastOptions = {
    position: "top-right",
    autoClose: 1000,
    theme: "dark",
    pauseOnHover: true,
    draggable: true,
  };
  const login = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3636/user/login", {
        username,
        password,
      })
      .then(({ data }) => {
        console.log(data);
        if (data.token) {
          localStorage.setItem("token", data.token);
          setOpenLoginModal(false);
          setProfile(true);
          toast.success("Welcome ready for a new advice", toastOptions)
        } else {
          toast.error(data.message, toastOptions)
        }
      });
  };

  if (!open) return null;
  return (
    <div className="modalOverlay">
      <div className={darkMode? "dark-bg2 modalContainer " : "light-bg2 modalContainer"}>
        <span className="modalBtn" onClick={onClose}>
          X
        </span>

        <h2 className={darkMode? "d-text  title " : "l-text  title"}> Login </h2>
        <form action="login-box">
          <label htmlFor="username">username</label>
          <input
            type="text"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <label htmlFor="password">password</label>
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            className={darkMode? "dlb log-button  " : "llb log-button "}
            type="submit"
            onClick={(e) => {
              login(e);
            }}
          >
            Login
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginModal;
