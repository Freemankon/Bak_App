import { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { registerLocale } from "react-datepicker";
import { uk } from "date-fns/locale/uk";
import DatePicker from "react-datepicker";
import { ActionButton } from "components/ActionButton";
import PageHeader from "components/PageHeader";
import Loader from "components/Loader";
import AccountingModalForm from "./AccountingModalForm";
import { getOrders, useNear } from "helpers/nearHelper";
import { calcStat } from "helpers/accounting";
import { handleError } from "helpers/errorHandler";

registerLocale("uk", uk);

const AccountingPage = () => {
  const [date, setDate] = useState(new Date());
  const [stat, setStat] = useState(null);
  const { signedAccountId, wallet } = useNear();
  const [isLoading, setIsLoading] = useState(false);
  const [showAccounting, setShowAccounting] = useState(false);

  const handleCalcStat = async () => {
    try {
      setIsLoading(true);
      setStat(
        await calcStat(
          date,
          async (from, to) => await getOrders(wallet, from, to)
        )
      );
      setIsLoading(false);
      setShowAccounting(true);
    } catch (err) {
      setIsLoading(false);
      handleError(err);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <Container>
        <PageHeader title="Облік" />
        <div>
          <p>
            На данній сторінці Ви маєте можливісь здійснити обрахунок фінансових
            показників на конкретну дату
          </p>
        </div>
        <hr />
        <div className="mt-4 ">
          <div className="mt-4 text-center">
            <Form.Group className="d-flex justify-content-center">
              <Form.Label className="me-2">Оберіть дату</Form.Label>
              <div>
                <DatePicker
                  selected={date}
                  onChange={(date) => setDate(date)}
                  dateFormat="dd.MM.yyyy"
                  locale="uk"
                />
              </div>
            </Form.Group>
            <div className="mt-2">
              <ActionButton
                title="Обчислити.."
                onClick={handleCalcStat}
                disabled={!signedAccountId}
              />
            </div>
          </div>
        </div>
        {showAccounting && (
          <AccountingModalForm
            date={date}
            handleClose={() => setShowAccounting(false)}
            stat={stat}
          />
        )}
      </Container>
    </>
  );
};

export default AccountingPage;
