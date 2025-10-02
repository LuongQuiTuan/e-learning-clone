import { Course, CoursesListViewProps, getLevelColor } from '@/lib/types/course';
import { School } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { IconEdit, IconTrashX } from '@tabler/icons-react';
import { useState } from 'react';

interface CourseListTableViewProps extends CoursesListViewProps {
  courses: Course[];
}

export default function CourseTableView({
  courses,
  onCourseEdit,
  onCourseDelete,
}: CourseListTableViewProps) {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: SelectChangeEvent<number>) => {
    setRowsPerPage(Number(event.target.value));
    setPage(1);
  };

  const totalPages = Math.ceil(courses.length / rowsPerPage);

  const paginatedCourses = courses.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <Box>
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
            {paginatedCourses.map((course) => (
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
                  <Typography variant="body2">{course.instructor}</Typography>
                </TableCell>

                <TableCell>
                  <Chip label={course.level} size="small" color={getLevelColor(course.level)} />
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

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Rows per page</InputLabel>
          <Select value={rowsPerPage} label="Rows per page" onChange={handleChangeRowsPerPage}>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </FormControl>

        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChangePage}
          color="primary"
          showFirstButton
          showLastButton
          siblingCount={1}
          boundaryCount={1}
        />
      </Box>
    </Box>
  );
}
