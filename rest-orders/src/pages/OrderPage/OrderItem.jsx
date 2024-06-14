import { Button, Row, Col, Card } from "react-bootstrap";
import { FaPlus, FaMinus } from "react-icons/fa6";

const OrderItem = ({ item, updateCount }) => {
  const { id, name, price, count } = item;

  return (
    <Card className="mb-2">
      <Card.Body>
        <Row>
          <Col>
            <Card.Title>{name}</Card.Title>
            <Card.Text>{price}</Card.Text>
          </Col>
          <Col className="d-flex flex-row-reverse">
            <div className="d-flex gap-3 align-items-center">
              <Button
                variant="light"
                disabled={count === 0}
                onClick={() => updateCount(id, count - 1)}
                style={{ width: 48, height: 48 }}
              >
                <FaMinus />
              </Button>
              <Card.Title>{count}</Card.Title>
              <Button
                variant="light"
                onClick={() => updateCount(id, count + 1)}
                style={{ width: 48, height: 48 }}
              >
                <FaPlus />
              </Button>
            </div>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer>
        <div className="d-flex flex-row-reverse">
          <small>{count * price} грн</small>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default OrderItem;
