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

      let Deskicon = `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
      <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.5 8C3.5 7.04306 3.50106 6.37565 3.56876 5.87208C3.63453 5.3829 3.75483 5.12385 3.93934 4.93934C4.12385 4.75483 4.3829 4.63453 4.87208 4.56876C5.37565 4.50106 6.04306 4.5 7 4.5H17C17.9569 4.5 18.6244 4.50106 19.1279 4.56876C19.6171 4.63453 19.8762 4.75483 20.0607 4.93934C20.2452 5.12385 20.3655 5.3829 20.4312 5.87208C20.4989 6.37565 20.5 7.04306 20.5 8V16.5H3.5V8Z" stroke="#222222"/>
      <path d="M3.66667 16.5C3.02233 16.5 2.5 17.0223 2.5 17.6667C2.5 18.6792 3.32081 19.5 4.33333 19.5H19.6667C20.6792 19.5 21.5 18.6792 21.5 17.6667C21.5 17.0223 20.9777 16.5 20.3333 16.5H3.66667Z" stroke="#222222"/>
      </svg>`;
              let meetingRoomIcon = `<?xml version="1.0" encoding="utf-8"?>
      
      <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
      <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
      <svg height="800px" width="800px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
         viewBox="0 0 512 512"  xml:space="preserve">
      <style type="text/css">
        .st0{fill:#000000;}
      </style>
      <g>
        <path class="st0" d="M426.104,277.148c-16.228-28.842-40.49-47.086-76.866-47.086H162.34c-36.376,0-60.638,18.244-76.866,47.086
          l-7.385,13.14c-6.316,11.201-5.614,24.499,1.806,35.147c7.439,10.649,20.552,17.122,34.675,17.122h282.437
          c14.122,0,27.236-6.473,34.674-17.122c7.42-10.648,8.114-23.946,1.806-35.147L426.104,277.148z"/>
        <path class="st0" d="M329.905,467.721h25.157v-14.07c0-18.903-15.324-34.228-34.226-34.228h-52.472v-62.374h-25.149v62.374h-52.471
          c-18.903,0-34.227,15.324-34.227,34.228v14.07h25.148v-9.386c0-6.306,5.114-11.412,11.412-11.412h50.138v20.798h25.149v-20.798
          h50.138c6.298,0,11.403,5.106,11.403,11.412V467.721z"/>
        <path class="st0" d="M255.785,477.773c-9.448,0-17.114,7.666-17.114,17.114c0,9.456,7.666,17.114,17.114,17.114
          c9.456,0,17.113-7.658,17.113-17.114C272.898,485.439,265.241,477.773,255.785,477.773z"/>
        <path class="st0" d="M167.253,477.773c-9.456,0-17.114,7.666-17.114,17.114c0,9.456,7.658,17.114,17.114,17.114
          c9.447,0,17.105-7.658,17.105-17.114C184.358,485.439,176.7,477.773,167.253,477.773z"/>
        <path class="st0" d="M344.335,477.773c-9.456,0-17.114,7.666-17.114,17.114c0,9.456,7.657,17.114,17.114,17.114
          c9.456,0,17.113-7.658,17.113-17.114C361.448,485.439,353.79,477.773,344.335,477.773z"/>
        <path class="st0" d="M359.334,35.63C357.983,15.579,341.326,0,321.23,0H191.892c-20.096,0-36.753,15.579-38.104,35.63
          l-12.429,184.432h230.404L359.334,35.63z"/>
        <path class="st0" d="M113.965,204.344c9.306,0,16.842-7.535,16.842-16.842c0-9.298-7.535-16.841-16.842-16.841H78.037
          c-9.298,0-16.842,7.543-16.842,16.841c0,9.306,7.543,16.842,16.842,16.842H113.965z"/>
        <path class="st0" d="M433.963,170.661h-35.929c-9.307,0-16.841,7.543-16.841,16.841c0,9.306,7.534,16.842,16.841,16.842h35.929
          c9.297,0,16.842-7.535,16.842-16.842C450.805,178.204,443.26,170.661,433.963,170.661z"/>
      </g>
      </svg>`;
                  let spacesIcon=``
      
              let bathroomicon = `<?xml version="1.0" encoding="iso-8859-1"?>
      <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
      <svg fill="#000000" height="800px" width="800px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
         viewBox="0 0 512 512" xml:space="preserve">
      <g>
        <g>
          <path d="M256,0c-9.22,0-16.696,7.475-16.696,16.696v478.609c0,9.22,7.475,16.696,16.696,16.696c9.22,0,16.696-7.475,16.696-16.696
            V16.696C272.696,7.475,265.22,0,256,0z"/>
        </g>
      </g>
      <g>
        <g>
          <path d="M105.739,44.522c-36.824,0-66.783,29.959-66.783,66.783c0,36.824,29.959,66.783,66.783,66.783
            s66.783-29.959,66.783-66.783C172.522,74.48,142.563,44.522,105.739,44.522z M105.739,144.696
            c-18.412,0-33.391-14.979-33.391-33.391c0-18.412,14.979-33.391,33.391-33.391s33.391,14.979,33.391,33.391
            C139.13,129.716,124.151,144.696,105.739,144.696z"/>
        </g>
      </g>
      <g>
        <g>
          <path d="M406.261,44.522c-36.824,0-66.783,29.959-66.783,66.783c0,36.824,29.959,66.783,66.783,66.783
            s66.783-29.959,66.783-66.783C473.043,74.48,443.085,44.522,406.261,44.522z M406.261,144.696
            c-18.412,0-33.391-14.979-33.391-33.391c0-18.412,14.979-33.391,33.391-33.391c18.412,0,33.391,14.979,33.391,33.391
            C439.652,129.716,424.673,144.696,406.261,144.696z"/>
        </g>
      </g>
      <g>
        <g>
          <path d="M189.217,211.478H22.261c-11.645,0-19.723,11.651-15.633,22.558l49.024,130.73v63.755
            c0,27.618,22.469,50.087,50.087,50.087c27.618,0,50.087-22.469,50.087-50.087v-63.755l49.024-130.73
            C208.939,223.133,200.865,211.478,189.217,211.478z M123.498,355.877c-0.702,1.874-1.063,3.86-1.063,5.862v66.783
            c0,9.206-7.49,16.696-16.696,16.696s-16.696-7.49-16.696-16.696v-66.783c0-2.002-0.361-3.988-1.063-5.862L46.353,244.87h118.773
            L123.498,355.877z"/>
        </g>
      </g>
      <g>
        <g>
          <path d="M505.372,355.877l-50.087-133.565c-2.443-6.516-8.673-10.833-15.633-10.833H372.87c-6.96,0-13.19,4.318-15.633,10.833
            L307.15,355.877c-4.089,10.903,3.985,22.558,15.633,22.558h33.391v50.087c0,27.618,22.469,50.087,50.087,50.087
            s50.087-22.469,50.087-50.087v-50.087h33.391C501.384,378.435,509.462,366.783,505.372,355.877z M439.652,345.043
            c-9.22,0-16.696,7.475-16.696,16.696v66.783c0,9.206-7.49,16.696-16.696,16.696s-16.696-7.49-16.696-16.696v-66.783
            c0-9.22-7.475-16.696-16.696-16.696h-25.995L384.44,244.87h43.642l37.565,100.174H439.652z"/>
        </g>
      </g>
      </svg>`;
      
           
      const colors = ["#A8577E", "pink", "green", "#219ED4", "tomato", "grey"];
      venue.categories.forEach((category, index) => {
        category.locations.forEach((location) => {
          if (location.polygons.length <= 0) {
            return;
          }

          let icon;
          switch (category.name) {
            case "Desk":
              icon = Deskicon;
              break;
            case "Meeting Room":
              icon = meetingRoomIcon;
              break;
            case "Washrooms":
              icon = bathroomicon;
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
            transition: " height .3s  ease-out",opacity:".1s linear"
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
                  
                </div>
              }
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}
  