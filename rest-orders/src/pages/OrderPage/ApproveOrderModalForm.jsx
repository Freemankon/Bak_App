import { useState } from "react";
import { Form, Modal, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { ActionButton } from "components/ActionButton";
import Loader from "components/Loader";
import Section from "components/Section";
import NameValue from "components/NameValue";
import { handleError } from "helpers/errorHandler";
import { getDateString } from "helpers/dateUtil";
import { addOrder, useNear } from "helpers/nearHelper";

const ApproveOrderModalForm = ({ amount, items, onSuccess, handleClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { wallet } = useNear();

  const currentDate = new Date();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await addOrder(wallet, currentDate.getTime(), amount);
      handleClose();
      toast.success("Замовлення збережене");
      onSuccess();
    } catch (err) {
      handleError(err);
    }
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Loader />}
      <Modal show={true} onHide={handleClose}>
        <Form noValidate onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <h4>Замовлення</h4>
          </Modal.Header>
          <Modal.Body>
            <Section title="Обрані позиції">
              {items
                .filter((item) => item.count)
                .map((item) => (
                  <NameValue
                    key={item.id}
                    name={item.name}
                    value={`${item.count} шт`}
                  />
                ))}
            </Section>
            <hr />
            <div className="mb-3 d-flex justify-content-between">
              <Form.Label>
                <h5>Сума до оплати</h5>
              </Form.Label>
              <div>
                <strong>{amount}</strong> грн
              </div>
            </div>
            <hr />
            <NameValue
              name="Дата замовлення"
              value={getDateString(currentDate)}
            />
            <Form.Group as={Row} className="mt-3">
              <Form.Label column sm="4">
                Тип оплати:
              </Form.Label>
              <Col>
                <Form.Select sm="8" defaultValue="card">
                  <option value="card">Картка</option>
                  <option value="cash">Готівка</option>
                </Form.Select>
              </Col>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <ActionButton
              title="Підтвердити"
              type="submit"
              disabled={amount === 0}
            />
            <ActionButton
              title="Скасувати"
              variant="outline-secondary"
              onClick={handleClose}
            />
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ApproveOrderModalForm;
