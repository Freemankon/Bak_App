import PageHeader from "components/PageHeader";
import { useAuth } from "hooks/useAuth";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Container>
      <PageHeader title="Система обліку замовлень клієнтів ресторану" />
      <p>Система побудована із використанням смарт-контрактів Near protocol.</p>
      {!isLoggedIn && (
        <p>
          Для роботи з системою необхідна <Link to="/login">авторізація</Link>.
        </p>
      )}
    </Container>
  );
};

export default HomePage;
