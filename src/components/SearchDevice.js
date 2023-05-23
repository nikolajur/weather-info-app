import React, { useContext } from "react";
import LocationContext from "../store/location-context";

const SearchButton = () => {
  const ctx = useContext(LocationContext);

  return (
    <>
      <button
        className="search__position-btn"
        onClick={() => {
          ctx.getCoordinates("device");
        }}
      >
        <img
          className="search__position-btn__icon"
          src="https://img.icons8.com/ios-filled/50/center-direction.png"
          alt="use my location"
        />
      </button>
    </>
  );
};

export default SearchButton;
