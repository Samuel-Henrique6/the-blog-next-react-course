import { PostModel } from '@/models/post/post-model'
import { PostRepository } from './post-repository'
import { drizzleDb } from '@/db/drizzle'

export class DrizzlePostRepository implements PostRepository {
    async findAllPublic(): Promise<PostModel[]> {
        const posts = await drizzleDb.query.posts.findMany({
            orderBy: (posts, { desc }) => desc(posts.createdAt),
            where: (posts, { eq }) => eq(posts.published, true),
        })

        return posts
    }
    async findBySlugPublic(slug: string): Promise<PostModel> {
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
        const posts = await drizzleDb.query.posts.findMany({
            orderBy: (posts, { desc }) => desc(posts.createdAt),
        })

        return posts
    }
    async findById(id: string): Promise<PostModel> {
        const post = await drizzleDb.query.posts.findFirst({
            where: (posts, { eq }) => eq(posts.id, id),
        })

        if (!post) {
            throw new Error(`Post with id ${id} not found`)
        }

        return post
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
