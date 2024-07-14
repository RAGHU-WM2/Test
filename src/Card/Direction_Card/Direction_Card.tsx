import React, { useEffect, useState } from "react";
import {
  getVenue,
  MappedinLocation,
  TGetVenueOptions
} from "@mappedin/mappedin-js";
import "@mappedin/mappedin-js/lib/mappedin.css";
import { useLocation, useNavigate } from "react-router-dom";
import "./Direction.css";
import Threedot from "../../Assets/three-dots-svgrepo-com.svg";
import Dot from "../../Assets/dot-svgrepo-com (1).svg";
import Mapicon from "../../Assets/pin.png";
import Inputchnageicon from "../../Assets/up-down-arrow-svgrepo-com (1).svg";
import Rightarrowicon from "../../Assets/right-arrow-svgrepo-com (3).svg";
import Addicon from "../../Assets/add-button-svgrepo-com.svg";
import Backarrowicon_direction from "../../Assets/back-svgrepo-com.svg";
import Fireicon from "../../Assets/fire.png";

const options: TGetVenueOptions = {
  venue: "mappedin-demo-office",
  clientId: "5eab30aa91b055001a68e996",
  clientSecret: "RJyRXKcryCMy4erZqqCbuB1NbR66QTGNXVE0x3Pg6oCIlUR1"
};

// Define the LocationState interface
interface LocationState {
  locationName: string;
}

const DirectionCard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as LocationState;
  const locationName = locationState?.locationName || "Unknown Location";

  const [categories, setCategories] = useState<{ header: string; locations: string[] }[]>([]);
  const [departure, setDeparture] = useState<string>("");

  useEffect(() => {
    async function init() {
      const venue = await getVenue(options);
      const sortedCategories = venue.categories
        .sort((a, b) => (a.name! > b.name! ? 1 : -1))
        .map(category => ({
          header: category.name ?? "",
          locations: category.locations.map((location: MappedinLocation) => location.name).sort()
        }));

      setCategories(sortedCategories);
    }

    init();
  }, []);

  const handleLocationClick = (location: string) => {
    setDeparture(location);
  };

  return (
    <div id="Directioncard">
      <div className="directions_header">
        <img
          src={Backarrowicon_direction}
          alt="Back"
          width={21}
          onClick={() => navigate(-1)}
        />
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
          id="Deparatureinput"
          placeholder="Choose Departure"
          style={{ fontFamily: "Figtree" }}
          value={departure}
          onChange={(e) => setDeparture(e.target.value)}
        />
        <input
          type="search"
          id="Arrivalinput"
          placeholder="Choose Arrival"
          style={{ fontFamily: "Figtree", marginBottom: "0.8cm" }}
          value={locationName}
        />
      </div>

      <div className="search_top_header2">
        <h4 style={{ fontWeight: "500", fontSize: "16px" }}>Most Popular</h4>
        <img src={Fireicon} alt="fire icon" width={13} height={13} />
      </div>
      
      <div id="directory2">
        {categories.map((category, index) => (
          <div key={index} className="categoryGroup2">
            <ul>
              {category.locations.map((location, locIndex) => (
                <li key={locIndex} onClick={() => handleLocationClick(location)}>
                  {location}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="steps_container" style={{ display: "none" }}>
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
