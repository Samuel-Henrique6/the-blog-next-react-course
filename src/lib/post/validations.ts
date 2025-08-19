import { isUrlOrRelativePath } from '@/utils/is-url-or-relative-path'
import sanitizeHtml from 'sanitize-html'
import z from 'zod'

const PostBaseSchema = z.object({
    title: z
        .string()
        .trim()
        .min(3, 'O titulo deve ter pelo menos 3 caracteres')
        .max(120, 'O titulo deve ter no maximo 120 caracteres'),
    excerpt: z
        .string()
        .trim()
        .min(3, 'O resumo deve ter pelo menos 3 caracteres')
        .max(200, 'O resumo deve ter no maximo 200 caracteres'),
    content: z
        .string()
        .trim()
        .min(3, 'O conteudo deve ter pelo menos 3 caracteres')
        .transform((val) => sanitizeHtml(val)),
    coverImageUrl: z.string().trim().refine(isUrlOrRelativePath, {
        message: 'URL da capa dever uma URL ou caminho para imagem',
    }),
    published: z
        .union([
            z.literal('on'),
            z.literal('true'),
            z.literal('false'),
            z.literal(true),
            z.literal(false),
            z.literal(null),
            z.literal(undefined),
        ])
        .default(false)
        .transform((val) => val === 'on' || val === 'true' || val === true),
    author: z
        .string()
        .trim()
        .min(4, 'O autor deve ter pelo menos 3 caracteres')
        .max(100, 'O autor deve ter no maximo 100 caracteres'),
})

export const PostCreateSchema = PostBaseSchema

export const PostUpdateSchema = PostBaseSchema.extend({})
