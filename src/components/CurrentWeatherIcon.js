const CurrentWeatherIcon = ({ code }) => {
  let weatherIcon;
  switch (code) {
    case "01d":
      weatherIcon = "sun";
      break;
    case "01n":
      weatherIcon = "bright-moon";
      break;
    case "02d":
      weatherIcon = "partly-cloudy-day";
      break;
    case "02n":
      weatherIcon = "partly-cloudy-night";
      break;
    case "03d":
    case "03n":
      weatherIcon = "clouds";
      break;
    case "04d":
    case "04n":
      weatherIcon = "cloud";
      break;
    case "09d":
    case "09n":
      weatherIcon = "rain";
      break;
    case "10d":
    case "10n":
      weatherIcon = "rainy-weather";
      break;
    case "11d":
    case "11n":
      weatherIcon = "storm";
      break;
    case "13d":
    case "13n":
      weatherIcon = "snow";
      break;
    case "50d":
      weatherIcon = "fog-day";
      break;
    case "50n":
      weatherIcon = "fog-night";
      break;
    default:
      weatherIcon = "thermometer";
      break;
  }

  return (
    <img
      className="weather__description-icon"
      src={`https://img.icons8.com/sf-regular/48/023047/${weatherIcon}.png`}
      alt={weatherIcon}
    />
  );
};

export default CurrentWeatherIcon;
