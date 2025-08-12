import PostsListAdmin from '@/components/PostsListAdmin'
import SpinLoader from '@/components/SpinLoader'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: 'Post Admin',
}

export default async function AdminPostPage() {
    return (
        <Suspense fallback={<SpinLoader className='min-h-20 mb-16' />}>
            <PostsListAdmin />
        </Suspense>
    )
}
