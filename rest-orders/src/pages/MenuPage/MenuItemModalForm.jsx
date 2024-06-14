import { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { Formik } from "formik";
import * as yup from "yup";
import { ActionButton } from "components/ActionButton";
import Loader from "components/Loader";
import { handleError } from "helpers/errorHandler";
import { createProduct, updateProduct } from "helpers/api";
import { multiplyMoney } from "helpers/accounting";

const validationSchema = yup.object({
  name: yup.string().required("Поле обов'язкове"),
  price: yup
    .number()
    .required("Поле обов'язкове")
    .positive("Значення повинно бути більшим за 0"),
});

const initialValues = {
  name: "",
  price: 0,
};

const MenuItemModalForm = ({ item, onSuccess, handleClose }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {isLoading && <Loader />}
      <Formik
        initialValues={item ?? initialValues}
        validationSchema={validationSchema}
        onSubmit={async ({ name, price }) => {
          try {
            setIsLoading(true);
            if (item) {
              await updateProduct(item.id, name, multiplyMoney(price, 1));
              toast.success("Дані оновлені");
            } else {
              await createProduct(name, multiplyMoney(price, 1));
              toast.success("Дані збережені");
            }
            handleClose();
            onSuccess();
          } catch (err) {
            handleError(err);
          }
          setIsLoading(false);
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Modal show={true} onHide={handleClose}>
            <Form noValidate onSubmit={handleSubmit}>
              <Modal.Header closeButton>
                <h4>{item ? "Редагувати" : "Нова страва"}</h4>
              </Modal.Header>
              <Modal.Body>
                <Form.Group className="mt-4">
                  <Form.Label>Назва</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={values.name}
                    autoComplete="off"
                    onChange={handleChange}
                    isInvalid={touched.name && errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mt-4">
                  <Form.Label>Ціна</Form.Label>
                  <Form.Control
                    type="text"
                    name="price"
                    value={values.price}
                    autoComplete="off"
                    onChange={handleChange}
                    isInvalid={touched.price && errors.price}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.price}
                  </Form.Control.Feedback>
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <ActionButton title="Зберегти" type="submit" />
                <ActionButton
                  title="Скасувати"
                  variant="outline-secondary"
                  onClick={handleClose}
                />
              </Modal.Footer>
            </Form>
          </Modal>
        )}
      </Formik>
    </>
  );
};

export default MenuItemModalForm;
