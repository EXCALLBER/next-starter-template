'use server'
import { revalidateTag } from 'next/cache'

export async function refreshRandomImage() {
    revalidateTag('random-image', { expire: 0 })
}
