import { PostModel } from '@/models/post/post-model'
import { PostRepository } from './post-repository'
import { drizzleDb } from '@/db/drizzle'
import { logColor } from '@/utils/log-color'
import { asyncDelay } from '@/utils/async-delay'
import { SIMULATE_WAIT_IN_MS } from '@/lib/constants'
import { postsTable } from '@/db/drizzle/schemas'
import { eq } from 'drizzle-orm'
import { deleteImageAction } from '@/actions/upload/delete-image-action'

export class DrizzlePostRepository implements PostRepository {
    async findAllPublic(): Promise<PostModel[]> {
        await asyncDelay(SIMULATE_WAIT_IN_MS, true)

        const posts = await drizzleDb.query.posts.findMany({
            orderBy: (posts, { desc }) => desc(posts.createdAt),
            where: (posts, { eq }) => eq(posts.published, true),
        })

        return posts
    }
    async findBySlugPublic(slug: string): Promise<PostModel> {
        await asyncDelay(SIMULATE_WAIT_IN_MS, true)

        const post = await drizzleDb.query.posts.findFirst({
            where: (posts, { eq, and }) =>
                and(eq(posts.slug, slug), eq(posts.published, true)),
        })

        if (!post) {
            throw new Error(`Post with slug ${slug} not found`)
        }

        return post
    }
    async findAll(): Promise<PostModel[]> {
        await asyncDelay(SIMULATE_WAIT_IN_MS, true)

        const posts = await drizzleDb.query.posts.findMany({
            orderBy: (posts, { desc }) => desc(posts.createdAt),
        })

        return posts
    }
    async findById(id: string): Promise<PostModel> {
        await asyncDelay(SIMULATE_WAIT_IN_MS, true)

        const post = await drizzleDb.query.posts.findFirst({
            where: (posts, { eq }) => eq(posts.id, id),
        })

        if (!post) {
            throw new Error(`Post with id ${id} not found`)
        }

        return post
    }

    async create(post: PostModel): Promise<PostModel> {
        const postExists = await drizzleDb.query.posts.findFirst({
            where: (posts, { or, eq }) =>
                or(eq(posts.id, post.id), eq(posts.slug, post.slug)),
        })

        if (!!postExists) {
            throw new Error(
                `Post with id ${post.id} or slug ${post.slug} already exists`
            )
        }

        await drizzleDb.insert(postsTable).values(post)
        return post
    }

    async delete(id: string): Promise<PostModel> {
        const post = await drizzleDb.query.posts.findFirst({
            where: (posts, { eq }) => eq(posts.id, id),
        })

        if (!post) {
            throw new Error(`Post with id ${id} not found`)
        }

        await drizzleDb.delete(postsTable).where(eq(postsTable.id, id))
        await deleteImageAction(post.coverImageUrl)
        return post
    }

    async update(
        id: string,
        newPost: Omit<PostModel, 'id' | 'slug' | 'createdAt' | 'updatedAt'>
    ): Promise<PostModel> {
        const oldPost = await drizzleDb.query.posts.findFirst({
            where: (posts, { eq }) => eq(posts.id, id),
        })

        if (!oldPost) {
            throw new Error(`Post with id ${id} not found`)
        }

        const updatedAt = new Date().toString()
        const postData = {
            author: newPost.author,
            content: newPost.content,
            coverImageUrl: newPost.coverImageUrl,
            title: newPost.title,
            excerpt: newPost.excerpt,
            published: newPost.published,
            updatedAt,
        }

        await drizzleDb
            .update(postsTable)
            .set(postData)
            .where(eq(postsTable.id, id))

        return {
            ...oldPost,
            ...postData,
        }
    }
}

{
    /* testando no console
    ;(async () => {
    //como-a-tecnologia-impacta-nosso-bem-estar false
    //os-desafios-do-trabalho-remoto-moderno true
    //6b204dab-2312-4525-820a-a0463560835f false
    //76396dd3-9581-43b5-856d-fe1a78714e8c true
    const repo = new DrizzlePostRepository()
    const posts = await repo.findById('6b204dab-2312-4525-820a-a0463560835f')

    //posts.forEach((post) => console.log(post.id, post.published))
    console.log(posts)
})()*/
}
