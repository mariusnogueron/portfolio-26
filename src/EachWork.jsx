import { useParams } from "react-router";
import Works from "./Works";

export default function EachWork() {
  const { workId } = useParams();

  return (
    <>
      <h1>{workId}</h1>
    </>
  );
}
