const WeatherForcastIcon = ({ code }) => {
  let weatherIcon;

  switch (code) {
    case 0:
    case 1:
      weatherIcon = "sun";
      break;
    case 2:
      weatherIcon = "partly-cloudy-day";
      break;
    case 3:
      weatherIcon = "cloud";
      break;
    case 45:
    case 48:
      weatherIcon = "fog-day";
      break;
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
      weatherIcon = "rain";
      break;
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
    case 80:
    case 81:
    case 82:
      weatherIcon = "rainy-weather";
      break;
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      weatherIcon = "snow";
      break;
    case 95:
    case 96:
    case 99:
      weatherIcon = "storm";
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
      /*  style={{ width: "48px", height: "48px" }} */
    />
  );
};

export default WeatherForcastIcon;
