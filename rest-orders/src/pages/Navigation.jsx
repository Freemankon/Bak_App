import { useState, useCallback, useContext } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "hooks/useAuth";
import { clearTokens } from "helpers/tokenService";
import { NearContext } from "helpers/context";

const Navigation = () => {
  const { isLoggedIn } = useAuth();
  const { signedAccountId, wallet } = useContext(NearContext);
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => setExpanded(false);

  const logoutClick = useCallback(() => {
    handleClick();
    clearTokens();
    navigate("/");
  }, [navigate]);

  const nearLogoutClick = useCallback(() => {
    handleClick();
    wallet.signOut();
  }, [wallet]);

  return (
    <Navbar collapseOnSelect bg="light" expand="lg" expanded={expanded}>
      <Container fluid>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav.Link as={Link} to="/" onClick={handleClick}>
            <Navbar.Brand>
              <img
                alt=""
                src="/logo192.png"
                width="32"
                height="32"
                className="d-inline-block align-top"
              />
            </Navbar.Brand>
          </Nav.Link>
          <Nav>
            <Nav.Link as={Link} to="/" onClick={handleClick}>
              Головна
            </Nav.Link>
            {isLoggedIn && (
              <>
                <Nav.Link as={Link} to="/order" onClick={handleClick}>
                  Замовлення
                </Nav.Link>
                <Nav.Link as={Link} to="/menu" onClick={handleClick}>
                  Меню
                </Nav.Link>
                <Nav.Link as={Link} to="/accounting" onClick={handleClick}>
                  Облік
                </Nav.Link>
              </>
            )}
            {signedAccountId && (
              <Nav.Link as={Link} to="/accounting" onClick={nearLogoutClick}>
                Вийти з Near
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
        {isLoggedIn && (
          <Nav.Link
            as={Link}
            onClick={logoutClick}
            className="justify-content-end"
          >
            Вийти
          </Nav.Link>
        )}
      </Container>
    </Navbar>
  );
};

export default Navigation;
