import { Form, Modal } from "react-bootstrap";
import { ActionButton } from "components/ActionButton";
import NameValue from "components/NameValue";
import Section from "components/Section";
import { getDateString } from "helpers/dateUtil";

const AccountingModalForm = ({ date, stat, handleClose }) => (
  <>
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <h4>Облік</h4>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-between">
          <Form.Label>Дата</Form.Label>
          <Form.Label>
            <strong>{getDateString(date)}</strong>
          </Form.Label>
        </div>
        <hr />
        <Section title="Інформація за день">
          <NameValue name="Виторг" value={stat?.day?.amount ?? ""} />
          <NameValue
            name="Кількість замовлень"
            value={stat?.day?.count ?? ""}
          />
        </Section>
        <Section title="Інформація за місяць">
          <NameValue name="Виторг" value={stat?.month?.amount ?? ""} />
          <NameValue
            name="Середній виторг за день"
            value={stat?.month?.amountByDay ?? ""}
          />
          <NameValue
            name="Різниця з минулим місяцем"
            value={stat?.month?.delta ?? ""}
          />
        </Section>
      </Modal.Body>
      <Modal.Footer>
        <ActionButton
          title="Закрити"
          variant="outline-secondary"
          onClick={handleClose}
        />
      </Modal.Footer>
    </Modal>
  </>
);

export default AccountingModalForm;
