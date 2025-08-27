'use client'

import { uploadImageAction } from '@/actions/upload/upload-image-action'
import { Button } from '@/components/Button'
import SpinLoaderButton from '@/components/SpinLoaderButton'
import { IMAGE_UPLOAD_MAX_SIZE } from '@/lib/constants'
import { ImageUpIcon } from 'lucide-react'
import { useRef, useState, useTransition } from 'react'
import { toast } from 'react-toastify'

export function ImageUploader() {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [isUploading, startTransition] = useTransition()
    const [imgUrl, setImgUrl] = useState('')

    function handleChooseFile() {
        if (!fileInputRef.current) return
        fileInputRef.current.click()
    }

    function handleChange() {
        toast.dismiss()
        const fileInput = fileInputRef.current
        if (!fileInput) {
            setImgUrl('')
            return
        }

        const file = fileInput?.files?.[0]

        if (!file) {
            setImgUrl('')
            return
        }

        if (file.size > IMAGE_UPLOAD_MAX_SIZE) {
            toast.error(
                `Image muito grande. Máx.: ${IMAGE_UPLOAD_MAX_SIZE / 1024}KB`
            )
            setImgUrl('')
            fileInput.value = '' // Limpa o input de arquivos, se selecionar a mesma imagem
            return
        }

        const formData = new FormData()
        formData.append('file', file)

        startTransition(async () => {
            const result = await uploadImageAction(formData)

            if (result.error) {
                toast.error(result.error)
                fileInput.value = ''
                setImgUrl('') // Limpa a URL da imagem
                return
            }

            setImgUrl(result.url)
            toast.success('Imagem carregada com sucesso!')
        })

        fileInput.value = ''
    }

    return (
        <div className='flex flex-col gap-1 py-4'>
            <Button
                onClick={handleChooseFile}
                type='button'
                className='self-start'
                variant='ghost'
                disabled={isUploading}
            >
                {!isUploading ? <ImageUpIcon /> : <SpinLoaderButton />}
                Enviar Imagem
            </Button>
            {!!imgUrl && (
                <div className='flex flex-col gap-4'>
                    <p>
                        <b>URL:</b> {imgUrl}
                    </p>

                    {/* eslint-disable-next-line */}
                    <img
                        className='rounded-lg'
                        src={imgUrl}
                        alt='Imagem do post'
                    />
                </div>
            )}
            <input
                onChange={handleChange}
                ref={fileInputRef}
                hidden
                name='file'
                type='file'
                accept='image/*'
                disabled={isUploading}
            />
        </div>
    )
}
