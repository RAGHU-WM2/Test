import {
    Mappedin,
    MapView,
    showVenue,
    TMapViewOptions
  } from "@mappedin/mappedin-js";
  import { useCallback, useEffect, useRef, useState } from "react";
  
  export default function useMapView(
    venue: Mappedin | undefined,
    options?: TMapViewOptions
  ) {
    const [mapView, setMapView] = useState<MapView | undefined>();
    const mapRef = useRef<HTMLDivElement | null>(null);
    const isRendering = useRef(false);
  
    const renderVenue = useCallback(
      async (el: HTMLDivElement, venue: Mappedin, options?: TMapViewOptions) => {
        if (isRendering.current === true || mapView != null) {
          return;
        }
  
        isRendering.current = true;
  
        const mergedOptions = {
          ...options,
          backgroundColor: "#E7E1DA"
        };
  
        const _mapView = await showVenue(el, venue, mergedOptions);
        setMapView(_mapView);
  
        isRendering.current = false;
      },
      [isRendering, mapView, setMapView]
    );
  
    const elementRef = useCallback(
      (element: HTMLDivElement | null) => {
        if (element == null) {
          return;
        }
  
        mapRef.current = element;
  
        if (mapView == null && venue != null && isRendering.current == false) {
          renderVenue(element, venue, options);
        }
      },
      [mapView, venue, renderVenue, options]
    );
  
    // Initialize the MapView if the element has been created and the venue loaded afterwards
    useEffect(() => {
      if (mapView) {
        return;
      }
  
      if (mapRef.current != null && venue != null) {
        renderVenue(mapRef.current, venue, options);
      }
    }, [venue, mapView, renderVenue, options]);
  
    return { mapView, elementRef };
  }
  