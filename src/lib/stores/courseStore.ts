import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

interface CourseState {
  courses: Course[];
  loading: boolean;
  error: string | null;
  addCourse: (courseData: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateCourse: (id: number, courseData: Partial<Course>) => void;
  deleteCourse: (id: number) => void;
  getCourseById: (id: number) => Course | undefined;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useCourseStore = create<CourseState>()(
  persist(
    (set, get) => ({
      courses: [
        {
          id: 1,
          title: 'React Fundamentals',
          description: 'Learn the basics of React including components, props, state, and hooks.',
          instructor: 'John Smith',
          level: 'Beginner',
          image: '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 2,
          title: 'Advanced JavaScript',
          description: 'Deep dive into advanced JavaScript concepts and patterns.',
          instructor: 'Jane Doe',
          level: 'Advanced',
          image: '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
      loading: false,
      error: null,

      addCourse: (courseData) => {
        console.log('🏪 Store: addCourse called with:', courseData);
        const newCourse: Course = {
          ...courseData,
          id: Date.now(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        set((state) => {
          console.log('🏪 Store: BEFORE update - courses:', state.courses);
          const newState = {
            courses: [...state.courses, newCourse], // Make sure this is "courses" not "course"
            error: null,
          };
          console.log('🏪 Store: AFTER update - courses:', newState.courses);
          return newState;
        });
      },
      getCourseById: (id) => {
        return get().courses.find((course) => course.id === id);
      },

      updateCourse: (id, courseData) => {
        set((state) => {
          const updatedCourses = state.courses.map((course) =>
            course.id === id
              ? {
                  ...course,
                  ...courseData,
                  updatedAt: new Date().toISOString(),
                }
              : course,
          );
          return {
            courses: updatedCourses,
            error: null,
          };
        });
      },

      deleteCourse: (id) => {
        set((state) => ({
          courses: state.courses.filter((course) => course.id !== id),
          error: null,
        }));
      },

      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
    }),
    {
      name: 'course-storage',
      partialize: (state) => ({ courses: state.courses }),
    },
  ),
);
