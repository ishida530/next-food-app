'use client'
import { useFormStatus } from 'react-dom'

const MealsFormSubmit = () => {
    const { pending } = useFormStatus()
    return (
        <button disabled={pending ? true : false} type="submit">
            {pending ? 'Submittings...' : 'Share Meal'}
        </button>

    )
}

export default MealsFormSubmit