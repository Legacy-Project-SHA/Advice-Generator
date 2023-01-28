import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const FavoritesModal = ({ open, onClose, getAdvices, deleteAdvice ,darkMode}) => {
  if (!open) return null;
  return (
    <div className="modalOverlay">
      <div className={darkMode? "dark-bg2 modalContainer " : "light-bg2 modalContainer"}>
        <span className="modalBtn" onClick={onClose}>
          X
        </span>

        <h2 className="title"> My Favorites Advices </h2>
        <div>
          {getAdvices &&
            getAdvices.map((getAdvice) => {
              return (
                <div className="favAdvices" key={getAdvice._id}>
                  <ul>
                    <li className="favs">
                      {getAdvice.advice}
                      {"  "}
                      <span
                        onClick={() => {
                          deleteAdvice(getAdvice._id);
                        }}
                      >
                        <FontAwesomeIcon className="trash" icon={faTrash} />
                      </span>
                    </li>
                  </ul>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default FavoritesModal;
