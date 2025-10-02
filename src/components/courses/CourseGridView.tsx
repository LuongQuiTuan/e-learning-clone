import { Course, CoursesListViewProps, getLevelColor } from '@/lib/types/course';
import { School } from '@mui/icons-material';
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
import { IconEdit, IconTrashX } from '@tabler/icons-react';

interface CourseListGridViewProps extends CoursesListViewProps {
  courses: Course[];
}

export default function CourseListGridView({
  courses,
  onCourseDelete,
  onCourseEdit,
}: CourseListGridViewProps) {
  const theme = useTheme();
  return (
    <Grid container spacing={3} sx={{ p: 1 }}>
      {courses.map((course) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={course.id}>
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              transition: 'transform 0.2s, box-shadow 0.2s',
              borderRadius: 3,
              '&:hover': {
                transform: 'translateY(-4px)',
                border: 2,
                borderColor: alpha(theme.palette.primary.main, 0.68),
                boxShadow: 3,
                '& .action-buttons': {
                  opacity: 1,
                },
              },
            }}
          >
            {/* Action Buttons */}
            <Box
              className="action-buttons"
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                zIndex: 2,
                display: 'flex',
                gap: 1,
                opacity: 0,
                transition: 'opacity 0.2s',
              }}
            >
              <IconButton
                onClick={() => onCourseEdit && onCourseEdit(course.id)}
                size="small"
                sx={{
                  backgroundColor: alpha(theme.palette.background.paper, 0.95),
                  backdropFilter: 'blur(8px)',
                  color: theme.palette.primary.main,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                  width: '40px',
                  height: '40px',
                  '&:hover': {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <IconEdit size={20} />
              </IconButton>
              <IconButton
                onClick={() => onCourseDelete && onCourseDelete(course.id, course.title)}
                size="small"
                sx={{
                  backgroundColor: alpha(theme.palette.background.paper, 0.95),
                  backdropFilter: 'blur(8px)',
                  color: theme.palette.error.main,
                  border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
                  width: '40px',
                  height: '40px',
                  '&:hover': {
                    backgroundColor: theme.palette.error.main,
                    color: theme.palette.error.contrastText,
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <IconTrashX size={20} />
              </IconButton>
            </Box>

            {/* Course Image */}
            {course.image && course.image.trim() !== '' ? (
              <CardMedia
                component="img"
                height="200"
                image={course.image}
                alt={course.title}
                sx={{ objectFit: 'cover' }}
              />
            ) : (
              <Box
                sx={{
                  height: 200,
                  backgroundColor: 'grey.100',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  gap: 1,
                }}
              >
                <School sx={{ fontSize: 48, color: 'grey.400' }} />
                <Typography variant="body2" color="text.secondary">
                  No Image
                </Typography>
              </Box>
            )}

            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" component="h3" fontWeight="bold" gutterBottom>
                {course.title}
              </Typography>

              <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
                Created: {new Date(course.createdAt).toLocaleDateString()}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mb: 2,
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {course.description}
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mt: 'auto',
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  {course.instructor}
                </Typography>
                <Chip
                  label={course.level}
                  size="small"
                  color={getLevelColor(course.level) as any}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
