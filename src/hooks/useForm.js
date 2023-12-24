import { useState } from 'react'

export const useForm = (initialState) => {

  const [isChange, setIsChange] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (e) => {
    setIsChange(true);
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const resetValues = () => {
    setFormData(initialState);
    setIsChange(false);
  }

  return { formData, handleInputChange, resetValues, isChange };
};