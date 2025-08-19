'use server'

import { drizzleDb } from '@/db/drizzle'
import { postsTable } from '@/db/drizzle/schemas'
import { makePartialPublicPost } from '@/dto/post/dto'
import { PostCreateSchema } from '@/lib/post/validations'
import { PostModel, PublicPost } from '@/models/post/post-model'
import { getZodErrorMessages } from '@/utils/get-zod-error-messages'
import { makeSlugFromText } from '@/utils/make-slug-from-text'
import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { v4 as uuidV4 } from 'uuid'

type CreatePostActionState = {
    formState: PublicPost
    errors: string[]
}

export async function createPostAction(
    prevState: CreatePostActionState,
    formData: FormData
): Promise<CreatePostActionState> {
    // [ ] Checar login do usuario

    if (!(formData instanceof FormData)) {
        return {
            formState: prevState.formState,
            errors: ['Dados inválidos'],
        }
    }

    // Converte o FormData em um objeto ['key', 'value'] e depois transforma em um objeto {key: value}
    const formDataToObj = Object.fromEntries(formData.entries())
    const zodParseObj = PostCreateSchema.safeParse(formDataToObj)

    if (!zodParseObj.success) {
        const errors = getZodErrorMessages(zodParseObj.error)
        return {
            errors,
            formState: makePartialPublicPost(formDataToObj),
        }
    }

    const validPostData = zodParseObj.data
    const newPost: PostModel = {
        ...validPostData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        id: uuidV4(),
        slug: makeSlugFromText(validPostData.title),
    }

    //[ ] mover este método para o repository
    await drizzleDb.insert(postsTable).values(newPost)

    revalidateTag('posts')
    redirect(`/admin/post/${newPost.id}`)
}
