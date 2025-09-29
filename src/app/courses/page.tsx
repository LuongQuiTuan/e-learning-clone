'use client';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { useCourseStore } from '@/lib/stores/courseStore';
import { School } from '@mui/icons-material';
import { IconEdit, IconTrashX } from '@tabler/icons-react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import DeleteConfirmationModal from '@/components/modals/DeleteConfirmationModal';
import { useRouter } from 'next/navigation';

const getLevelColor = (level: string) => {
  switch (level) {
    case 'Beginner':
      return 'success';
    case 'Intermediate':
      return 'warning';
    case 'Advanced':
      return 'error';
    default:
      return 'default';
  }
};

export default function CoursesPage() {
  const { courses, deleteCourse } = useCourseStore();
  const router = useRouter();

  const handleEdit = (courseId: number) => {
    router.push(`/courses/${courseId}/edit`);
  };

  const [deleteModal, setDeleteModal] = useState({
    open: false,
    courseId: 0,
    courseTitle: '',
  });

  const handleDelete = (courseId: number, courseTitle: string) => {
    setDeleteModal({
      open: true,
      courseId,
      courseTitle,
    });
  };

  const handleCloseDeleteModal = () => {
    setDeleteModal({
      open: false,
      courseId: 0,
      courseTitle: '',
    });
  };

  const handleConfirmDelete = () => {
    deleteCourse(deleteModal.courseId);
    toast.success(`🗑️ Course "${deleteModal.courseTitle}" deleted successfully!`);
    handleCloseDeleteModal();
  };
  return (
    <Box sx={{ flexGrow: 1, p: 1 }} suppressHydrationWarning={true}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
        All Courses
      </Typography>

      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={course.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid',
                borderColor: 'grey.300',
                borderRadius: 4,
                '&:hover': { borderColor: 'grey.600', boxShadow: 3 },
              }}
            >
              <Box sx={{ position: 'relative' }}>
                {course.image && course.image.trim() !== '' ? (
                  <CardMedia
                    component="img"
                    image={course.image}
                    alt={course.title}
                    sx={{
                      height: 200,
                      bgcolor: 'grey-300',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid',
                      borderColor: 'grey.300',
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      height: 200,
                      bgcolor: 'grey-300',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'grey.600',
                      border: '1px solid',
                      borderColor: 'grey.300',
                    }}
                  >
                    {' '}
                    <Box sx={{ textAlign: 'center' }}>
                      <School sx={{ fontSize: 60, mb: 1 }} />
                      <Typography variant="caption" sx={{ ml: 2 }}>
                        No Image
                      </Typography>
                    </Box>
                  </Box>
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                      {course.title}
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <IconButton color="primary">
                        <IconEdit onClick={() => handleEdit(course.id)} />
                      </IconButton>
                      <IconButton color="error">
                        <IconTrashX onClick={() => handleDelete(course.id, course.title)} />
                      </IconButton>
                    </Box>
                  </Box>

                  <Typography variant="body2" color="text.secondary" sx={{ height: 50 }}>
                    {course.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" component="div">
                      {course.instructor}
                    </Typography>
                    <Chip
                      label={course.level}
                      color={getLevelColor(course.level) as any}
                      size="small"
                    ></Chip>
                  </Box>
                </CardContent>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <DeleteConfirmationModal
        open={deleteModal.open}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Delete course"
        itemName={deleteModal.courseTitle}
      />
    </Box>
  );
}
