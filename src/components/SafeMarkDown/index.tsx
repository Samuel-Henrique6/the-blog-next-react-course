import clsx from 'clsx'
import ReactMarkDown from 'react-markdown' // npm i react-markdown -- renderizar markdown
import rehypeSanitize from 'rehype-sanitize' // npm i rehype-sanitize -- limpar markdown
import remarkGfm from 'remark-gfm' // npm i remark-gfm -- suporte a tabelas, listas, etc.

type SafeMarkDownProps = {
    markdown: string
}

export function SafeMarkDown({ markdown }: SafeMarkDownProps) {
    return (
        <div
            className={clsx(
                'prose prose-slate',
                'w-full max-w-none',
                'overflow-hidden',
                'prose-a:transition',
                'prose-a:no-underline',
                'prose-a:text-blue-500',
                'prose-a:hover:text-blue-700',
                'prose-a:hover:underline',
                'prose-img:mx-auto',
                'lg:prose-lg'
            )}
        >
            <ReactMarkDown // Renderizar markdown
                rehypePlugins={[rehypeSanitize]} // Limpar markdown
                remarkPlugins={[remarkGfm]} // Suporte a tabelas, listas, etc.
                components={{
                    // Customizar markdown
                    table: ({ node, ...props }) => {
                        if (!node?.children) return ''
                        return (
                            <div className='overflow-x-auto'>
                                <table
                                    className='w-full min-w-[500px]'
                                    {...props}
                                />
                            </div>
                        )
                    },
                }}
            >
                {markdown}
            </ReactMarkDown>
        </div>
    )
}
