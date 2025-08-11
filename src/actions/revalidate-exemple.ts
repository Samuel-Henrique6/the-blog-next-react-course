'use server'

import { revalidateTag } from 'next/cache'

export async function revalidateExampleAction(formData: FormData) {
    const path = (formData.get('path') as string) || ''
    console.log('Revalidating example page... ', path)

    //revalidatePath(path) // revalidar o caminho fornecido
    revalidateTag('posts') // home
    revalidateTag('post-rotina-matinal-de-pessoas-altamente-eficazes') // single post
}
