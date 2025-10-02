// src/hooks/useCourseImageUpload.ts
import { CourseFormData } from '@/lib/types/course';
import { useState, useRef } from 'react';
import { UseFormSetValue } from 'react-hook-form';

export function useCourseImageUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [imageError, setImageError] = useState('');

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setValue: UseFormSetValue<CourseFormData>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        if (file.size > 5 * 1024 * 1024) {
          setImageError('Image size must be less than 5MB');
          return;
        }

        if (!file.type.startsWith('image/')) {
          setImageError('Please select a valid image file');
          return;
        }

        const base64String = await convertToBase64(file);
        setValue('image', base64String);
        setImagePreview(base64String);
        setImageError('');
      } catch (error) {
        setImageError('Failed to upload image');
      }
    }
  };

  const handleRemoveImage = (setValue: UseFormSetValue<CourseFormData>) => {
    setValue('image', '');
    setImagePreview('');
    setImageError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return {
    fileInputRef,
    imagePreview,
    imageError,
    setImagePreview,
    setImageError,
    handleImageUpload,
    handleRemoveImage,
  };
}
