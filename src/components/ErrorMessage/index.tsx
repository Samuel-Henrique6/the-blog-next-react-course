import clsx from 'clsx'

type ErrorMessageProps = {
    pageTitle: string
    contentTitle: string
    content: React.ReactNode
}

export function ErrorMessage({
    pageTitle,
    contentTitle,
    content,
}: ErrorMessageProps) {
    return (
        <>
            <title>{pageTitle}</title>
            <div
                className={clsx(
                    'min-h-[320px] bg-slate-900 text-slate-100',
                    'flex flex-col items-center justify-center text-center',
                    'mb-16 rounded-xl px-4'
                )}
            >
                <h1 className='text-7xl/tight mb-4 font-bold'>
                    {contentTitle}
                </h1>
                <div>{content}</div>
            </div>
        </>
    )
}
