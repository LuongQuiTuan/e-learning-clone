import { CourseFormData } from '@/schema/courseSchema';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DraftData {
  data: Partial<CourseFormData>;
  timestamp: number;
}

interface FormDraftState {
  courseDraft: DraftData | null;
  saveDraft: (data: Partial<CourseFormData>) => void;
  clearDraft: () => void;
  hasDraft: () => boolean;
  isExpired: (draft: DraftData | null) => boolean;
}

//10 minutes in miliseconds
const DRAFT_EXPIRY_TIMES = 10 * 60 * 1000;

export const useFormDraftStore = create<FormDraftState>()(
  persist(
    (set, get) => ({
      courseDraft: null,
      saveDraft: (data) => {
        set({
          courseDraft: {
            data,
            timestamp: Date.now(),
          },
        });
      },
      clearDraft: () => {
        set({ courseDraft: null });
      },

      isExpired: (draft) => {
        if (!draft) return true;
        return Date.now() - draft.timestamp > DRAFT_EXPIRY_TIMES;
      },

      hasDraft: () => {
        const draft = get().courseDraft;
        const { isExpired } = get();

        if (!draft) return false;
        if (isExpired(draft)) {
          get().clearDraft();
          return false;
        }

        const hasContent = Boolean(
          (draft.data.title && draft.data.title.trim() !== '') ||
            (draft.data.description && draft.data.description.trim() !== '') ||
            (draft.data.instructor && draft.data.instructor.trim() !== '') ||
            (draft.data.image && draft.data.image.trim() !== ''),
        );

        return hasContent;
      },
    }),
    {
      name: 'course-form-draft-storage',
      partialize: (state) => ({ courseDraft: state.courseDraft }),
    },
  ),
);
