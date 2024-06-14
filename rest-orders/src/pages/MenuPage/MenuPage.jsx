import { Button, Container, Table } from "react-bootstrap";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ActionButton } from "components/ActionButton";
import PageHeader from "components/PageHeader";
import Loader from "components/Loader";
import { deleteProduct, getProducts } from "helpers/api";
import { handleError } from "helpers/errorHandler";
import MenuItemModalForm from "./MenuItemModalForm";

const MenuTableRow = ({ item, handleUpdate, handleDelete }) => {
  const { id, name, price } = item;

  return (
    <tr>
      <td>{name}</td>
      <td className="text-center">{price}</td>
      <td className="d-flex gap-3">
        <Button
          onClick={() => handleUpdate(id)}
          variant="outline-secondary"
          className="border-0"
        >
          <FaEdit />
        </Button>
        <Button
          onClick={() => handleDelete(id)}
          variant="outline-secondary"
          className="border-0"
        >
          <FaTrash />
        </Button>
      </td>
    </tr>
  );
};

const MenuTable = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(false);

  const refecth = useCallback(async () => {
    try {
      setIsLoading(true);
      setItems(await getProducts());
    } catch (err) {
      handleError(err);
    }
    setIsLoading(false);
  }, []);

  const findItemById = useCallback(
    (id) => (id ? items.find((i) => i.id === id) : null),
    [items]
  );

  const handleUpdate = useCallback(
    async (id) => {
      setCurrentItem(findItemById(id));
      setModal(true);
    },
    [findItemById, setCurrentItem, setModal]
  );

  const handleDelete = useCallback(
    async (id) => {
      if (!window.confirm(`Видалити страву ${findItemById(id)?.name}?`)) {
        return;
      }
      try {
        setIsLoading(true);
        await deleteProduct(id);
        toast.success("Дані видалені");
        await refecth();
      } catch (err) {
        handleError(err);
      }
      setIsLoading(false);
    },
    [refecth, findItemById]
  );

  useEffect(() => {
    refecth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <div className="mt-4 mb-4">
        <ActionButton title="Додати..." onClick={() => handleUpdate(null)} />
      </div>
      <div>
        {items.length > 0 && (
          <Table striped bordered={false} hover className="table-fixed">
            <thead>
              <tr>
                <th>Назва</th>
                <th style={{ width: "120px" }} className="text-center">
                  Ціна
                </th>
                <th style={{ width: "120px" }} className="text-center"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <MenuTableRow
                  key={item.id}
                  item={item}
                  handleUpdate={handleUpdate}
                  handleDelete={handleDelete}
                />
              ))}
            </tbody>
          </Table>
        )}
      </div>
      {modal && (
        <MenuItemModalForm
          item={currentItem}
          onSuccess={refecth}
          handleClose={() => setModal(false)}
        />
      )}
    </>
  );
};

const MenuPage = () => {
  return (
    <Container>
      <PageHeader title="Робота з меню" />
      <MenuTable />
    </Container>
  );
};

export default MenuPage;
