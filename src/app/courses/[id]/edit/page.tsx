'use client';

import CourseForm from '@/components/forms/CourseForm';
import { Course, useCourseStore } from '@/lib/stores/courseStore';
import { Box } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function EditCoursePage() {
  const router = useRouter();
  const params = useParams();
  const { getCourseById } = useCourseStore();

  const courseId = parseInt(params.id as string);
  const [course, setCourse] = useState<Course | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundCourse = getCourseById(courseId);
    setCourse(foundCourse);
    setLoading(false);
  }, [courseId, getCourseById]);

  useEffect(() => {
    if (!loading && !course) {
      toast.error(`Course with ID ${courseId} not found`);
      router.push('/courses');
    }
  });
  const handleSuccess = () => {
    router.push('/courses');
  };

  const handleCancel = () => {
    router.push('/courses');
  };

  return (
    <Box>
      <CourseForm mode="edit" onSuccess={handleSuccess} onCancel={handleCancel} course={course} />
    </Box>
  );
}
