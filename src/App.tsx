import React, { useMemo, useState, useCallback, useEffect } from "react";
import {
  TGetVenueOptions,
  E_SDK_EVENT,
  E_CAMERA_EVENT,
} from "@mappedin/mappedin-js";
import "@mappedin/mappedin-js/lib/mappedin.css";
import useMapView from "./Sources/useMapview";
import useVenue from "./Sources/useVenue";
import "./App.css";
import Card from "./Card/Card";
import PolygonCard from "./Card/Polygon_Card/PolygonCard";
import DirectionCard from "./Card/Direction_Card/Direction_Card";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Toplocation_card from "./Card/Toplocation_Card/ToplocationCard";
import Categorycard from "./Card/Category_Card/Categorycard";
import Empty from "./Card/Empty";
import SearchList from "./Card/Search_List/SearchList";

export default function App() {
  const options = useMemo<TGetVenueOptions>(
    () => ({
      venue: "mappedin-demo-office",
      clientId: "5eab30aa91b055001a68e996",
      clientSecret: "RJyRXKcryCMy4erZqqCbuB1NbR66QTGNXVE0x3Pg6oCIlUR1",
    }),
    []
  );

  const venue = useVenue(options);
  console.log("venue", venue);

  const { elementRef, mapView } = useMapView(venue);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [showCard, setShowCard] = useState(true); // State to manage Card visibility
  const [searchTerm, setSearchTerm] = useState("");

  console.log("TOPLOCATIONS", venue?.venue.topLocations);

  // State for map groups and levels
  const [mapGroups, setMapGroups] = useState<any[]>([]);
  const [maps, setMaps] = useState<any[]>([]);

  const handleClose = useCallback(() => {
    setSelectedLocation(null);
  }, []);

  useEffect(() => {
    if (mapView && venue) {
      mapView.addInteractivePolygonsForAllLocations();
      mapView.on(E_SDK_EVENT.CLICK, ({ polygons }) => {
        mapView.clearAllPolygonColors();
        if (polygons.length > 0) {
          mapView.setPolygonColor(polygons[0], "grey");

          const parentObject = venue?.locations.find((location) =>
            location.polygons.some((polygon) => polygon.id === polygons[0].id)
          );
          if (parentObject) {
            setSelectedLocation(parentObject);
            setShowCard(false); // Hide Card component
            console.log("Floor name:", polygons[0].map.name);
            console.log("Room Name:", parentObject.name); // Log location details here
            console.log("Type :", parentObject.type);

            parentObject.categories.forEach((category: any) => {
              console.log("Category Name:", category.name);
            });
          }
        } else {
          setSelectedLocation(null);
          mapView.clearAllPolygonColors();
        }
      });

      mapView.on(E_SDK_EVENT.CLICK, ({ polygons }) => {
        if (polygons.length === 0) {
          mapView.Camera.set({
            rotation: 0,
            tilt: 0.0,
            zoom: 4000,
          });
        } else {
          mapView.Camera.focusOn(
            {
              polygons,
            },
            {
              duration: 500,
            }
          );
        }
      });

      mapView.Camera.on(E_CAMERA_EVENT.USER_INTERACTION_START, () => {});

      mapView.Camera.on(E_CAMERA_EVENT.USER_INTERACTION_END, () => {});

      mapView.Camera.on(
        E_CAMERA_EVENT.CHANGED,
        ({ tilt, rotation, zoom, position }) => {}
      );

      const deskIcon = ``;
      const washroomIcon = ``;
      const meetingRoomIcon = ``;
      const spacesIcon = ``;
      const colors = ["#A8577E", "pink", "green", "#219ED4", "tomato", "grey"];
      venue.categories.forEach((category, index) => {
        category.locations.forEach((location) => {
          if (location.polygons.length <= 0) {
            return;
          }

          let icon;
          switch (category.name) {
            case "Desk":
              icon = deskIcon;
              break;
            case "Meeting Room":
              icon = meetingRoomIcon;
              break;
            case "Washrooms":
              icon = washroomIcon;
              break;
            case "Open Spaces":
              icon = spacesIcon;
              break;
            default:
              icon = "";
          }

          const color = colors[index % colors.length];
          mapView.FloatingLabels.add(location.polygons[0], location.name, {
            appearance: {
              marker: {
                icon: icon,
                foregroundColor: {
                  active: color,
                  inactive: color,
                },
              },
            },
          });
        });
      });

      // Populate map groups and levels
      setMapGroups(venue.mapGroups);

      const initialMaps = venue.mapGroups[0].maps.sort(
        (a, b) => b.elevation - a.elevation
      );
      setMaps(initialMaps);
    }
  }, [mapView, venue]);

  const handleMapGroupChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      if (venue) {
        const mapGroup = venue.mapGroups.find(
          (mg) => mg.id === event.target.value
        );
        if (mapGroup) {
          const sortedMaps = mapGroup.maps.sort(
            (a, b) => b.elevation - a.elevation
          );
          setMaps(sortedMaps);
          if (mapView) {
            mapView.setMap(sortedMaps[sortedMaps.length - 1]);
          }
        }
      }
    },
    [venue, mapView]
  );

  const handleMapLevelChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      if (mapView) {
        mapView.setMap(event.target.value);
      }
    },
    [mapView]
  );

  return (
    <div id="app" ref={elementRef}>
      <div id="selectorDiv">
        <select onChange={handleMapGroupChange} style={{ display: "none" }}>
          {mapGroups.map((mg) => (
            <option key={mg.id} value={mg.id}>
              {mg.name}
            </option>
          ))}
        </select>
        <select onChange={handleMapLevelChange} id="Levelselctor">
          {maps.map((map) => (
            <option key={map.id} value={map.id}>
              {map.name}
            </option>
          ))}
        </select>
      </div>

      <Router>
        {/* <Empty/> */}
        <div
          style={{
            position: "absolute",
            zIndex: 999,
            height: "max-content",
            left: "3cm",
            top: "1cm",
            backgroundColor: "white",
            borderRadius: "20px",
            transition: " 3s height ease",
          }}
        >
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Card setSearchTerm={setSearchTerm} />
                  <Toplocation_card />
                </>
              }
            />
            <Route
              path="/categorycard"
              element={
                <>
                  <Card setSearchTerm={setSearchTerm} />
                  <Categorycard />{" "}
                </>
              }
            />
            <Route
              path="/searchlist"
              element={
                <>
                  <Card setSearchTerm={setSearchTerm} />
                  <SearchList searchTerm={searchTerm} mapView={mapView} venue={venue}/>
                </>
              }
            />

            <Route path="/Polygon" element={<PolygonCard />} />
            <Route
              path="/directions/true"
              element={
                <div style={{position:"fixed"}}>
                  <DirectionCard />
                  <div style={{position:"fixed",left:"123px",  width:"9.4cm",top:"5.6cm",paddingTop:"0.3cm", backgroundColor:"white",borderRadius:"23px"}}>
                  <SearchList searchTerm={searchTerm} mapView={mapView} venue={venue}/>
                  </div>
             

                </div>
              }
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}
  