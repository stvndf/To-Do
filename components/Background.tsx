import {
  faCheckDouble,
  faSkull,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  dataStatus: "available" | "unavailable" | "error";
}

export default function Background({ dataStatus }: Props) {
  if (dataStatus === "error")
    return (
      <div className="absolute opacity-100 top-1/3">
        <FontAwesomeIcon icon={faSkull}  className="text-[18em]" />
        <h1 className="pt-3 text-4xl text-center">Error</h1>
      </div>
    );

  if (dataStatus === "unavailable")
    return (
      <div className="absolute top-1/3 opacity-5">
        <FontAwesomeIcon icon={faSpinner} spin className="text-[18em]" />
      </div>
    );

  return (
    <div className="absolute top-1/3 opacity-5">
      <FontAwesomeIcon icon={faCheckDouble} className="text-[18em]" />
    </div>
  );
}
