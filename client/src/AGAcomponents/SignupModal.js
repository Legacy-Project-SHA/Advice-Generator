import axios from "axios";
import {  useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SignupModal = ({
  open,
  onClose,
  setOpenLoginModal,
  setOpenSignupModal,
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
  const signUp = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3636/user/signup", {
        username,
        password,
      })
      .then(({ data }) => {
        console.log(data);
        if (data.message === "New User Created") {
          setOpenSignupModal(false);
          toast.success(data.message, toastOptions)

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

        <h2 className={darkMode? "d-text  title " : "l-text  title"}> Sign up </h2>
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
              signUp(e);
            }}
          >
            signup
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignupModal;
