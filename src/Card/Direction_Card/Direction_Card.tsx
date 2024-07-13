import React from "react";
import { useNavigate } from "react-router-dom";
import "./Direction.css";
import Threedot from "../../Assets/three-dots-svgrepo-com.svg";
import Dot from "../../Assets/dot-svgrepo-com (1).svg";
import Mapicon from "../../Assets/pin.png";
import Inputchnageicon from "../../Assets/up-down-arrow-svgrepo-com (1).svg";
import Rightarrowicon from "../../Assets/right-arrow-svgrepo-com (3).svg";
import Addicon from "../../Assets/add-button-svgrepo-com.svg";
import Backarrowicon_direction from "../../Assets/back-svgrepo-com.svg";

const DirectionCard = () => {
  const navigate = useNavigate();

  return (
    <div id="Directioncard">
      <div className="directions_header">
        <img src={Backarrowicon_direction} alt="Back" width={21} onClick={() => navigate(-1)} />
        <h2 style={{ fontFamily: "Figtree" }}>Directions</h2>
      </div>

      <div className="dirction_icons">
        <img src={Dot} width={39} alt="" id="doticon" />
        <img src={Threedot} width={28} alt="" id="threedoticon" />
        <img src={Mapicon} width={24} alt="" id="mapicon" />
      </div>

      <div className="Input_Change">
        <img src={Inputchnageicon} width={23} alt="" id="doticon" />
      </div>

      <div className="directions_input">
        <input
          type="search"
          name=""
          id="Deparatureinput"
          placeholder=" Choose Deparature"
          style={{ fontFamily: "Figtree" }}
        />
        <input
          type="search"
          name=""
          id="Arrivalinput"
          placeholder=" Choose Arrival"
          style={{ fontFamily: "Figtree" }}
        />
      </div>

      <div className="steps_container">
        <div className="steps_container_header">
          <p>Add Destination</p>
        </div>

        <div className="Addicondiv">
          <img src={Addicon} width={15} alt="" id="doticon" />
        </div>
        <div className="steps_container_center">
          <div className="steps_container_center_left">
            <p>Time to destination</p>
            <p>
              <b>1 Minute</b>
            </p>
          </div>
          <div className="steps_container_center_right">
            <button id="Steps_button">
              Steps <img src={Rightarrowicon} width={20} alt="" />
            </button>
          </div>
        </div>
        <div className="steps_container_bottom"></div>
      </div>
    </div>
  );
};

export default DirectionCard;