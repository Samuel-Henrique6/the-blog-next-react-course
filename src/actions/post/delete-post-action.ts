'use server'

import { drizzleDb } from '@/db/drizzle'
import { postsTable } from '@/db/drizzle/schemas'
import { postRepository } from '@/repositories/post'
import { asyncDelay } from '@/utils/async-delay'
import { logColor } from '@/utils/log-color'
import { eq } from 'drizzle-orm'
import { revalidateTag } from 'next/cache'
export async function deletePostAction(id: string) {
    //[ ] Checar login do usuario

    //[ ] Remover linhas abaixo
    logColor('DeletePostAction' + id)
    await asyncDelay(2000)

    if (!id || typeof id !== 'string') {
        return {
            error: 'Dados inválidos',
        }
    }

    const post = await postRepository.findById(id).catch(() => undefined)

    if (!post) {
        return {
            error: 'Post not found',
        }
    }

    //[ ] mover este método para o repository
    await drizzleDb.delete(postsTable).where(eq(postsTable.id, id))

    revalidateTag('posts')
    revalidateTag(`post-${post.slug}`)

    return {
        error: '',
    }
}
