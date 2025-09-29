'use client';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import { IconCircleX, IconTrashX, IconX } from '@tabler/icons-react';

interface DeleteConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  itemName?: string;
  description?: string;
  isLoading?: boolean;
}

export default function DeleteConfirmationModal({
  open,
  onClose,
  onConfirm,
  title,
  itemName,
  description,
  isLoading = false,
}: DeleteConfirmationModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="delete-dialog-title"
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: 24,
          position: 'relative',
        },
      }}
    >
      <IconButton
        onClick={onClose}
        disabled={isLoading}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: 'grey.500', // ✅ Grey color
          backgroundColor: 'grey.100',
          zIndex: 1,
          '&:hover': {
            backgroundColor: 'grey.200',
            color: 'grey.700',
          },
          '&:disabled': {
            color: 'grey.300',
          },
        }}
        size="small"
      >
        <IconX size={20} />
      </IconButton>
      <DialogContent sx={{ pt: 3 }}>
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Box
            sx={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              color: 'error.light',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 2,
              mt: 2,
            }}
          >
            {' '}
            <IconCircleX size={100} stroke={1} />
          </Box>
          <Typography variant="h5" sx={{ mb: 1, fontWeight: 'bold' }}>
            Are you sure?
          </Typography>
          {itemName && (
            <Typography variant="body1" color="text.secondary" sx={{ mb: 1, p: 1 }}>
              You are about to delete <strong>"{itemName}" </strong>course. This action cannot be
              undone and will permanently remove all the data of the course.
            </Typography>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 2, gap: 1 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          color="inherit"
          size="large"
          sx={{ minWidth: 100 }}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="outlined"
          color="error"
          size="large"
          sx={{ minWidth: 100 }}
          disabled={isLoading}
          autoFocus
        >
          {isLoading ? 'Deleting...' : 'Yes, Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
