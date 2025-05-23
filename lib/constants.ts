// HERE API Configuration Guide
export const HERE_API_INTEGRATION = {
  apiKey: {
    description: "API Key for HERE Technologies",
    envVariable: "NEXT_PUBLIC_HERE_API_KEY",
    obtainFrom: "https://developer.here.com/sign-up?create=Freemium-Basic&keepState=true&step=account",
  },

  mapFeatures: {
    interactiveMap: {
      description: "Basic interactive map with markers and controls",
      apiDocs: "https://developer.here.com/documentation/maps-api-for-javascript/dev_guide/index.html",
      implementation: `
// 1. Add the HERE Maps JavaScript API to your project in layout.tsx:
// <script src="https://js.api.here.com/v3/3.1/mapsjs-core.js"></script>
// <script src="https://js.api.here.com/v3/3.1/mapsjs-service.js"></script>
// <script src="https://js.api.here.com/v3/3.1/mapsjs-ui.js"></script>
// <script src="https://js.api.here.com/v3/3.1/mapsjs-mapevents.js"></script>
// <link rel="stylesheet" type="text/css" href="https://js.api.here.com/v3/3.1/mapsjs-ui.css" />

// 2. Update the HereMap component to use the real HERE Maps API:

"use client"

import { useEffect, useRef, useState } from "react"

interface Coordinates {
  lat: number
  lng: number
}

interface HereMapProps {
  center: Coordinates
  zoom: number
  onClick?: (lat: number, lng: number) => void
  markerPosition?: Coordinates
}

export function HereMap({ center, zoom, onClick, markerPosition }: HereMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<H.Map | null>(null)
  const [marker, setMarker] = useState<H.map.Marker | null>(null)
  
  useEffect(() => {
    // Initialize HERE Map
    if (mapRef.current && !map) {
      const platform = new H.service.Platform({
        apikey: process.env.NEXT_PUBLIC_HERE_API_KEY || ""
      });
      
      const defaultLayers = platform.createDefaultLayers();
      
      const newMap = new H.Map(
        mapRef.current,
        defaultLayers.vector.normal.map,
        {
          center: { lat: center.lat, lng: center.lng },
          zoom: zoom,
          pixelRatio: window.devicePixelRatio || 1
        }
      );
      
      // Make the map interactive
      const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(newMap));
      
      // Add UI components
      const ui = H.ui.UI.createDefault(newMap, defaultLayers);
      
      // Add click event listener if onClick is provided
      if (onClick) {
        newMap.addEventListener('tap', (evt) => {
          const coord = newMap.screenToGeo(
            evt.currentPointer.viewportX,
            evt.currentPointer.viewportY
          );
          onClick(coord.lat, coord.lng);
        });
      }
      
      // Set window resize listener
      const handleResize = () => {
        newMap.getViewPort().resize();
      };
      
      window.addEventListener('resize', handleResize);
      
      setMap(newMap);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        newMap.dispose();
      };
    }
  }, [center, zoom, onClick, map]);
  
  // Update map center and zoom when props change
  useEffect(() => {
    if (map) {
      map.setCenter({ lat: center.lat, lng: center.lng });
      map.setZoom(zoom);
    }
  }, [map, center, zoom]);
  
  // Add or update marker when position changes
  useEffect(() => {
    if (map && markerPosition) {
      // Remove existing marker
      if (marker) {
        map.removeObject(marker);
      }
      
      // Create marker
      const newMarker = new H.map.Marker({ 
        lat: markerPosition.lat, 
        lng: markerPosition.lng 
      });
      
      map.addObject(newMarker);
      setMarker(newMarker);
    }
  }, [map, markerPosition, marker]);
  
  return (
    <div ref={mapRef} className="w-full h-full" />
  );
}
      `,
    },

    geocoding: {
      description: "Convert addresses to coordinates and vice versa",
      apiDocs: "https://developer.here.com/documentation/geocoding-search-api/dev_guide/index.html",
      implementation: `
// Function to geocode an address
export async function geocodeAddress(address: string) {
  const url = \`https://geocode.search.hereapi.com/v1/geocode?q=\${encodeURIComponent(address)}&apiKey=\${process.env.NEXT_PUBLIC_HERE_API_KEY}\`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.items && data.items.length > 0) {
      const location = data.items[0];
      return {
        coordinates: location.position,
        address: location.address,
        title: location.title
      };
    }
    
    return null;
  } catch (error) {
    console.error("Error geocoding address:", error);
    return null;
  }
}

// Function to reverse geocode coordinates
export async function reverseGeocode(lat: number, lng: number) {
  const url = \`https://revgeocode.search.hereapi.com/v1/revgeocode?at=\${lat},\${lng}&apiKey=\${process.env.NEXT_PUBLIC_HERE_API_KEY}\`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.items && data.items.length > 0) {
      const location = data.items[0];
      return {
        address: location.address,
        title: location.title
      };
    }
    
    return null;
  } catch (error) {
    console.error("Error reverse geocoding:", error);
    return null;
  }
}
      `,
    },

    routing: {
      description: "Calculate routes between locations",
      apiDocs: "https://developer.here.com/documentation/routing-api/dev_guide/index.html",
      implementation: `
// Function to calculate a route between two points
export async function calculateRoute(startLat: number, startLng: number, endLat: number, endLng: number) {
  const url = \`https://router.hereapi.com/v8/routes?transportMode=car&origin=\${startLat},\${startLng}&destination=\${endLat},\${endLng}&return=polyline,summary,actions,instructions&apiKey=\${process.env.NEXT_PUBLIC_HERE_API_KEY}\`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.routes && data.routes.length > 0) {
      const route = data.routes[0];
      return {
        polyline: route.sections[0].polyline,
        summary: route.sections[0].summary,
        instructions: route.sections[0].actions
      };
    }
    
    return null;
  } catch (error) {
    console.error("Error calculating route:", error);
    return null;
  }
}

// Function to display the route on a map
export function displayRouteOnMap(map: H.Map, routeData: any) {
  // Parse the polyline
  const linestring = H.geo.LineString.fromFlexiblePolyline(routeData.polyline);
  
  // Create a polyline to display the route
  const routeLine = new H.map.Polyline(linestring, {
    style: { strokeColor: '#0066CC', lineWidth: 5 }
  });
  
  // Add the route polyline to the map
  map.addObject(routeLine);
  
  // Zoom to the route
  map.getViewModel().setLookAtData({
    bounds: routeLine.getBoundingBox()
  });
  
  return routeLine;
}
      `,
    },

    heatmap: {
      description: "Create heatmaps to visualize data density",
      apiDocs:
        "https://developer.here.com/documentation/maps-api-for-javascript/dev_guide/topics_api/h-service-heatmap.html",
      implementation: `
// Function to create a heatmap layer
export function createHeatmap(map: H.Map, points: Array<{lat: number, lng: number, value?: number}>) {
  // Create a heatmap provider
  const heatmapProvider = new H.data.heatmap.Provider({
    min: 0,
    max: 20,
    opacity: 0.8,
    assumeValues: false,
    // Customize colors
    colors: {
      0: 'rgba(255, 255, 0, 0)', // transparent
      0.3: 'yellow',
      0.7: 'orange',
      1: 'red'
    }
  });
  
  // Add data points to the heatmap provider
  points.forEach(point => {
    heatmapProvider.addData({
      lat: point.lat,
      lng: point.lng,
      value: point.value || 1 // Default value is 1 if not specified
    });
  });
  
  // Create a layer with the heatmap provider
  const heatmapLayer = new H.map.layer.TileLayer(heatmapProvider);
  
  // Add the heatmap layer to the map
  map.addLayer(heatmapLayer);
  
  return heatmapLayer;
}
      `,
    },

    geofencing: {
      description: "Create virtual boundaries and detect when users enter or exit them",
      apiDocs: "https://developer.here.com/documentation/geofencing/dev_guide/index.html",
      implementation: `
// Function to create a circular geofence
export function createCircularGeofence(map: H.Map, center: {lat: number, lng: number}, radiusInMeters: number) {
  // Create a circle
  const circle = new H.map.Circle(
    { lat: center.lat, lng: center.lng },
    radiusInMeters,
    {
      style: {
        strokeColor: 'rgba(55, 85, 170, 0.6)', // Color of the border
        lineWidth: 2,
        fillColor: 'rgba(55, 85, 170, 0.2)'  // Color of the circle
      }
    }
  );
  
  // Add the circle to the map
  map.addObject(circle);
  
  return circle;
}

// Function to check if a point is inside a circular geofence
export function isPointInCircularGeofence(point: {lat: number, lng: number}, center: {lat: number, lng: number}, radiusInMeters: number) {
  // Calculate distance between points using Haversine formula
  const earthRadius = 6371000; // meters
  const dLat = toRadians(point.lat - center.lat);
  const dLng = toRadians(point.lng - center.lng);
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRadians(center.lat)) * Math.cos(toRadians(point.lat)) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = earthRadius * c;
  
  return distance <= radiusInMeters;
}

function toRadians(degrees: number) {
  return degrees * Math.PI / 180;
}
      `,
    },

    matrixRouting: {
      description: "Calculate routes between multiple origins and destinations",
      apiDocs: "https://developer.here.com/documentation/matrix-routing-api/dev_guide/index.html",
      implementation: `
// Function to calculate routes between multiple origins and destinations
export async function calculateMatrix(
  origins: Array<{lat: number, lng: number}>,
  destinations: Array<{lat: number, lng: number}>
) {
  const originsParam = origins.map(o => \`\${o.lat},\${o.lng}\`).join(';');
  const destinationsParam = destinations.map(d => \`\${d.lat},\${d.lng}\`).join(';');
  
  const url = \`https://matrix.router.hereapi.com/v8/matrix?apiKey=\${process.env.NEXT_PUBLIC_HERE_API_KEY}&origins=\${originsParam}&destinations=\${destinationsParam}&transportMode=car\`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error("Error calculating matrix:", error);
    return null;
  }
}

// Function to find the shortest route in a matrix
export function findShortestRoute(matrixData: any) {
  if (!matrixData || !matrixData.matrix) return null;
  
  let shortestTime = Infinity;
  let originIndex = -1;
  let destinationIndex = -1;
  
  matrixData.matrix.forEach((row: any, i: number) => {
    row.forEach((cell: any, j: number) => {
      if (cell.travelTime < shortestTime) {
        shortestTime = cell.travelTime;
        originIndex = i;
        destinationIndex = j;
      }
    });
  });
  
  return {
    originIndex,
    destinationIndex,
    travelTime: shortestTime
  };
}
      `,
    },

    realTimeTraffic: {
      description: "Get real-time traffic information",
      apiDocs: "https://developer.here.com/documentation/traffic-api/dev_guide/index.html",
      implementation: `
// Function to get traffic incidents in an area
export async function getTrafficIncidents(
  topLeft: {lat: number, lng: number},
  bottomRight: {lat: number, lng: number}
) {
  const url = \`https://traffic.ls.hereapi.com/traffic/6.2/incidents.json?apiKey=\${process.env.NEXT_PUBLIC_HERE_API_KEY}&bbox=\${topLeft.lat},\${topLeft.lng};\${bottomRight.lat},\${bottomRight.lng}&criticality=critical,major,minor\`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    return data.TRAFFIC_ITEMS?.TRAFFIC_ITEM || [];
  } catch (error) {
    console.error("Error getting traffic incidents:", error);
    return [];
  }
}

// Function to display traffic incidents on a map
export function displayTrafficIncidents(map: H.Map, incidents: any[]) {
  incidents.forEach(incident => {
    // Parse the location
    const location = incident.LOCATION.GEOLOC.ORIGIN;
    
    // Create a marker for the incident
    const marker = new H.map.Marker(
      { lat: location.LATITUDE, lng: location.LONGITUDE },
      {
        icon: getIncidentIcon(incident.CRITICALITY)
      }
    );
    
    // Add description to marker
    marker.setData(incident.TRAFFIC_ITEM_TYPE_DESC);
    
    // Add the marker to the map
    map.addObject(marker);
  });
}

// Helper function to get appropriate icon based on incident criticality
function getIncidentIcon(criticality: string) {
  let icon;
  
  switch(criticality) {
    case 'critical':
      icon = new H.map.Icon('path/to/critical-icon.png');
      break;
    case 'major':
      icon = new H.map.Icon('path/to/major-icon.png');
      break;
    default:
      icon = new H.map.Icon('path/to/minor-icon.png');
  }
  
  return icon;
}
      `,
    },

    places: {
      description: "Search for places and points of interest",
      apiDocs: "https://developer.here.com/documentation/places-api/dev_guide/index.html",
      implementation: `
// Function to search for places near a location
export async function searchPlaces(
  lat: number,
  lng: number,
  query: string,
  radius: number = 1000
) {
  const url = \`https://places.ls.hereapi.com/places/v1/discover/search?apiKey=\${process.env.NEXT_PUBLIC_HERE_API_KEY}&at=\${lat},\${lng}&q=\${encodeURIComponent(query)}&size=20&radius=\${radius}\`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    return data.results?.items || [];
  } catch (error) {
    console.error("Error searching places:", error);
    return [];
  }
}

// Function to search for places by category
export async function searchPlacesByCategory(
  lat: number,
  lng: number,
  category: string,
  radius: number = 1000
) {
  const url = \`https://places.ls.hereapi.com/places/v1/discover/around?apiKey=\${process.env.NEXT_PUBLIC_HERE_API_KEY}&at=\${lat},\${lng}&cat=\${encodeURIComponent(category)}&size=20&radius=\${radius}\`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    return data.results?.items || [];
  } catch (error) {
    console.error("Error searching places by category:", error);
    return [];
  }
}

// Function to display places on a map
export function displayPlacesOnMap(map: H.Map, places: any[]) {
  places.forEach(place => {
    // Create a marker for the place
    const marker = new H.map.Marker(
      { lat: place.position[0], lng: place.position[1] }
    );
    
    // Add place details to marker
    marker.setData(place.title);
    
    // Add the marker to the map
    map.addObject(marker);
    
    // Add tap event listener to marker
    marker.addEventListener('tap', (evt) => {
      const bubble = new H.ui.InfoBubble(
        { lat: place.position[0], lng: place.position[1] },
        { content: \`<div>\${place.title}</div>\` }
      );
      
      const ui = H.ui.UI.getInstance(map);
      ui.addBubble(bubble);
    });
  });
}
      `,
    },

    isoline: {
      description: "Calculate areas that can be reached within a specified time or distance",
      apiDocs: "https://developer.here.com/documentation/isoline-routing-api/dev_guide/index.html",
      implementation: `
// Function to calculate an isoline (reachable area)
export async function calculateIsoline(
  lat: number,
  lng: number,
  rangeType: 'time' | 'distance',
  rangeValue: number
) {
  const url = \`https://isoline.router.hereapi.com/v8/isolines?apiKey=\${process.env.NEXT_PUBLIC_HERE_API_KEY}&origin=\${lat},\${lng}&range[type]=\${rangeType}&range[values]=\${rangeValue}&transportMode=car\`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    return data.isolines?.[0] || null;
  } catch (error) {
    console.error("Error calculating isoline:", error);
    return null;
  }
}

// Function to display an isoline on a map
export function displayIsolineOnMap(map: H.Map, isolineData: any, color: string = '#0066CC') {
  if (!isolineData || !isolineData.polygons || isolineData.polygons.length === 0) {
    return null;
  }
  
  // Extract the polygon data
  const outer = isolineData.polygons[0].outer;
  
  // Create a linestring from the outer ring
  const linestring = new H.geo.LineString();
  outer.forEach((point: [number, number]) => {
    linestring.pushLatLngAlt(point[0], point[1], 0);
  });
  
  // Create a polygon from the linestring
  const polygon = new H.map.Polygon(linestring, {
    style: {
      fillColor: color + '80', // 50% opacity
      strokeColor: color,
      lineWidth: 2
    }
  });
  
  // Add the polygon to the map
  map.addObject(polygon);
  
  // Zoom to the polygon
  map.getViewModel().setLookAtData({
    bounds: polygon.getBoundingBox()
  });
  
  return polygon;
}
      `,
    },
  },
}
