import axios from "axios";

export const getCurrentWeather = async (lat, lng) => {
  const key = process.env.REACT_APP_API_KEY;

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${key}&units=metric`;

  const currentWeather = async () => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  const data = currentWeather();
  return data;
};
