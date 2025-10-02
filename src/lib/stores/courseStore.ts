import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Course } from '../types/course';

interface CourseState {
  courses: Course[];
  loading: boolean;
  error: string | null;
  getSortedCourses: () => Course[];
  addCourse: (courseData: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateCourse: (id: number, courseData: Partial<Course>) => void;
  deleteCourse: (id: number) => void;
  getCourseById: (id: number) => Course | undefined;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}
const sampleCourses: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    title: 'JavaScript Essentials',
    description: 'Master the core principles of JavaScript.',
    instructor: 'Alice Johnson',
    level: 'Beginner',
    image: '',
  },
  {
    title: 'TypeScript Deep Dive',
    description: 'Comprehensive guide to TypeScript features.',
    instructor: 'Bob Williams',
    level: 'Intermediate',
    image: '',
  },
  {
    title: 'React State Management',
    description: 'Learn state management techniques with Redux and Zustand.',
    instructor: 'Cathy Nguyen',
    level: 'Advanced',
    image: '',
  },
  {
    title: 'Next.js for Beginners',
    description: 'Get started with server-side rendering and static site generation.',
    instructor: 'David Lee',
    level: 'Beginner',
    image: '',
  },
  {
    title: 'Node.js API Development',
    description: 'Build scalable back-end APIs using Node.js and Express.',
    instructor: 'Eva Martins',
    level: 'Intermediate',
    image: '',
  },
  {
    title: 'CSS Grid and Flexbox',
    description: 'Design responsive layouts modern CSS.',
    instructor: 'Frank Brown',
    level: 'Beginner',
    image: '',
  },
  {
    title: 'Python for Data Science',
    description: 'Learn Python basics and data libraries.',
    instructor: 'Grace Kim',
    level: 'Intermediate',
    image: '',
  },
  {
    title: 'Machine Learning Basics',
    description: 'Intro to ML algorithms and concepts.',
    instructor: 'Hannah Lee',
    level: 'Advanced',
    image: '',
  },
  {
    title: 'Django Web Development',
    description: 'Backend development with Django.',
    instructor: 'Ian Scott',
    level: 'Intermediate',
    image: '',
  },
  {
    title: 'GraphQL API Design',
    description: 'Build APIs with GraphQL basics.',
    instructor: 'Jane Abbott',
    level: 'Advanced',
    image: '',
  },
  {
    title: 'Vue.js Fundamentals',
    description: 'Learn Vue.js 3 basics and core concepts.',
    instructor: 'Kyle Wilson',
    level: 'Beginner',
    image: '',
  },
  {
    title: 'Angular in Depth',
    description: 'Advanced Angular component and service design.',
    instructor: 'Lara Chen',
    level: 'Advanced',
    image: '',
  },
  {
    title: 'Mobile App Development',
    description: 'Build mobile apps with React Native.',
    instructor: 'Mike Davis',
    level: 'Intermediate',
    image: '',
  },
  {
    title: 'Cloud Computing Basics',
    description: 'Intro to AWS, Azure, and Google Cloud.',
    instructor: 'Nina Patel',
    level: 'Beginner',
    image: '',
  },
  {
    title: 'Docker and Kubernetes',
    description: 'Containerize and orchestrate apps.',
    instructor: 'Oscar Friedrich',
    level: 'Advanced',
    image: '',
  },
  {
    title: 'UI/UX Design Principles',
    description: 'Essentials of user interface and experience.',
    instructor: 'Patricia Gomez',
    level: 'Beginner',
    image: '',
  },
  {
    title: 'RESTful API Development',
    description: 'Build RESTful services with Express.',
    instructor: 'Quentin Hill',
    level: 'Intermediate',
    image: '',
  },
  {
    title: 'DevOps Fundamentals',
    description: 'Learn CI/CD pipelines and automation.',
    instructor: 'Rachel Adams',
    level: 'Advanced',
    image: '',
  },
  {
    title: 'Cybersecurity Essentials',
    description: 'Basics of protecting web applications.',
    instructor: 'Steve Martin',
    level: 'Intermediate',
    image: '',
  },
  {
    title: 'Data Structures & Algorithms',
    description: 'Core CS concepts for developers.',
    instructor: 'Tina Brown',
    level: 'Advanced',
    image: '',
  },
];
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

      getSortedCourses: () => {
        const state = get();
        return [...state.courses].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
      },

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

let hasInitialized;
if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
  hasInitialized = localStorage.getItem('courses-initialized');
} else {
  hasInitialized = null;
}
