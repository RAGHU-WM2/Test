import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import TopLocationsCard from "./Toplocation_Card/ToplocationCard";
import SearchList from "./Search_List/SearchList";

import "./Card.css";
import Listicon from "../Assets/list-cIcY5BTW.png";
import Backicon from "../Assets/back-svgrepo-com.svg";
import CloseIcon from "../Assets/close-svgrepo-com (1).svg"; // Import the close icon
import Polygoncard from './Polygon_Card/PolygonCard';
import Categorycard from "./Category_Card/Categorycard";

const Card = () => {
  const navigate = useNavigate();
  const [isCategoryView, setIsCategoryView] = useState(false);
  const [showSearchList, setShowSearchList] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleListIconClick = () => {
    if (isCategoryView) {
      navigate("/");
    } else {
      navigate("/categorycard");
    }
    setIsCategoryView(!isCategoryView);
  };

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchInputClick = () => {
    navigate("/search");
    setShowSearchList(true);
  };

  const handleBackIconClick = () => {
    navigate("/");
    setShowSearchList(false);
    setSearchTerm(""); // Clear search term when navigating back
  };

  const handleCategoryClick = (category: string) => {
    setSearchTerm(category); // Update the search term with the clicked category
    navigate("/search"); // Navigate to the search route
    setShowSearchList(true); // Show the search list
  };

  const handleCloseIconClick = () => {
    setSearchTerm(""); // Clear the search term
    navigate("/"); // Navigate back to the default route
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
          value={searchTerm}
          onChange={handleSearchInputChange}
          onClick={handleSearchInputClick}
        />
        {searchTerm ? (
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

      <Routes>
        <Route path="/" element={<TopLocationsCard />} />
        <Route path="/polygon/:id" element={<Polygoncard />} />
        <Route path="/categorycard" element={<Categorycard onCategoryClick={handleCategoryClick} />} />
        <Route path="/search" element={<SearchList searchTerm={searchTerm} />} />
        {/* Add other routes as needed */}
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Card />
    </Router>
  );
};

export default App;
