import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import {carList} from "../../data"

const RideSelector = ({ pickUpCoordinate, dropOffCoordinate }) => {
  const [rideDuration, setRideDuration] = useState(0);

  useEffect(() => {
    fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${pickUpCoordinate[0]},${pickUpCoordinate[1]};${dropOffCoordinate[0]},${dropOffCoordinate[1]}?access_token=pk.eyJ1Ijoia2FpbGViIiwiYSI6ImNsZXZnNTF0NzA2YW8zcm80bXFibW16eDcifQ.CWet-QKeMJXv-X2mbO547Q`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(pickUpCoordinate[0], pickUpCoordinate[1]);
        console.log(data);
        setRideDuration(data.routes[0].duration);
      });
  }, [pickUpCoordinate, dropOffCoordinate]);
  return (
    <Wrapper>
      <Title>Choose a ride, or swipe up for more</Title>
      <CarList>
        {carList.map((car, index) => (
          <Car key={index}>
            <CarImage src={car.imgUrl} />
            <CarDetails>
              <Service>{car.service}</Service>
              <Time>Book a seat now!</Time>
            </CarDetails>
            <Price>{"#" + (rideDuration * car.multiplier).toFixed(2)}</Price>
          </Car>
        ))}
      </CarList>
    </Wrapper>
  );
};

export default RideSelector;

const Wrapper = tw.div`
flex-1 overflow-y-scroll flex flex-col
`;

const Title = tw.div`
text-gray-500 text-center text-xs py-2 border-b`;

const CarList = tw.div`
overflow-y-scroll`;
const Car = tw.div`
flex items-center p-4 
`;
const CarImage = tw.img`
h-14 mr-4 
`;
const CarDetails = tw.div`
flex-1
`;

const Service = tw.div`
font-medium`;

const Time = tw.div`
text-xs text-blue-500`;
const Price = tw.div`
text-sm`;
