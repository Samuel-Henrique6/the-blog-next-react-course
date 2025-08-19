'use server'

import {
    IMAGE_SERVER_URL,
    IMAGE_UPLOAD_DIRECTORY,
    IMAGE_UPLOAD_MAX_SIZE,
} from '@/lib/constants'
import { asyncDelay } from '@/utils/async-delay'
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

    // [ ] Remover delay
    await asyncDelay(5000, true)

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

    if (file.size > IMAGE_UPLOAD_MAX_SIZE) {
        return makeResult({ error: 'Arquivo muito grande' })
    }

    if (!file.type.startsWith('image/')) {
        return makeResult({ error: 'Arquivo inválido' })
    }

    const imageExtension = extname(file.name) //retorna a extensao do arquivo
    const uniqueImageName = `${Date.now()}${imageExtension}`
    console.log(process.cwd())
    const uploadFullPath = resolve(
        process.cwd(),
        'public',
        IMAGE_UPLOAD_DIRECTORY
    )

    //cria o diretorio, recursive = true cria somente se nao existir
    await mkdir(uploadFullPath, { recursive: true })

    // JS < bytes -> Node -> salvar

    const fileArrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(fileArrayBuffer)

    const fileFullPath = resolve(uploadFullPath, uniqueImageName)
    await writeFile(fileFullPath, buffer)
    //salva o arquivo

    const url = `${IMAGE_SERVER_URL}/${uniqueImageName}`

    return makeResult({ url })
}
