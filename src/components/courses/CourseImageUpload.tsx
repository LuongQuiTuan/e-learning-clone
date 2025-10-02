import { Avatar, Box, Button, FormHelperText, Grid, styled, Typography } from '@mui/material';
import { IconPhoto, IconUpload } from '@tabler/icons-react';

interface CourseImageUploadProps {
  imagePreview: string;
  imageError: string;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
  isSubmitting: boolean;
}

export default function CourseImageUpload({
  imagePreview,
  imageError,
  fileInputRef,
  onImageUpload,
  onRemoveImage,
  isSubmitting,
}: CourseImageUploadProps) {
  const StyledIconPhoto = styled(IconPhoto)`
    width: 55px;
    height: 55px;
  `;
  return (
    <>
      {' '}
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Course Image
      </Typography>
      {imagePreview ? (
        <Avatar src={imagePreview} sx={{ width: '100%', height: 150 }} variant="rounded" />
      ) : (
        <Box
          sx={{
            width: '100%',
            height: 150,
            bgcolor: 'grey.100',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 2,
          }}
        >
          <StyledIconPhoto />
        </Box>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={onImageUpload}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <Button
          variant="outlined"
          startIcon={<IconUpload />}
          onClick={() => fileInputRef.current?.click()}
          disabled={isSubmitting}
        >
          Upload Image
        </Button>
        {imagePreview && (
          <Button onClick={onRemoveImage} variant="outlined" color="error" sx={{ ml: 2 }}>
            Delete
          </Button>
        )}

        {imageError && (
          <FormHelperText error sx={{ textAlign: 'center', mt: 1 }}>
            {imageError}
          </FormHelperText>
        )}
      </Box>
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
          📐 Recommended: 1280x720px (16:9 ratio)
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
          📁 Max 5MB • JPG, PNG, WebP supported
        </Typography>
      </Box>
    </>
  );
}
