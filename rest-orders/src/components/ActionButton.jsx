import { Button } from "react-bootstrap";

export const ActionButton = ({
  title,
  onClick,
  variant = "outline-primary",
  ...props
}) => (
  <Button
    variant={variant}
    onClick={onClick}
    style={{ minWidth: 120 }}
    {...props}
  >
    {title}
  </Button>
);
