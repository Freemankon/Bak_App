import { Form } from "react-bootstrap";

const NameValue = ({ name, value }) => (
  <div className="d-flex justify-content-between">
    <Form.Label>{name}</Form.Label>
    <Form.Label>{value}</Form.Label>
  </div>
);

export default NameValue;
