import React, { useEffect, useState } from "react";
import Fireicon from "../../Assets/fire.png";
import DeskIcon from "../../Assets/laptop.png";
import MeetingRoomIcon from "../../Assets/chair.png";
import OpenSpacesIcon from "../../Assets/sofa.png";
import WashroomsIcon from "../../Assets/female-and-male-shapes-silhouettes.png";

import { getVenue, TGetVenueOptions } from "@mappedin/mappedin-js";
import "@mappedin/mappedin-js/lib/mappedin.css";
import "./Search.css";
import { Link } from "react-router-dom";

const options: TGetVenueOptions = {
  venue: "mappedin-demo-office",
  clientId: "5eab30aa91b055001a68e996",
  clientSecret: "RJyRXKcryCMy4erZqqCbuB1NbR66QTGNXVE0x3Pg6oCIlUR1",
};

interface LocationInfo {
  name: string;
  polygonName: string;
  locationType: string;
  categoryName: string;
}

interface SearchListProps {
  searchTerm: string;
}

const SearchList: React.FC<SearchListProps> = ({ searchTerm }) => {
  const [locationsInfo, setLocationsInfo] = useState<LocationInfo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const venue = await getVenue(options);
      const locationsData: LocationInfo[] = venue.locations.map((location) => {
        const name = location.name ?? "Unknown Location";
        const polygonName =
          location.polygons?.[0]?.map?.name ?? "Unknown Polygon";
        const locationType = location.type ?? "Unknown Type";
        const categoryName =
          location.categories?.[0]?.name ?? "Unknown Category";

        return {
          name,
          polygonName,
          locationType,
          categoryName,
        };
      });

      setLocationsInfo(locationsData);
    };

    fetchData();
  }, []);

  const filteredLocations = locationsInfo.filter((info) =>
    info.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getIcon = (categoryName: string) => {
    switch (categoryName.toLowerCase()) {
      case "desk":
        return DeskIcon;
      case "meeting room":
        return MeetingRoomIcon;
      case "open spaces":
        return OpenSpacesIcon;
      case "washrooms":
        return WashroomsIcon;
      default:
        return Fireicon; // Default icon
    }
  };

  return (
    <div>
      <div className="searchlist">
        <div className="search_top_header">
          <h4 style={{ fontWeight: "500", fontSize: "16px" }}>Most Popular</h4>
          <img src={Fireicon} alt="fire icon" width={13} height={13} />
        </div>
        <div id="directory">
          {filteredLocations.map((info, index) => {
            const iconSrc = getIcon(info.categoryName);
            return (
              <Link
                key={index}
                to={`/Polygon`}
                state={{ locationName: info.name }}
                style={{
                  listStyle: 'none',
                  textDecoration: "none",
                  color: "Black",
                }}
              >
                <div className="categoryGroup">
                  <span>
                    {iconSrc && (
                      <img src={iconSrc} alt={info.categoryName} width={23} />
                    )}
                  </span>
                  <ul>
                    <li style={{ fontWeight: "500" }}>{info.name}</li>
                    <li style={{ fontSize: "11px" }}>{info.polygonName}</li>
                  </ul>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchList;
