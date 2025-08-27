'use server'

import { mkdir, writeFile } from 'fs/promises'
import { extname, resolve } from 'path'

type UploadImageActionResult = {
    url: string
    error?: string
}

export async function uploadImageAction(
    formData: FormData
): Promise<UploadImageActionResult> {
    // [ ] Checar login do usuario

    const makeResult = ({ url = '', error = '' }) => ({
        url,
        error,
    })

    if (!(formData instanceof FormData)) {
        return makeResult({ error: 'Dados inválidos' })
    }

    const file = formData.get('file')

    if (!(file instanceof File)) {
        return makeResult({ error: 'Arquivo inválido' })
    }

    if (file.size > Number(process.env.IMAGE_UPLOAD_MAX_SIZE)) {
        return makeResult({ error: 'Arquivo muito grande' })
    }

    if (!file.type.startsWith('image/')) {
        return makeResult({ error: 'Arquivo inválido' })
    }

    const imageExtension = extname(file.name) //retorna a extensao do arquivo
    const uniqueImageName = `${Date.now()}${imageExtension}`

    const uploadFullPath = resolve(
        process.cwd(),
        'public',
        process.env.IMAGE_UPLOAD_DIRECTORY || 'uploads'
    )

    //cria o diretorio, recursive = true cria somente se nao existir
    await mkdir(uploadFullPath, { recursive: true })

    // JS < bytes -> Node -> salvar

    const fileArrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(fileArrayBuffer)

    const fileFullPath = resolve(uploadFullPath, uniqueImageName)
    await writeFile(fileFullPath, buffer)
    //salva o arquivo

    const imgServerUrl =
        process.env.IMAGE_SERVER_URL || 'http://localhost:3000/uploads'
    const url = `${imgServerUrl}/${uniqueImageName}`

    return makeResult({ url })
}
