import { PostModel } from '@/models/post/post-model'
import { PostRepository } from './post-repository'
import { resolve } from 'path'
import { readFile } from 'fs/promises'
import { SIMULATE_WAIT_IN_MS } from '@/lib/constants'

const ROOT_DIR = process.cwd()
const JSON_POSTS_FILE_PATH = resolve(
    ROOT_DIR,
    'src',
    'db',
    'seed',
    'posts.json'
) // Usando 'resolve' para garantir o caminho correto

export class JsonPostRepository implements Partial<PostRepository> {
    private async simulateWait() {
        if (SIMULATE_WAIT_IN_MS <= 0) return

        await new Promise((resolve) => {
            setTimeout(() => {
                resolve(true)
            }, SIMULATE_WAIT_IN_MS)
        })
    }
    private async readFromDisk(): Promise<PostModel[]> {
        const jsonContent = await readFile(JSON_POSTS_FILE_PATH, 'utf-8')
        const parsedJson = JSON.parse(jsonContent)
        const { posts } = parsedJson
        return posts
    }
    async findAllPublic(): Promise<PostModel[]> {
        await this.simulateWait()

        return (await this.readFromDisk()).filter((post) => post.published)
    }

    async findAll(): Promise<PostModel[]> {
        await this.simulateWait()
        return await this.readFromDisk()
    }

    async findById(id: string): Promise<PostModel> {
        const posts = await this.findAllPublic()
        const post = posts.find((post) => post.id === id)
        if (!post) {
            throw new Error(`Post with id ${id} not found`)
        }
        return post
    }

    async findBySlugPublic(slug: string): Promise<PostModel> {
        const posts = await this.findAllPublic()
        const post = posts.find((post) => post.slug === slug)
        if (!post) {
            throw new Error(`Post with slug ${slug} not found`)
        }
        return post
    }
}

//;(async () => {
//    const posts = await postRepository.findAll()
//    posts.forEach((post) => console.log(post.id))
//})()
//;(async () => {
//    const post = await postRepository.findById('99f8add47684-4c16-a316-616271db199e')
//    console.log(post)
//})()
