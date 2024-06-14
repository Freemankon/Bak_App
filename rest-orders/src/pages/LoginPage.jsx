import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate, Navigate } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import { useAuth } from "hooks/useAuth";
import PageHeader from "components/PageHeader";
import Loader from "components/Loader";
import { handleError } from "helpers/errorHandler";
import { login } from "helpers/api";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = yup.object({
  email: yup.string().email("Невірний email").required("Поле обов'язкове"),
  password: yup.string().required("Поле обов'язкове"),
});

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {isLoading && <Loader />}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async ({ email, password }) => {
          try {
            setIsLoading(true);
            await login(email, password);
            setIsLoading(false);
            navigate("/");
          } catch (err) {
            handleError(err);
            setIsLoading(true);
          }
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group className="mt-4">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                isInvalid={touched.email && errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mt-4">
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                isInvalid={touched.password && errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <div className="d-flex justify-content-center">
              <Button variant="primary" type="submit" className="mt-4">
                Увійти
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

const LoginPage = () => {
  const { isLoggedIn } = useAuth();
  if (isLoggedIn) {
    return <Navigate to="/order" />;
  }
  return (
    <Container>
      <PageHeader title="Авторизація" />
      <LoginForm />
    </Container>
  );
};

export default LoginPage;
