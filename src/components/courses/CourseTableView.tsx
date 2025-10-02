import { Course, CoursesListViewProps, getLevelColor } from '@/lib/types/course';
import { School } from '@mui/icons-material';
import {
  alpha,
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material';
import { IconEdit, IconTrashX } from '@tabler/icons-react';

interface CourseListTableViewProps extends CoursesListViewProps {
  courses: Course[];
}

export default function CourseTableView({
  courses,
  onCourseEdit,
  onCourseDelete,
}: CourseListTableViewProps) {
  const theme = useTheme();
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Course</TableCell>
            <TableCell>Instructor</TableCell>
            <TableCell>Level</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.id} hover>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {course.image && course.image.trim() !== '' ? (
                    <Avatar
                      src={course.image}
                      variant="rounded"
                      sx={{ width: 60, height: 40, mr: 2 }}
                    />
                  ) : (
                    <Avatar
                      variant="rounded"
                      sx={{ width: 60, height: 40, mr: 2, bgcolor: 'grey.200' }}
                    >
                      <School />
                    </Avatar>
                  )}
                  <Box>
                    <Typography variant="subtitle1" fontWeight="medium">
                      {course.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        maxWidth: 200,
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {course.description}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>

              <TableCell>
                <Chip label={course.level} size="small" color={getLevelColor(course.level)} />
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  {new Date(course.createdAt).toLocaleDateString()}
                </Typography>
              </TableCell>

              <TableCell align="center">
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                  <IconButton
                    size="small"
                    onClick={() => onCourseEdit && onCourseEdit(course.id)}
                    title="Edit Course"
                  >
                    <IconEdit size={18} />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => onCourseDelete && onCourseDelete(course.id, course.title)}
                    title="Delete Course"
                    color="error"
                  >
                    <IconTrashX size={18} />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
