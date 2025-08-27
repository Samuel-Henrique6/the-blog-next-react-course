'use server'

import { postRepository } from '@/repositories/post'
import { revalidateTag } from 'next/cache'
import { basename } from 'path'
export async function deletePostAction(id: string) {
    //[ ] Checar login do usuario

    if (!id || typeof id !== 'string') {
        return {
            error: 'Dados inválidos',
        }
    }

    let post

    try {
        post = await postRepository.delete(id)
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                fileName: '',
                error: error.message,
            }
        }

        return {
            fileName: '',
            error: 'Erro ao deletar post',
        }
    }

    revalidateTag('posts')
    revalidateTag(`post-${post.slug}`)

    return {
        fileName: basename(post.coverImageUrl),
        error: '',
    }
}
