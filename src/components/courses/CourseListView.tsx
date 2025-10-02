'use client';

import { useCourseStore } from '@/lib/stores/courseStore';
import { School } from '@mui/icons-material';
import { Box, CircularProgress, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import DeleteConfirmationModal from '../modals/DeleteConfirmationModal';
import { useIsMobile } from '@/hooks/useMobile';
import CourseTableView from './CourseTableView';
import { Course, CoursesListViewProps } from '@/lib/types/course';
import CourseListGridView from './CourseGridView';
import { useDebounce } from '@/hooks/useDebounce';
import CourseSearchBar from './CourseSearchBar';
import CourseSortToggle from './CouseSortToggle';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function CourseListView({ onCourseEdit, onCourseDelete }: CoursesListViewProps) {
  const { getSortedCourses, deleteCourse } = useCourseStore();
  const router = useRouter();
  const courses = getSortedCourses();
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const isMobile = useIsMobile();
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const [sortBy, setSortBy] = useState<'name' | 'date'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [displayedCourses, setDisplayedCourses] = useState<Course[]>([]);
  const PAGE_SIZE = 12;

  const filteredAndSortedCourses = useMemo(() => {
    let results = courses;
    if (debouncedSearchTerm?.trim()) {
      const searchLower = debouncedSearchTerm.toLowerCase();
      results = courses.filter((course) => course.title.toLowerCase().includes(searchLower));
    }

    const sorted = [...results].sort((a, b) => {
      const sortKey = `${sortBy}-${sortOrder}`; //combine name, not minus
      console.log(sortKey);

      switch (sortKey) {
        case 'name-asc':
          return a.title.localeCompare(b.title);

        case 'name-desc':
          return b.title.localeCompare(a.title);

        case 'date-asc':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();

        case 'date-desc':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

        default:
          return 0;
      }
    });

    return sorted;
  }, [courses, debouncedSearchTerm, sortBy, sortOrder]);

  const handleSortChange = (
    event: React.MouseEvent<HTMLElement>,
    newSort: 'name' | 'date' | null,
  ) => {
    if (newSort === null) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else if (sortBy === newSort) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSort);
      setSortOrder(newSort === 'date' ? 'desc' : 'asc');
    }
  };

  useEffect(() => {
    if (isMobile && viewMode === 'table') {
      setViewMode('grid');
    }
  }, [isMobile, viewMode]);

  const handleEdit = (courseId: number) => {
    onCourseEdit?.(courseId) || router.push(`/courses/${courseId}/edit`);
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

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    const initialItems = filteredAndSortedCourses.slice(0, PAGE_SIZE);
    setDisplayedCourses(initialItems);
    setHasMore(filteredAndSortedCourses.length > PAGE_SIZE);
  }, [debouncedSearchTerm, sortBy, sortOrder]);

  const loadMore = () => {
    const nextPage = page + 1;
    const startIndex = page * PAGE_SIZE;
    const endIndex = nextPage * PAGE_SIZE;
    const newItems = filteredAndSortedCourses.slice(startIndex, endIndex);
    setDisplayedCourses((prev) => [...prev, ...newItems]);
    setPage(nextPage);

    if (displayedCourses.length + newItems.length >= filteredAndSortedCourses.length) {
      setHasMore(false);
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        pb: isMobile ? '100px' : 0,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            All Courses
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between', // space between left and right sides
            alignItems: 'center', // vertically center items
            mb: 3,
          }}
        >
          {/* Left side: search bar */}
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <CourseSearchBar
              onChange={setSearchTerm}
              value={searchTerm}
              onClear={() => setSearchTerm('')}
              isMobile={isMobile}
            />
          </Box>

          {/* Right side: sort toggle and view mode */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              flexWrap: 'wrap', // allow wrapping on small screens
              justifyContent: isMobile ? 'flex-end' : 'flex-start', // right-align on mobile
              width: isMobile ? '100%' : 'auto',
            }}
          >
            <CourseSortToggle
              sortBy={sortBy}
              sortOrder={sortOrder}
              onChange={handleSortChange}
              isMobile={isMobile}
              theme={theme}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
          </Box>
        </Box>
      </Box>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <InfiniteScroll
          dataLength={displayedCourses.length}
          next={loadMore}
          hasMore={hasMore}
          loader={
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <CircularProgress />
            </Box>
          }
        >
          <CourseListGridView
            courses={displayedCourses}
            onCourseEdit={handleEdit}
            onCourseDelete={handleDelete}
          />
        </InfiniteScroll>
      )}

      {/* Table View */}
      {viewMode === 'table' && !isMobile && (
        <CourseTableView
          courses={filteredAndSortedCourses}
          onCourseEdit={handleEdit}
          onCourseDelete={handleDelete}
        />
      )}

      {/* Empty State */}
      {courses.length === 0 && (
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
            px: 3,
          }}
        >
          <School sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No courses found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Start by creating your first course
          </Typography>
        </Box>
      )}

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
