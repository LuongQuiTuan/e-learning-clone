import { useCourseStore } from '@/lib/stores/courseStore';
import { CourseFormData, courseSchema } from '@/schema/courseSchema';
import { IconPhoto, IconUpload } from '@tabler/icons-react';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface CreateCourseFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function CreateCourseForm({ onSuccess, onCancel }: CreateCourseFormProps) {
  const { addCourse } = useCourseStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [imageError, setImageError] = useState('');
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: '',
      description: '',
      instructor: '',
      level: 'Beginner',
      image: '',
    },
  });

  const StyledIconPhoto = styled(IconPhoto)`
    width: 55px;
    height: 55px;
  `;

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        if (file.size > 5 * 1024 * 1024) {
          setImageError('Image size must be less than 5MB');
          return;
        }

        if (!file.type.startsWith('image/')) {
          setImageError('Please select a valid image file');
          return;
        }

        const base64String = await convertToBase64(file);
        setValue('image', base64String);
        setImagePreview(base64String);
        setImageError('');
      } catch (error) {
        setImageError('Failed to upload image');
      }
    }
  };

  const handleRemoveImage = () => {
    setValue('image', '');
    setImagePreview('');
    setImageError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const onSubmit = async (data: CourseFormData) => {
    try {
      console.log('FOrm submitted with data: ', data);
      addCourse(data);
      onSuccess?.();
    } catch (error) {
      setError('root', { message: 'Failed to created course. Please try again!' });
    }
  };
  return (
    <Box>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
          Create new course
        </Typography>

        {errors.root && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errors.root.message}
          </Alert>
        )}
      </CardContent>

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Course title"
                  fullWidth
                  sx={{ mb: 2 }}
                  error={!!errors.title}
                  helperText={errors.title?.message}
                  disabled={isSubmitting}
                />
              )}
            />
            <Controller
              name="instructor"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Instructor"
                  error={!!errors.instructor}
                  helperText={errors.instructor?.message}
                  disabled={isSubmitting}
                  sx={{ mb: 2 }}
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  multiline
                  variant="outlined"
                  maxRows={10}
                  minRows={4}
                  label="Description"
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  disabled={isSubmitting}
                  sx={{ mb: 2 }}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="level"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.level} sx={{ mb: 2 }}>
                  <InputLabel>Level</InputLabel>
                  <Select {...field} label="Level" disabled={isSubmitting}>
                    <MenuItem value="Beginner">Beginner</MenuItem>
                    <MenuItem value="Intermediate">Intermediate</MenuItem>
                    <MenuItem value="Hard">Hard</MenuItem>
                  </Select>
                  {errors.level && <FormHelperText>{errors.level.message}</FormHelperText>}
                </FormControl>
              )}
            />
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                  Course Image
                </Typography>
                {imagePreview ? (
                  <Avatar
                    src={imagePreview}
                    sx={{ width: '100%', height: 150 }}
                    variant="rounded"
                  />
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
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
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
                    <Button
                      onClick={handleRemoveImage}
                      variant="outlined"
                      color="error"
                      sx={{ ml: 2 }}
                    >
                      Delete
                    </Button>
                  )}

                  {(imageError || errors.image) && (
                    <FormHelperText error>{imageError || errors.image?.message}</FormHelperText>
                  )}
                </Box>
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: 'block', mb: 0.5 }}
                  >
                    📐 Recommended: 1280x720px (16:9 ratio)
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                    📁 Max 5MB • JPG, PNG, WebP supported
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3 }}>
              {onCancel && (
                <Button variant="outlined" onClick={onCancel} disabled={isSubmitting}>
                  Cancel
                </Button>
              )}
              <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                {isSubmitting ? 'Creating... ' : 'Create course'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
