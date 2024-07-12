import React from "react";
import "./Toplocation.css";
import Spoonicon from "../../Assets/spoon.svg";
import Printericon from "../../Assets/printer.svg";
import Collaborationicon from "../../Assets/Colaboration.svg";
import Boardroomicon from "../../Assets/boardroom.svg";
import { Routes, Route } from "react-router-dom";

const Toplocation_card = () => {
  return (
    <div id="Top_location_container">
      <div className="Tlocation_top">
        <h4>Top Locations</h4>
      </div>

      <div className="Tlocation_bottom">
        <span>
          <img src={Spoonicon} alt="" width={42} />
          <p>Cafeteria</p>
        </span>
        <span>
          <img src={Printericon} alt="" width={42} />
          <p>
            Printer <br /> Room
          </p>
        </span>
        <span>
          <img src={Collaborationicon} alt="" width={42} />
          <p>
            Collaboration <br /> Space
          </p>
        </span>
        <span>
          <img src={Boardroomicon} alt="" width={42} />
          <p>Boardroom</p>
        </span>
      </div>
    </div>
  );
};

export default Toplocation_card;
