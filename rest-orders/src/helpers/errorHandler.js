import { toast } from "react-toastify";

export const handleError = (err) => {
  console.log("Error occurred", err);
  toast.error("Виникла помилка");
};
