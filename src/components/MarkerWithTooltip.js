import { useContext } from "react";
import { Marker, Tooltip } from "react-leaflet";
import LocationContext from "../store/location-context";
import { circleIcon } from "../helpers/circleIcon";

const MarkerWithTooltip = ({ position, labelName, labelCountry }) => {
  const ctx = useContext(LocationContext);

  const tooltipLabel = labelName ? `${labelName}, ${labelCountry}` : null;

  const onClickHandler = () => {
    ctx.getCoordinates("select", null, position);
  };

  return (
    <Marker
      position={position}
      icon={circleIcon}
      eventHandlers={ctx.coordinates.length > 1 ? { "click": onClickHandler } : null}
    >
      {tooltipLabel && (
        <Tooltip
          permanent
          eventHandlers={{
            "click": () => {
              console.log("click tooltip");
            }
          }}
        >
          {tooltipLabel ? tooltipLabel : "ahoj"}
        </Tooltip>
      )}
    </Marker>
  );
};

export default MarkerWithTooltip;
