import z from 'zod';

export const courseSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .min(5, 'Title must be at least 5 characters')
    .max(100, 'Title must not exceed 100 characters')
    .trim(),

  description: z
    .string()
    .min(1, 'Description is required')
    .min(10, 'Description must be at least 10 characters')
    .max(200, 'Description must not exceed 200 characters')
    .trim(),

  instructor: z
    .string()
    .min(1, 'instructor is required')
    .min(3, 'Instructor must be at least 3 characters')
    .max(200, 'Instructor must not exceed 200 characters')
    .trim(),

  level: z.enum(['Beginner', 'Intermediate', 'Advanced'], {
    error: 'Please select a valid level',
  }),

  image: z.string().optional(),
});

export type CourseFormData = z.infer<typeof courseSchema>;
