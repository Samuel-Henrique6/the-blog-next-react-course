'use client'

import { Button } from '@/components/Button'
import { InputCheckBox } from '@/components/InputCheckBox'
import { InputText } from '@/components/InputText'
import { MarkdownEditor } from '@/components/MarkDownEditor'
import { useActionState, useEffect, useState } from 'react'
import { ImageUploader } from '../ImageUploader'
import { PublicPost } from '@/models/post/post-model'
import { createPostAction } from '@/actions/post/create-post-action'
import { makePartialPublicPost } from '@/dto/post/dto'
import { toast } from 'react-toastify'

type ManagePostFormProps = {
    dto?: PublicPost
}

export function ManagePostForm({ dto }: ManagePostFormProps) {
    const initialState = {
        formState: makePartialPublicPost(dto),
        errors: [],
    }
    const [state, action, isPending] = useActionState(
        createPostAction,
        initialState
    )

    useEffect(() => {
        if (state.errors.length > 0) {
            toast.dismiss()
            state.errors.forEach((error) => {
                toast.error(error)
            })
        }
    }, [state.errors])

    const { formState } = state
    const [contentValue, setContentValue] = useState(dto?.content || '')

    return (
        <form action={action} className='mb-16'>
            <div className='flex flex-col gap-4'>
                <InputText
                    labelText='ID'
                    name='id'
                    placeholder='ID gerado automaticamente'
                    type='text'
                    defaultValue={formState.id}
                    readOnly
                />

                <InputText
                    labelText='Slug'
                    name='slug'
                    placeholder='Slug gerada automaticamente'
                    type='text'
                    defaultValue={formState.slug}
                    readOnly
                />

                <InputText
                    labelText='Autor'
                    name='author'
                    placeholder='Digite o nome do autor'
                    type='text'
                    defaultValue={formState.author}
                />

                <InputText
                    labelText='Título'
                    name='title'
                    placeholder='Digite o título'
                    type='text'
                    defaultValue={formState.title}
                />

                <InputText
                    labelText='Excerto'
                    name='excerpt'
                    placeholder='Digite o resumo'
                    type='text'
                    defaultValue={formState.excerpt}
                />

                <MarkdownEditor
                    labelText='Conteúdo'
                    value={contentValue}
                    setValue={setContentValue}
                    textAreaName='content'
                    disabled={false}
                />

                <ImageUploader />

                <InputText
                    labelText='URL da imagem de capa'
                    name='coverImageUrl'
                    placeholder='Digite a URL da imagem'
                    type='text'
                    defaultValue={formState.coverImageUrl}
                />

                <InputCheckBox
                    labelText='Publicar?'
                    name='published'
                    type='checkbox'
                    defaultChecked={formState.published}
                />

                <div className='mt-4'>
                    <Button variant='default' size='md'>
                        Enviar
                    </Button>
                </div>
            </div>
        </form>
    )
}
