import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

interface DeleteConfirmationDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    dialogTitleMessage: string;
    contentTextMessage: string;
    cancelTextMessage: string;
    confirmTextMessage: string
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps>
    = ({ open, onClose, onConfirm, dialogTitleMessage, contentTextMessage, cancelTextMessage, confirmTextMessage }) => {
        return (
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>{dialogTitleMessage}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {contentTextMessage}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        {cancelTextMessage}
                    </Button>
                    <Button onClick={onConfirm} color="primary">
                        {confirmTextMessage}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

export default DeleteConfirmationDialog;
