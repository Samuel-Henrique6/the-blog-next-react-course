import clsx from 'clsx'

export default function NotFoundPage() {
    return (
        <div
            className={clsx(
                'min-h-[320px] bg-slate-900 text-slate-100',
                'flex flex-col items-center justify-center text-center',
                'mb-16 rounded-xl'
            )}
        >
            <h1 className='text-7xl/tight mb-4 font-bold'>404</h1>
            <p>Erro 404 - A página que você procurou não foi encontrada.</p>
        </div>
    )
}
