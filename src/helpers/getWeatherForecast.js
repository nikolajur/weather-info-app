import axios from "axios";

export const getWeatherForecast = async (lat, lng) => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&timezone=auto&daily=temperature_2m_max&daily=temperature_2m_min&daily=precipitation_sum&daily=weathercode`;

  const weatherForecast = async () => {
    try {
      const response = await axios.get(url);

      let forecast = [];
      for (let i = 0; i < 7; i++) {
        forecast.push({
          time: response.data.daily.time[i],
          temperatureMax: response.data.daily.temperature_2m_max[i],
          temperatureMin: response.data.daily.temperature_2m_min[i],
          precipitation: response.data.daily.precipitation_sum[i],
          code: response.data.daily.weathercode[i]
        });
      }

      return forecast;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  const data = weatherForecast();
  return data;
};
