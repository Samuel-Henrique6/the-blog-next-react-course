import Link from 'next/link'

type PostHeadingProps = {
    children: React.ReactNode
    url: string
    as?: 'h1' | 'h2'
}

//O PostHeading é um componente que renderiza um título de post dinamicamente
export function PostHeading({
    children,
    url,
    as: Tag = 'h2', //transformar prop para tag HTML
}: PostHeadingProps) {
    const headingClasses = {
        h1: 'text-2xl/tight font-extrabold sm:text-4xl',
        h2: 'text-2xl/tight font-bold',
    }
    return (
        <Tag className={headingClasses[Tag]}>
            <Link className='hover:text-slate-600' href={url}>
                {children}
            </Link>
        </Tag>
    )
}
