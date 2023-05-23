import axios from "axios";

export const getCityCoordinates = async (cityName) => {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=10&language=en&format=json`;

  const cityCoordinates = async () => {
    try {
      const response = await axios.get(url);
      return response.data.results;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  const data = cityCoordinates();
  return data;
};
