import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Card.css";
import Listicon from "../Assets/list-cIcY5BTW.png";
import Backicon from "../Assets/back-svgrepo-com.svg";
import CloseIcon from "../Assets/close-svgrepo-com (1).svg";

interface CardProps {
  setSearchTerm: (term: string) => void;
}

const Card: React.FC<CardProps> = ({ setSearchTerm }) => {
  const navigate = useNavigate();
  const [isCategoryView, setIsCategoryView] = useState(false);
  const [showSearchList, setShowSearchList] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleListIconClick = () => {
    if (isCategoryView) {
      navigate("/");
    } else {
      navigate("/categorycard");
    }
    setIsCategoryView(!isCategoryView);
  };

  const handleBackIconClick = () => {
    navigate("/");
    setShowSearchList(false);
    setSearchTerm(""); // Clear search term when navigating back
    setInputValue(""); // Clear the input value
  };

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value); // Update local input state
    setSearchTerm(value); // Update the search term in App component
  };

  const handleCloseIconClick = () => {
    setSearchTerm(""); // Clear the search term
    setInputValue(""); // Clear the input value
    navigate("/"); // Navigate back to the default route
  };
  const handleSearchInputClick = () => {
    navigate("/searchlist");
    setShowSearchList(true);
  };
  return (
    <div id="Card">
      <div className="search_input_container">
        <img
          src={Backicon}
          alt=""
          id="backicon"
          width={23}
          onClick={handleBackIconClick}
        />
        <input
          type="text"
          id="locationsearch"
          placeholder="Search the office..."
          value={inputValue} // Use local state for input
          onChange={handleSearchInputChange}
          onClick={handleSearchInputClick}

        />
        {inputValue ? ( // Check local input state instead of searchTerm
          <img
            id="close_icon"
            src={CloseIcon}
            width="21"
            alt="Close"
            onClick={handleCloseIconClick}
          />
        ) : (
          <img
            id="toggle_list"
            src={Listicon}
            width="25"
            alt="Toggle List"
            onClick={handleListIconClick}
          />
        )}
      </div>
    </div>
  );
};

export default Card;
