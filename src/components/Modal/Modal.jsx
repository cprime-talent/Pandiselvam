import "./Modal.css";
import Dialog from "@mui/material/Dialog";
import { useSelector } from "react-redux";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const Modal = ({ children, onClose, title }) => {
  const showTaskModal = useSelector((state) => state.modalReducer).taskEdit;

  return (
    <>
      <Dialog onClose={onClose} open={showTaskModal}>
        <DialogTitle>{title}</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>{children}</DialogContent>
      </Dialog>
    </>
  );
};
export default Modal;
