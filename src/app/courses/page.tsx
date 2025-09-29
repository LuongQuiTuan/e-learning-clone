'use client';
import {
  alpha,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  IconButton,
  Typography,
  useTheme,
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
  const { getSortedCourses, deleteCourse } = useCourseStore();
  const router = useRouter();
  const theme = useTheme();

  const courses = getSortedCourses();

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
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
          All Courses
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Showing {courses.length} courses (newest first)
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={course.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid',
                borderColor: alpha(theme.palette.divider, 0.15),
                borderRadius: 4,
                backgroundColor: alpha(theme.palette.background.paper, 0.8),
                backdropFilter: 'blur(8px)',
                position: 'relative', // ✅ For positioning hover buttons

                transition: theme.transitions.create(
                  ['border-color', 'transform', 'box-shadow', 'background-color'],
                  {
                    duration: theme.transitions.duration.short,
                    easing: theme.transitions.easing.easeInOut,
                  },
                ),

                '&:hover': {
                  borderColor: alpha(theme.palette.primary.main, 0.4),
                  transform: 'translateY(-2px)',
                  boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.15)}`,
                  backgroundColor: alpha(theme.palette.background.paper, 0.95),

                  // ✅ Show buttons on card hover
                  '& .course-actions': {
                    opacity: 1,
                    transform: 'translateY(0)',
                  },
                },
              }}
            >
              {/* ✅ Action buttons - positioned absolutely for overlay effect */}
              <Box
                className="course-actions"
                sx={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  display: 'flex',
                  gap: 0.5,
                  zIndex: 2,
                  opacity: 0, // ✅ Hidden by default
                  transform: 'translateY(-8px)', // ✅ Slight animation
                  transition: theme.transitions.create(['opacity', 'transform'], {
                    duration: theme.transitions.duration.short,
                    easing: theme.transitions.easing.easeInOut,
                  }),
                }}
              >
                <IconButton
                  onClick={() => handleEdit(course.id)}
                  size="small"
                  sx={{
                    backgroundColor: alpha(theme.palette.background.paper, 0.95),
                    backdropFilter: 'blur(8px)',
                    color: theme.palette.primary.main,
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,

                    '&:hover': {
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.primary.contrastText,
                      transform: 'scale(1.1)',
                      boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
                    },

                    transition: theme.transitions.create(
                      ['background-color', 'color', 'transform', 'box-shadow'],
                      {
                        duration: theme.transitions.duration.shorter,
                      },
                    ),
                  }}
                >
                  <IconEdit size={16} stroke={1.5} />
                </IconButton>

                <IconButton
                  onClick={() => handleDelete(course.id, course.title)}
                  size="small"
                  sx={{
                    backgroundColor: alpha(theme.palette.background.paper, 0.95),
                    backdropFilter: 'blur(8px)',
                    color: theme.palette.error.main,
                    border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`,

                    '&:hover': {
                      backgroundColor: theme.palette.error.main,
                      color: theme.palette.error.contrastText,
                      transform: 'scale(1.1)',
                      boxShadow: `0 4px 12px ${alpha(theme.palette.error.main, 0.3)}`,
                    },

                    transition: theme.transitions.create(
                      ['background-color', 'color', 'transform', 'box-shadow'],
                      {
                        duration: theme.transitions.duration.shorter,
                      },
                    ),
                  }}
                >
                  <IconTrashX size={16} stroke={1.5} />
                </IconButton>
              </Box>

              {/* ✅ Course image/placeholder */}
              <Box sx={{ position: 'relative' }}>
                {course.image && course.image.trim() !== '' ? (
                  <CardMedia
                    component="img"
                    image={course.image}
                    alt={course.title}
                    sx={{
                      height: 200,
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      height: 200,
                      bgcolor: alpha(theme.palette.background.default, 0.1),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'grey.500',
                    }}
                  >
                    <Box sx={{ textAlign: 'center' }}>
                      <School sx={{ fontSize: 48, mb: 1, opacity: 0.5 }} />
                      <Typography variant="caption" color="text.secondary">
                        No Image
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Box>

              <CardContent sx={{ flexGrow: 1, p: 2 }}>
                {/* ✅ Course title */}
                <Typography
                  variant="h6"
                  sx={{
                    mb: 1,
                    fontWeight: 'bold',
                    lineHeight: 1.3,
                  }}
                >
                  {course.title}
                </Typography>

                {/* ✅ Course creation date */}
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    fontSize: '0.75rem',
                    opacity: 0.8,
                    mb: 1,
                    display: 'block',
                  }}
                >
                  Created: {new Date(course.createdAt).toLocaleDateString()}
                </Typography>

                {/* ✅ Course description */}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 2,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    lineHeight: 1.5,
                    minHeight: '3em', // Ensures consistent height
                  }}
                >
                  {course.description}
                </Typography>

                {/* ✅ Instructor and level */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mt: 'auto', // Push to bottom of card
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    color="primary.main"
                    sx={{
                      fontWeight: 500,
                      fontSize: '0.875rem',
                    }}
                  >
                    👨‍🏫 {course.instructor}
                  </Typography>
                  <Chip
                    label={course.level}
                    color={getLevelColor(course.level) as any}
                    size="small"
                    sx={{
                      fontSize: '0.75rem',
                      fontWeight: 500,
                    }}
                  />
                </Box>
              </CardContent>
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
