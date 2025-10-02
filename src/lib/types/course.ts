export interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CoursesListViewProps {
  onCourseEdit?: (courseId: number) => void;
  onCourseDelete?: (courseId: number, title: string) => void;
}

export const getLevelColor = (level: string) => {
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

export interface CourseFormData {
  title: string;
  description: string;
  instructor: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  image?: string;
}
