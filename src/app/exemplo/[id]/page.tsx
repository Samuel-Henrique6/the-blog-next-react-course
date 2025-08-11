//'use cache'

import { revalidateExampleAction } from '@/actions/revalidate-exemple'
import { formatHour } from '@/utils/format-datetime'
import { unstable_cacheLife, unstable_cacheTag } from 'next/cache'

//export const dynamic = 'force-static'
//export const revalidate = 10

//renderizando 2 parâmetros de forma estatica
{
    /*export async function generateStaticParams() {
    return [{ id: '1' }, { id: '2' }]
}*/
}

export default async function ExemploPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params

    async function getHour() {
        'use cache'
        unstable_cacheLife('seconds')
        unstable_cacheTag('ramdom-user')

        return formatHour(Date.now())
    }
    const hour = await getHour()

    return (
        <main className='min-h-[600px] text-4xl font-bold'>
            <div>
                Hour: {hour} | ID: {id}
            </div>
            <form className='py-16' action={revalidateExampleAction}>
                <input
                    type='hidden'
                    name='path'
                    defaultValue={`/exemplo/${id}`}
                />
                <button
                    className='bg-amber-500 text-white p-2 rounded hover:bg-amber-600 transition cursor-pointer'
                    type='submit'
                >
                    Revalidate
                </button>
            </form>
        </main>
    )
}
