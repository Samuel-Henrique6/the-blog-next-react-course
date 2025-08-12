import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: 'Login',
}

export default async function AdminLoginPage() {
    return (
        <div className='py-16 text-6xl'>
            <h1>Admin Login</h1>
        </div>
    )
}
