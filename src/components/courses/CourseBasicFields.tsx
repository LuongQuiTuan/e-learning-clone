import {
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { Control, Controller, FieldErrors } from 'react-hook-form';

interface CourseFormData {
  title: string;
  description: string;
  instructor: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  image?: string;
}

interface CourseBasicFieldsProp {
  control: Control<CourseFormData>;
  errors: FieldErrors<CourseFormData>;
  isSubmitting: boolean;
}

export default function CourseBasicFields({
  control,
  errors,
  isSubmitting,
}: CourseBasicFieldsProp) {
  return (
    <>
      {' '}
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
            required
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
            required
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
            required
          />
        )}
      />
      <Controller
        name="level"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth error={!!errors.level} sx={{ mb: 2 }}>
            <InputLabel>Level</InputLabel>
            <Select {...field} label="Level" disabled={isSubmitting}>
              <MenuItem value="Beginner">Beginner</MenuItem>
              <MenuItem value="Intermediate">Intermediate</MenuItem>
              <MenuItem value="Advanced">Advanced</MenuItem>
            </Select>
            {errors.level && <FormHelperText>{errors.level.message}</FormHelperText>}
          </FormControl>
        )}
      />
    </>
  );
}
