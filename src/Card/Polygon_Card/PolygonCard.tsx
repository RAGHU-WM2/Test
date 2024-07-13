import React from "react";
import "./Polygon.css";
import Toilet from "../../Assets/toilet_16750317.png";
import Closeicon from "../../Assets/close-circle-svgrepo-com.svg";
// import Fullscreenicon from "../../Assets/fullscreen-r8if0idY-r8if0idY.png";

const PolygonCard = () => {


  return (
    <div id="polygoncard">
      <div className="location_details">
        <div className="top_header_location">
          <img src={Toilet} width="40" id="icon_loader" alt="Icon Loader" />
          <h2 style={{fontFamily:"figtree",fontWeight:"600"}}>Men's Washroom</h2>
          <img src={Closeicon} width="30" alt="Close" id="close_icon" />
        </div>
        <div className="middle_floor">
          <h5 style={{fontFamily:"figtree"}}>First Floor</h5>
        </div>
        <div className="bottom_header_location">
          <h6 id="openspacesid" style={{fontFamily:"figtree"}}>Washroom</h6>
          <h6 id="amentityid" style={{fontFamily:"figtree"}}>Amenities</h6>
        </div>
        <div>
            <button className="directionbtn" style={{fontFamily:"figtree"}}>Directions</button>
        </div>
      </div>
    </div>
  );
};

export default PolygonCard;
