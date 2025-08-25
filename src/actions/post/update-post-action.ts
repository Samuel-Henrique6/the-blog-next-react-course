'use server'

import { makePartialPublicPost, makePublicPostFromDb } from '@/dto/post/dto'
import { PostUpdateSchema } from '@/lib/post/validations'
import { PublicPost } from '@/models/post/post-model'
import { postRepository } from '@/repositories/post'
import { getZodErrorMessages } from '@/utils/get-zod-error-messages'
import { revalidateTag } from 'next/cache'
type UpdatePostActionState = {
    formState: PublicPost
    errors: string[]
    success?: true
}

export async function updatePostAction(
    prevState: UpdatePostActionState,
    formData: FormData
): Promise<UpdatePostActionState> {
    // [ ] Checar login do usuario

    if (!(formData instanceof FormData)) {
        return {
            formState: prevState.formState,
            errors: ['Dados inválidos'],
        }
    }

    const id = formData.get('id')?.toString() || ''

    if (!id || typeof id !== 'string') {
        return {
            formState: prevState.formState,
            errors: ['Id inválido'],
        }
    }

    // Converte o FormData em um objeto ['key', 'value'] e depois transforma em um objeto {key: value}
    const formDataToObj = Object.fromEntries(formData.entries())
    const zodParseObj = PostUpdateSchema.safeParse(formDataToObj)

    if (!zodParseObj.success) {
        const errors = getZodErrorMessages(zodParseObj.error)
        return {
            errors,
            formState: makePartialPublicPost(formDataToObj),
        }
    }

    const validPostData = zodParseObj.data
    const newPost = {
        ...validPostData,
        updatedAt: new Date().toISOString(),
    }
    let post

    try {
        post = await postRepository.update(id, newPost)
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                formState: makePartialPublicPost(formDataToObj),
                errors: [error.message],
            }
        }
        return {
            formState: makePartialPublicPost(formDataToObj),
            errors: ['Erro ao criar post'],
        }
    }

    revalidateTag('posts')
    revalidateTag(`post-${post.slug}`)

    return {
        formState: makePublicPostFromDb(post),
        errors: [],
        success: true,
    }
}
