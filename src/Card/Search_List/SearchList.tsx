import React, { useEffect, useState } from "react";
import {
  getVenue,
  TGetVenueOptions,
  MappedinPolygon,
} from "@mappedin/mappedin-js";
import "@mappedin/mappedin-js/lib/mappedin.css";
import Fireicon from "../../Assets/fire.png";
import "./Search.css";

interface Props {
  searchTerm: string;
}

const SearchList: React.FC<Props> = ({ searchTerm }) => {
  const [categories, setCategories] = useState<any[]>([]); // Adjust type as per your data structure
  const [filteredCategories, setFilteredCategories] = useState<any[]>([]); // State to hold filtered categories
  const [showTopHeader, setShowTopHeader] = useState(true);

  const options: TGetVenueOptions = {
    venue: "mappedin-demo-office",
    clientId: "5eab30aa91b055001a68e996",
    clientSecret: "RJyRXKcryCMy4erZqqCbuB1NbR66QTGNXVE0x3Pg6oCIlUR1",
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const venue = await getVenue(options);

        const sortedCategories = [
          ...venue.categories.sort((a, b) => (a.name! > b.name! ? 1 : 0)),
        ];

        setCategories(sortedCategories);
      } catch (error) {
        console.error("Error fetching venue:", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    // Filter categories based on searchTerm
    const filtered = categories.filter(filterCategories);
    setFilteredCategories(filtered);

    // Show or hide top header based on searchTerm and filtered results
    setShowTopHeader(searchTerm === "" || filtered.length > 0);
  }, [searchTerm, categories]); // Include categories in dependency array

  const filterCategories = (category: any) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    // Check if the search term matches category name
    if (category.name.toLowerCase().includes(lowerCaseSearchTerm)) {
      return true;
    }

    // Check if any location name matches the search term
    if (category.locations) {
      for (let location of category.locations) {
        if (location.name.toLowerCase().includes(lowerCaseSearchTerm)) {
          return true;
        }
        // Check if any polygon name matches the search term
        if (location.polygons) {
          for (let polygon of location.polygons) {
            if (polygon.map.name.toLowerCase().includes(lowerCaseSearchTerm)) {
              return true;
            }
          }
        }
      }
    }

    return false;
  };

  return (
    <div className="searchlist">
      {!searchTerm && (
        <div className="search_top_header">
          <h4 style={{ fontWeight: "500", fontSize: "16px" }}>Most Popular</h4>
          <img src={Fireicon} alt="fire icon" width={13} height={13} />
        </div>
      )}
      <div id="directory">
        {filteredCategories.map((category) => (
          <div className="categoryGroup" key={category.id}>
            {searchTerm && <h4 >{category.name}</h4>}
            {category.locations && category.locations.length > 0 && (
              <div>
                {category.locations.map((location: any) => ( // Adjust type as per your data structure
                  <div className="locationGroup" key={location.id}>
                    <div className="locationHeader">
                      <img src={Fireicon} alt="fire icon" width={17}  />
                      <h4>{location.name}</h4>
                    </div>
                    {location.polygons && (
                      <ul className="polygonList">
                        {location.polygons.map((polygon: MappedinPolygon, index: number) => (
                          <li key={index}>
                            {polygon.map.name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchList;
