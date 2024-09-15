/* eslint-disable */
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import { UserData } from "~/types";
import { useMutation } from "@tanstack/react-query";
import * as UserService from "~/services/UserService";
import { Box, Snackbar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function UpdateDialog({ user }: { user: UserData }) {
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

    const updateUserMutation = useMutation({
        mutationFn: UserService.updateUserProfile,
        onError: (error) => {
            console.log("Error updateUserMutation: ", error);
            setSnackbarMessage((error as Error).message);
            handleSnackbarOpen();
        },
        onSuccess: (response) => {
            console.log("Profile updated successfully:", response);
            setSnackbarMessage("Profile updated successfully");
            handleSnackbarOpen();
        },
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const updateData = {
            name: formData.get("name") as string,
            phone: formData.get("phone") as string,
            address: formData.get("address") as string,
        };

        // call api
        updateUserMutation.mutate({ userId: user.id, data: updateData });
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
        <Box sx={{ width: "100%" }}>
            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                PaperProps={{
                    component: "form",
                    onSubmit: handleSubmit,
                }}
            >
                <DialogTitle>Update user</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Fill in required information to update user
                    </DialogContentText>
                    <TextField
                        margin="dense"
                        name="name"
                        label="New Username"
                        type="text"
                        fullWidth
                        variant="standard"
                        defaultValue={user.name}
                    />
                    <TextField
                        margin="dense"
                        name="address"
                        label="New Address"
                        type="text"
                        fullWidth
                        variant="standard"
                        defaultValue={user.address}
                    />
                    <TextField
                        margin="dense"
                        name="phone"
                        label="New Phone Number"
                        type="tel"
                        fullWidth
                        variant="standard"
                        defaultValue={user.phone}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                    <Button type="submit">Update</Button>
                </DialogActions>
            </Dialog>

            <GridActionsCellItem
                icon={<EditIcon />}
                label="Edit"
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
        </Box>
    );
}
