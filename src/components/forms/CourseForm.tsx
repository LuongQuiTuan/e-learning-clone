import { useCourseStore } from '@/lib/stores/courseStore';
import { CourseFormData, courseSchema } from '@/schema/courseSchema';
import { useCourseImageUpload } from '@/hooks/useCourseImageUpload';

import { Alert, Box, Button, CardContent, Grid, Snackbar, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import CourseBasicFields from '../courses/CourseBasicFields';
import CourseImageUpload from '../courses/CourseImageUpload';
import { useFormDraftStore } from '@/lib/stores/formDraftStore';
import { useEffect, useRef, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { useIsMobile } from '@/hooks/useMobile';

interface CourseFormProps {
  mode?: 'create' | 'edit';
  course?: {
    id: number;
    title: string;
    description: string;
    instructor: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    image?: string;
  };
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function CourseForm({
  mode = 'create',
  course,
  onSuccess,
  onCancel,
}: CourseFormProps) {
  const { addCourse, updateCourse } = useCourseStore();
  const { courseDraft, saveDraft, clearDraft, hasDraft } = useFormDraftStore();

  const [autoSaveStatus, setAutoSaveStatus] = useState<'saving' | 'saved' | ''>('');
  const hasRestoredDraft = useRef(false);
  const isMobile = useIsMobile();

  const {
    fileInputRef,
    imagePreview,
    imageError,
    setImagePreview,
    handleImageUpload,
    handleRemoveImage,
  } = useCourseImageUpload();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isDirty },
    setError,
    watch,
    reset,
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: course || {
      title: '',
      description: '',
      instructor: '',
      level: 'Beginner',
      image: '',
    },
  });

  const formData = watch();
  const debouncedFormData = useDebounce(formData, 1000);

  if (mode === 'edit' && course?.image && !imagePreview) {
    setImagePreview(course.image);
  }

  //Auto-restore draft on mount
  useEffect(() => {
    if (hasRestoredDraft.current) return;
    if (mode === 'create' && hasDraft() && courseDraft) {
      const draftData = courseDraft.data;
      reset(draftData as CourseFormData);
      if (draftData.image) {
        setImagePreview(draftData.image);
      }
      hasRestoredDraft.current = true;

      toast.info('Draft restored!', { autoClose: 2000 });
    } else if (course && mode === 'edit') {
      reset({
        title: course.title,
        description: course.description,
        instructor: course.instructor,
        level: course.level,
        image: course.image || '',
      });
      if (course.image) {
        setImagePreview(course.image);
      }
    }
  }, [mode, course, reset, hasDraft, setImagePreview]);
  //Auto-save draft when form changes
  useEffect(() => {
    if (mode === 'create' && isDirty && debouncedFormData) {
      setAutoSaveStatus('saving');
      saveDraft(debouncedFormData);

      setTimeout(() => {
        setAutoSaveStatus('saved');
        setTimeout(() => setAutoSaveStatus(''), 2000);
      }, 300);
    }
  }, [debouncedFormData, mode, isDirty, saveDraft]);

  //Warn user before closing tab with unsaved changes
  useEffect(() => {
    if (mode === 'create' && isDirty) {
      const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        e.preventDefault();
        e.returnValue = '';
        return '';
      };
      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, [mode, isDirty]);

  const handleCancelClick = () => {
    if (mode === 'create' && isDirty) {
      const confirmLeave = window.confirm(
        'You have unsaved changes. Your progress is saved as a draft. Are you sure you want to leave?',
      );
      if (confirmLeave) {
        onCancel?.();
      }
    } else {
      onCancel?.();
    }
  };
  const onSubmit = async (data: CourseFormData) => {
    try {
      if (mode === 'create') {
        addCourse(data);
        clearDraft(); // Clear draft after successful submission
        toast.success(`🎉 Course "${data.title}" created successfully!`);
      } else if (mode === 'edit' && course) {
        updateCourse(course.id, {
          ...data,
          updatedAt: new Date().toISOString(),
        });
        toast.success(`🎉 Course "${data.title}" updated successfully!`);
      }
      onSuccess?.();
    } catch (error) {
      const errorMessage =
        mode === 'create'
          ? 'Failed to create course. Please try again!'
          : 'Failed to update course. Please try again!';
      toast.error(`❌ ${errorMessage}`);
      setError('root', { message: errorMessage });
    }
  };
  return (
    <Box
      sx={{
        pb: isMobile ? 10 : 0,
      }}
    >
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
          {mode === 'create' ? 'Create new course' : 'Edit course'}
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
            <CourseBasicFields control={control} errors={errors} isSubmitting={isSubmitting} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            {' '}
            <CourseImageUpload
              imagePreview={imagePreview}
              imageError={imageError}
              fileInputRef={fileInputRef}
              onImageUpload={(e) => handleImageUpload(e, setValue)}
              onRemoveImage={() => handleRemoveImage(setValue)}
              isSubmitting={isSubmitting}
            />
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3 }}>
          {onCancel && (
            <Button variant="outlined" onClick={handleCancelClick} disabled={isSubmitting}>
              Cancel
            </Button>
          )}
          <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
            {mode === 'edit' ? 'Update course' : 'Create new course'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
