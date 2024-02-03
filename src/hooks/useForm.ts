import { ChangeEvent, useState } from 'react'

interface IFormData { 
  [name: string]: string | undefined; 
}

export const useForm = (initialState: IFormData) => {

  const [isChange, setIsChange] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChange(true);
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const resetValues = () => {
    setFormData(initialState);
    setIsChange(false);
  }

  return { formData, handleInputChange, resetValues, isChange };
};