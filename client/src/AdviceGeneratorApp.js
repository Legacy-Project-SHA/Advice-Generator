import { useEffect, useState } from "react";
import axios from "axios";
import "./AdviceGeneratorApp.scss";
import SignupModal from "./AGAcomponents/SignupModal";
import LoginModal from "./AGAcomponents/LoginModal";
import FavoritesModal from "./AGAcomponents/FavoritesModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faArrowRightFromBracket,
  faSun,
  faMoon
} from "@fortawesome/free-solid-svg-icons";
// , faTrash
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AdviceGeneratorApp() {
  const [adviceId, setAdviceId] = useState("");
  const [advice, setAdvice] = useState("");
  const [openSignupModal, setOpenSignupModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openFavoritesModal, setOpenFavoritesModal] = useState(false);
  const [profile, setProfile] = useState(false);
  const [user, setUser] = useState("");
  const [favorites, setFavorites] = useState("");
  const [getAdvices, setGetAdvices] = useState([]);
  const [darkMode, setDarkMode] = useState(true);
  const [mode, setMode] = useState("Light Mode");
  const [loading , setLoading]= useState(false)
  useEffect(() => {
    getAdvice();
  }, []);
  const toastOptions = {
    position: "top-right",
    autoClose: 1000,
    theme: "dark",
    pauseOnHover: true,
    draggable: true,
  };
  const getAdvice = () => {
    axios
      .get(`https://api.adviceslip.com/advice`)
      .then(({ data }) => {
        setAdvice(data.slip.advice);
        setAdviceId(data.slip.id);
      })
      .catch((err) => console.error("Error:", err));
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios
        .post("http://localhost:3636/user/verify", {
          token: localStorage.getItem("token"),
        })
        .then(({ data }) => {
          setUser(data);
          setProfile(true);
        })
        .catch((err) => console.error("Error:", err));
    }
    faveAdvices();
  }, [loading]);
  // useEffect(() => {

  //   if (user){
  //     axios.post("http://localhost:3636/advice/get" , {userId:user._id})
  //     .then(({ data }) => {
  //       setGetAdvices(data);
  //       console.log(getAdvices)
  //     })
  //     .catch((err) => console.error("Error:", err));
  // }}, [profile]);
  async function faveAdvices() {
    await axios
      .post("http://localhost:3636/advice/get", { userId: user._id })
      .then(({ data }) => {
        setGetAdvices(data);
        console.log(getAdvices);
      });
  }
  const likeAdvice = () => {
    // setFavorites(advice);
    const newAdvice = axios
      .post("http://localhost:3636/advice/", {
        advice: advice,
        userId: user._id,
      })
      .catch((err) => console.error("Error:", err));
    // setGetAdvices(getAdvices, newAdvice);
    toast.success("Added to your favorites", toastOptions)
    faveAdvices();
  };

  const saveAdvice = () => {
      setOpenFavoritesModal(true);
      faveAdvices();

  };
  const logOut = ()=>{
    setProfile(false)
    setUser("")
    localStorage.clear()
    setLoading(false)
  }
  const deleteAdvice = async (id) => {
    await fetch("http://localhost:3636/advice/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .catch((err) => console.error("Error:", err));

    // setGetAdvices((getAdvices) =>
    //   getAdvices.filter((getAdvice) => getAdvice._id !== data._id)
    // );
    faveAdvices();
  };
const changeMode=()=>{
  if(darkMode){
    setMode("Light Mode")
  }else{
    setMode("Dark Mode")
  }
  setDarkMode(!darkMode)

}
  return (
    <div className={darkMode? "dark-bg1 d-text App " : "light-bg1 l-text App"}>
      {profile ? (
        <div className={darkMode? "dark-bg2 logedIn-Bar " : "light-bg2 logedIn-Bar"} >
          <h1 className={darkMode? "d-text user-name" : "l-text user-name"}>{user.username} </h1>

          <div className="like_div">
            <a
              className="heart"
              onClick={() => {
                likeAdvice();
              }}
            >
              <FontAwesomeIcon icon={faHeart} />
            </a>
          </div>
         
          
          <div className="like_div">
            <a
              className="my_favs"
              onClick={() => {
                changeMode();
              }}
            >
              <FontAwesomeIcon icon={darkMode? faSun  : faMoon} />
            </a>
          </div>
          <div>
            <a
              className="my_favs"
              onClick={() => {
                saveAdvice();
              }}
            >
              My favorites
            </a>
          </div>

          <div>
            <a
              className="logout"
              onClick={() => {
                logOut();
              }}
            >
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
            </a>
          </div>
        </div>
      ) : (
        <div className={darkMode? "dark-bg2  navBar " : "light-bg2  navBar"}>
          <span className={darkMode? "d-text  " : "l-text "}
            onClick={() => {
              setOpenSignupModal(true);
            }}
          >
            Signup
          </span>
          <span className={darkMode? "d-text  " : "l-text "}
            onClick={() => {
              setOpenLoginModal(true);
            }}
          >
            Login
          </span>
        </div>
      )}

      <SignupModal
        setOpenSignupModal={setOpenSignupModal}
        setOpenLoginModal={setOpenLoginModal}
        open={openSignupModal}
        darkMode={darkMode}
        onClose={() => {
          setOpenSignupModal(false);
        }}
      />
      <LoginModal
        user={user}
        setOpenLoginModal={setOpenLoginModal}
        setLoading={setLoading}
        open={openLoginModal}
        darkMode={darkMode}
        onClose={() => {
          setOpenLoginModal(false);
        }}
      />
      <FavoritesModal
        getAdvices={getAdvices}
        deleteAdvice={deleteAdvice}
        open={openFavoritesModal}
        darkMode={darkMode}
        onClose={() => {
          setOpenFavoritesModal(false);
        }}
      />

      <div className={darkMode? "dark-bg2 container " : "light-bg2 container"}>
        <div id="advArea">
          <h4 className="advId">{adviceId}</h4>
          <h1 className="adv">{advice}</h1>
        </div>
        <div id="theLines">
          <hr className="line" />
          <hr className="dotes" />
          <hr className="dotes" />
          <hr className="line" />
        </div>
        <div id="button">
          <button
            onClick={() => {
              getAdvice();
            }}
            className={darkMode? " dbtn  btn " : " lbtn  btn"}
          >
            <svg className={darkMode? " " : " bgr"}
            width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M20 0H4a4.005 4.005 0 0 0-4 4v16a4.005 4.005 0 0 0 4 4h16a4.005 4.005 0 0 0 4-4V4a4.005 4.005 0 0 0-4-4ZM7.5 18a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"
                fill="#202733"
              />
            </svg>
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AdviceGeneratorApp;
