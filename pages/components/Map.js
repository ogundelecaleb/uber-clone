import React from "react";
import tw from "tailwind-styled-components";
import mapboxgl from "!mapbox-gl";
import { useEffect } from "react";

mapboxgl.accessToken =
  "pk.eyJ1Ijoia2FpbGViIiwiYSI6ImNsZXZnNTF0NzA2YW8zcm80bXFibW16eDcifQ.CWet-QKeMJXv-X2mbO547Q";
//   -99.29011, 39.39172  9.1021, 18.2812  6.5244, 3.3792

const Map = (props) => {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/drakosi/ckvcwq3rwdw4314o3i2ho8tph",
      center: [9.1021, 18.2812],
      zoom: 3,
    });

    if(props.pickUpCoordinate){
        addToMap(map, props.pickUpCoordinate)
    }

    if(props.dropOffCoordinate){
        addToMap(map, props.dropOffCoordinate)
    }

    if(props.dropOffCoordinate && props.pickUpCoordinate){
        map.fitBounds([
            props.pickUpCoordinate,
            props.dropOffCoordinate,
        ],{
            padding: 60,
        })
    }
  }, [props.pickUpCoordinate, props.dropOffCoordinate]);

  const addToMap = (map, coordinates) => {
    const marker1 = new mapboxgl.Marker()
      .setLngLat(coordinates)
      .addTo(map);
  };
  

  return <Wrapper id="map"></Wrapper>;
};

export default Map;

const Wrapper = tw.div`
flex-1 h-1/2`;
