'use client';

import CreateCourseForm from '@/components/forms/CreateCourseForm';
import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function NewCoursePage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push('/courses');
  };

  const handleCancel = () => {
    router.push('/courses');
  };

  return (
    <Box sx={{ py: 3 }}>
      <CreateCourseForm onSuccess={handleSuccess} onCancel={handleCancel} />
    </Box>
  );
}
