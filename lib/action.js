'use server'

import { redirect } from "next/navigation";
import { saveMeal } from "./meals"
import { revalidatePath } from "next/cache";


const isInvalidText = (text) => {
  return text.text && text.trim() === '';
}
export const shareMeal = async (prevState, formData) => {

  const meal = {
    title: formData.get('title'),
    creator_email: formData.get('email'),
    creator: formData.get('name'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image')
  }
  if (isInvalidText(meal.title) ||
    isInvalidText(meal.creator_email) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    !meal.creator_email.includes('@') ||
    !meal.image ||
    meal.image.size === 0) {
    return {
      message: 'Invalid input.'
    }
  }
  await saveMeal(meal);
  revalidatePath('/meals')
  redirect('/meals')
}