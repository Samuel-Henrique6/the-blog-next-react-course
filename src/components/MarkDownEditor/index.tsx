'use client'

import dynamic from 'next/dynamic'
import { useId } from 'react'
import rehypeSanitize from 'rehype-sanitize'
import remarkGfm from 'remark-gfm'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
    ssr: false,
})

type MarkdownEditorProps = {
    labelText?: string
    value: string
    setValue: React.Dispatch<React.SetStateAction<string>>
    textAreaName: string
    disabled?: boolean
}

export function MarkdownEditor({
    labelText = '',
    value,
    setValue,
    textAreaName,
    disabled = false,
}: MarkdownEditorProps) {
    const id = useId()

    return (
        <div className='flex flex-col gap-2'>
            {labelText && (
                <label className='text-sm' htmlFor={id}>
                    {labelText}
                </label>
            )}

            <MDEditor
                className='whitespace-pre-wrap'
                value={value}
                onChange={(value) => {
                    if (value === undefined) return
                    setValue(value)
                }}
                height={400}
                extraCommands={[]} //Deixa [] vazio para nao aparecer o botao de preview, evitar xss
                preview='edit'
                hideToolbar={disabled} //Desabilita os botoes da toolbar quando disabled
                textareaProps={{
                    id,
                    name: textAreaName,
                    disabled: disabled,
                }}
                previewOptions={{
                    rehypePlugins: [[rehypeSanitize]], //Plugin para limpar markdown para evitar xss
                    remarkPlugins: [[remarkGfm]], //Plugin para suporte a tabelas, listas, etc
                }}
            />
        </div>
    )
}
