import { Container } from "react-bootstrap";
import { useEffect, useMemo, useState } from "react";
import { ActionButton } from "components/ActionButton";
import PageHeader from "components/PageHeader";
import Loader from "components/Loader";
import { getProducts } from "helpers/api";
import { handleError } from "helpers/errorHandler";
import { useNear } from "helpers/nearHelper";
import OrderItem from "./OrderItem";
import ApproveOrderModalForm from "./ApproveOrderModalForm";

const OrderPage = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { signedAccountId } = useNear();
  const [showApprove, setShowApprove] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const products = await getProducts();
        setItems(
          products.map(({ id, name, price }) => ({ id, name, price, count: 0 }))
        );
      } catch (err) {
        handleError(err);
      }
      setIsLoading(false);
    })();
  }, []);

  const handleNew = () => {
    setItems([
      ...items.map((it) => {
        return { ...it, count: 0 };
      }),
    ]);
  };

  const amount = useMemo(
    () => items.reduce((acc, { count, price }) => acc + count * price, 0),
    [items]
  );

  const updateCount = (id, count) => {
    if (count >= 0) {
      const nextItems = items.map((it) =>
        it.id === id ? { ...it, count } : it
      );
      setItems(nextItems);
    }
  };

  return (
    <Container>
      {isLoading && <Loader />}
      <PageHeader title="Замовлення" />
      <div className="d-flex justify-content-between align-items-center">
        <ActionButton
          title="Нове"
          onClick={handleNew}
          variant="outline-secondary"
        />
        <div>{amount} грн</div>
        <ActionButton
          title="Підтвердити"
          onClick={() => setShowApprove(true)}
          disabled={amount === 0 || !signedAccountId}
        />
      </div>
      <hr />
      <div>
        {items.map((item) => (
          <OrderItem key={item.id} item={item} updateCount={updateCount} />
        ))}
      </div>
      {showApprove && (
        <ApproveOrderModalForm
          items={items}
          amount={amount}
          handleClose={() => setShowApprove(false)}
          onSuccess={handleNew}
        />
      )}
    </Container>
  );
};

export default OrderPage;
