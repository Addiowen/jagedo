import { z } from 'zod';

export const reviewSchema = z.array(
    z.object({
        question: z.string(),
        value: z.number(),
    })
)

export const REVIEW_DEFAULT_VALUE = [
    {
        question: '',
        value: 0,
    }
]