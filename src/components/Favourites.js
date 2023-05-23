import { useState, useContext, useEffect, useCallback } from "react";
import LocationContext from "../store/location-context";

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);
  const ctx = useContext(LocationContext);

  const selectFromFavourites = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formJson = Object.fromEntries(formData.entries());
    const selectedValue = JSON.parse(formJson.favourites);

    ctx.getCoordinates("select", null, selectedValue);
  };

  const updateFavourites = useCallback(() => {
    const isFavourite = favourites.some((location) => {
      return location.name === ctx.weather.name;
    });

    if (!isFavourite) {
      let savedFavourites = favourites.length === 5 ? favourites.slice(1) : [...favourites];

      savedFavourites.push({
        name: ctx.weather.name,
        lat: ctx.weather.coord.lat,
        lng: ctx.weather.coord.lon
      });

      setFavourites(savedFavourites);
      localStorage.clear("my-location");
      localStorage.setItem("my-locations", JSON.stringify(savedFavourites));
    }
  }, [ctx.weather, favourites]);

  useEffect(() => {
    const myFavourites = JSON.parse(localStorage.getItem("my-locations"));
    if (myFavourites) {
      setFavourites(myFavourites);
    }
  }, []);

  useEffect(() => {
    if (ctx.weather) {
      updateFavourites();
    }
  }, [ctx.weather, updateFavourites]);

  return (
    <form className="favourites-form" id="favourites-form" onSubmit={selectFromFavourites}>
      <select name="favourites" form="favourites-form">
        <option value=""> -- select favourite location -- </option>
        {favourites.length >= 0 &&
          favourites.map((location, i) => {
            return (
              <option key={i * 10} value={`[${location.lat}, ${location.lng}]`}>
                {location.name}
              </option>
            );
          })}
      </select>
      <button className="favourites-form-btn" type="submit">
        Select
      </button>
    </form>
  );
};

export default Favourites;
