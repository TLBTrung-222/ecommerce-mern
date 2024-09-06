import { GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { UserData } from "~/types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useMutation } from "@tanstack/react-query";
import * as AdminService from "~/services/AdminService";
import React from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Snackbar } from "@mui/material";

function DeleteDialog({ user }: { user: UserData }) {
    const [dialogOpen, setDialogOpen] = React.useState(false);

    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState<string | null>(
        null
    );

    const handleSnackbarOpen = () => {
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleDialogClickOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const deleteUserMutation = useMutation({
        mutationFn: AdminService.deleteUser,
        onError: (error) => {
            setSnackbarMessage((error as Error).message);
            handleSnackbarOpen();
        },
        onSuccess: () => {
            setSnackbarMessage("User deleted succesfully");
            handleSnackbarOpen();
        },
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(user.id);
        deleteUserMutation.mutate(user.id);
        handleDialogClose();
    };

    const snackbarAction = (
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleSnackbarClose}
        >
            <CloseIcon fontSize="small" />
        </IconButton>
    );

    return (
        <>
            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                PaperProps={{
                    component: "form",
                    onSubmit: handleSubmit,
                }}
            >
                <DialogTitle>Confirm delete user</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Do you really want to delete user: {user.name}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                    <Button type="submit">Delete</Button>
                </DialogActions>
            </Dialog>
            <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                onClick={handleDialogClickOpen}
            />

            {/* Handle status */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={1500}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
                action={snackbarAction}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            />
        </>
    );
}

export default DeleteDialog;
