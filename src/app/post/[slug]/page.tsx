import { SinglePost } from '@/components/SinglePost'
import SpinLoader from '@/components/SpinLoader'
import { findPostBySlugCached } from '@/lib/post/queries'
import { Metadata } from 'next'
import { Suspense } from 'react'
type PostSlugPageProps = {
    params: Promise<{ slug: string }>
}

export const dynamic = 'force-static'

export async function generateMetadata({
    params,
}: PostSlugPageProps): Promise<Metadata> {
    const { slug } = await params

    const post = await findPostBySlugCached(slug)
    return {
        title: post.title,
        description: post.excerpt,
    }
}

{
    /*
  Se quiser gerar todas as páginas estaticamente em build html,
  descomente a função abaixo.

  export async function generateStaticParams() {
    const posts = await findAllPublicPostsCached()

    return posts.map((post) => ({
        slug: post.slug,
    }))
}*/
}

export default async function PostSlugPage({ params }: PostSlugPageProps) {
    const { slug } = await params

    return (
        <Suspense fallback={<SpinLoader className='min-h-20 mb-16' />}>
            <SinglePost slug={slug} />
        </Suspense>
    )
}
