// components/DynamicModal.jsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const DynamicModal = ({ open, handleClose, title, children, actions }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: { borderRadius: 3, p: 2 },
        className: "card-bg-color"
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: "bold",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        className="card-bg-color"
      >
        <Typography variant="h6" className="card-text-Color">{title}</Typography>
        <IconButton onClick={handleClose} sx={{ color: "inherit" }} className="card-text-Color">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers className="card-bg-color card-text-Color">
        {children}
      </DialogContent>

      {actions && (
        <DialogActions sx={{ justifyContent: "flex-end" }} className="card-bg-color">
          {actions}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default DynamicModal;
