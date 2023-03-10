import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import Map from "./components/Map";
import { useRouter } from "next/router";
import RideSelector from "./components/RideSelector";
import Link from "next/link";

const Confirm = () => {
  const router = useRouter();
  const { pickup, dropoff } = router.query;
  const [pickUpCoordinate, setPickUpCoordinate] = useState([0, 0]);
  const [dropOffCoordinate, setDropOffCoordinate] = useState([0, 0]);

  const getPickUpCoordinate = (pickup) => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?` +
        new URLSearchParams({
          access_token:
            "pk.eyJ1Ijoia2FpbGViIiwiYSI6ImNsZXZnNTF0NzA2YW8zcm80bXFibW16eDcifQ.CWet-QKeMJXv-X2mbO547Q",
          limit: 1,
        })
    )
      .then((response) => response.json())
      .then((data) => {
        setPickUpCoordinate(data.features[0].center);
      });
  };

  const getDropOffCoordinate = (dropoff) => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?` +
        new URLSearchParams({
          access_token:
            "pk.eyJ1Ijoia2FpbGViIiwiYSI6ImNsZXZnNTF0NzA2YW8zcm80bXFibW16eDcifQ.CWet-QKeMJXv-X2mbO547Q",
          limit: 1,
        })
    )
      .then((response) => response.json())
      .then((data) => {
        setDropOffCoordinate(data.features[0].center);
      });
  };

  useEffect(() => {
    getDropOffCoordinate(dropoff);
    getPickUpCoordinate(pickup);
  }, [dropoff, pickup]);

  return (
    <Wrapper>
      <ButtonContainer>
        <Link href="/search">
          <BackButtonImage src="https://img.icons8.com/ios-filled/50/000000/left.png" />
        </Link>
      </ButtonContainer>
      <Map
        pickUpCoordinate={pickUpCoordinate}
        dropOffCoordinate={dropOffCoordinate}
      />

      <RideContainer>
        <RideSelector
          pickUpCoordinate={pickUpCoordinate}
          dropOffCoordinate={dropOffCoordinate}
        />
        <ConfirmButtonContainer>
          <ConfirmButton>Confirm UberX</ConfirmButton>{" "}
        </ConfirmButtonContainer>
      </RideContainer>
    </Wrapper>
  );
};

export default Confirm;

const Wrapper = tw.div`
flex h-screen flex-col
`;

const RideContainer = tw.div`
flex-1 flex-col flex h-1/2`;

const ConfirmButtonContainer = tw.div`
 border-t-2
`;

const ConfirmButton = tw.div`
bg-black text-white text-center my-4 py-4 mx-4 text-xl
`;

const BackButtonImage = tw.img`
`;

const ButtonContainer = tw.div`
rounded-full absolute top-4 left-4 z-10 bg-white shadow-md cursor-pointer`;
