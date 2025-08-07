import { JsonPostRepository } from '@/repositories/post/json-post-repository'
import { drizzleDb } from '.'
import { postsTable } from './schemas'
;(async () => {
    const jsonPostRepository = new JsonPostRepository()
    const posts = await jsonPostRepository.findAll()

    try {
        await drizzleDb.delete(postsTable) // Limpa a base de dados
        await drizzleDb.insert(postsTable).values(posts)
        console.log(
            `A base de dados foi limpa e ${posts.length} posts inseridos com sucesso!`
        )
    } catch (error) {
        console.log('Ocorreu um erro...', error)
    }
})()
