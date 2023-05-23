import React, { useState, useCallback } from "react";
import LocationContext from "./location-context";
import { getCurrentWeather } from "../helpers/getCurrentWeather";
import { getCityCoordinates } from "../helpers/getCityCoodrinates";

const DEFAULT_LOCATION_STATE = {
  coordinates: null,
  isFromDevice: null,
  weather: null,
  isLoading: { position: null, weather: null },
  error: { position: null, weather: null },
  getCoordinatates: () => {}
};

const LocationProvider = ({ children }) => {
  const [locationInfo, setLocationInfo] = useState(DEFAULT_LOCATION_STATE);
  const [positionIsLoading, setPositionIsLoading] = useState(null);
  const [weatherIsLoading, setWeatherIsLoading] = useState(null);
  const [positionError, setPositionError] = useState(null);
  const [weatherError, setWeatherError] = useState(null);

  const fetchCurrentWeatherAPI = useCallback(async (lat, lng) => {
    setWeatherIsLoading(true);
    try {
      const data = await getCurrentWeather(lat, lng);

      if (data) {
        setLocationInfo((prev) => ({
          ...prev,
          weather: data,
          isFromDevice: true
        }));
        setWeatherIsLoading(false);
        setWeatherError(false);
      }
    } catch (error) {
      setWeatherIsLoading(false);
      setWeatherError(true);
    }
  }, []);

  const onPositionFound = useCallback((position, fromGPS) => {
    setLocationInfo((prev) => ({
      ...prev,
      coordinates: position,
      isFromDevice: fromGPS
    }));
    setPositionIsLoading(false);
    setPositionError(false);
  }, []);

  const onPositionError = useCallback((error) => {
    setPositionIsLoading(false);
    setPositionError(error);
  }, []);

  const getCoordinatates = useCallback(
    async (method, searchedText = null, coordinates = null) => {
      setPositionIsLoading(true);
      setLocationInfo((prev) => ({
        ...prev,
        isFromDevice: null,
        coordinates: null,
        weather: null
      }));
      if (method === "device") {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            onPositionFound(
              [{ lat: position.coords.latitude, lng: position.coords.longitude }],
              true
            );
            fetchCurrentWeatherAPI(position.coords.latitude, position.coords.longitude);
          },
          (error) => {
            onPositionError("I can't get the device position.");
          },
          { timeout: 30000, maximumAge: 0 }
        );
      } else if (method === "search") {
        if (searchedText) {
          try {
            const data = await getCityCoordinates(searchedText);

            if (data.length === 1) {
              onPositionFound([{ lat: data[0].latitude, lng: data[0].longitude }], false);
              fetchCurrentWeatherAPI(data[0].latitude, data[0].longitude);
            }
            if (data.length > 1) {
              const coordinatesArray = data.map((city) => {
                return {
                  name: city.name,
                  country: city.country_code,
                  lat: city.latitude,
                  lng: city.longitude
                };
              });
              onPositionFound(coordinatesArray, false);
            }
          } catch (error) {
            onPositionError("I can't find a location with this name.");
          }
        } else {
          onPositionError("Please enter a valid location name");
        }
      } else if (method === "select") {
        onPositionFound([{ lat: coordinates[0], lng: coordinates[1] }], false);
        fetchCurrentWeatherAPI(coordinates[0], coordinates[1]);
      } else {
        return;
      }
    },
    [fetchCurrentWeatherAPI, onPositionFound, onPositionError]
  );

  return (
    <LocationContext.Provider
      value={{
        coordinates: locationInfo.coordinates,
        isFromDevice: locationInfo.isFromDevice,
        weather: locationInfo.weather,
        isLoading: { position: positionIsLoading, weather: weatherIsLoading },
        error: { position: positionError, weather: weatherError },
        getCoordinates: getCoordinatates
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;
