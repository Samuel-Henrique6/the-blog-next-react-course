'use server'

import { unlink } from 'fs/promises'
import { resolve } from 'path'

type DeleteImageActionResult = {
    success: boolean
    error?: string[]
}

export async function deleteImageAction(
    fileName?: string
): Promise<DeleteImageActionResult> {
    if (!fileName || typeof fileName !== 'string') {
        return { success: false, error: ['Nome do arquivo inválido'] }
    }

    try {
        const fileFullPath = resolve(
            process.cwd(),
            'public',
            process.env.IMAGE_UPLOAD_DIRECTORY || 'uploads',
            fileName
        )
        await unlink(fileFullPath)
        return { success: true }
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                success: false,
                error: [error?.message],
            }
        }

        return {
            success: false,
            error: ['Erro ao deletar imagem'],
        }
    }
}
