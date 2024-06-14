import { Spinner } from "react-bootstrap";
import "./Loader.css";

const Loader = () => (
  <div className="spinner-wrapper">
    <Spinner animation="border" role="status" />
  </div>
);

export default Loader;
