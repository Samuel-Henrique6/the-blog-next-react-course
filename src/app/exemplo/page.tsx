import { formatHour } from '@/utils/format-datetime'

export const dynamic = 'force-static'

export const revalidate = 5

export default async function ExemploPage() {
    const hour = formatHour(Date.now())

    return (
        <main className='min-h-[600px] text-4xl font-bold'>
            <div>Hour: {hour}</div>
        </main>
    )
}
