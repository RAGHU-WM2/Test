import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Polygon.css";
import Toilet from "../../Assets/toilet_16750317.png";
import Closeicon from "../../Assets/close-circle-svgrepo-com.svg";
import DirectionCard from "../Direction_Card/Direction_Card"; // Import the DirectionCard component

interface LocationState {
  locationName: string;
  floorName: string;
  CategoryName: string;
  typeName: string;
}

const PolygonCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const locationState = location.state as LocationState;
  const locationName = locationState?.locationName || "Unknown Location";
  const floorName = locationState?.floorName || "Unknown Floor";
  const CategoryName = locationState?.CategoryName || "Unknown Category";
  const typeName = locationState?.typeName || "Unknown Type";

  const handleCloseClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div id="polygoncard">
      <div className="location_details">
        <div className="top_header_location">
          <img src={Toilet} width="40" id="icon_loader" alt="Icon Loader" />
          <h2 style={{ fontFamily: "figtree", fontWeight: "600" }}>
            {locationName}
          </h2>
          <img
            src={Closeicon}
            width="30"
            alt="Close"
            id="close_icon"
            onClick={handleCloseClick}
          />
        </div>
        <div className="middle_floor">
          <h5 style={{ fontFamily: "figtree" }}>{floorName}</h5>
        </div>
        <div className="bottom_header_location">
          <h6 id="openspacesid" style={{ fontFamily: "figtree" }}>
            {CategoryName}
          </h6>
          {typeName.toLowerCase() !== "desk" && (
            <h6 id="amentityid" style={{ fontFamily: "figtree" }}>
              {typeName}
            </h6>
          )}
        </div>
        <div>
          <Link
            to="/directions/true"
            state={{ locationName }} // Pass the locationName as state
          >
            <button className="directionbtn" style={{ fontFamily: "figtree" }}>
              Directions
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PolygonCard;
