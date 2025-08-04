import clsx from 'clsx'
import { PostCoverImage } from '../PostCoverImage'
import { PostSummary } from '../PostSummary'
import { findAllPublicPosts } from '@/lib/post/queries'

export async function PostFeatured() {
    const posts = await findAllPublicPosts()
    const post = posts[0]
    const postLink = `/post/${post.slug}`
    return (
        <section
            className={clsx(
                'grid grid-cols-1 gap-8 mb-16 group',
                'md:grid-cols-2'
            )}
        >
            <PostCoverImage
                linkProps={{
                    href: postLink,
                }}
                imageProps={{
                    alt: post.title,
                    src: post.coverImageUrl,
                    width: 1200,
                    height: 720,
                    priority: true,
                }}
            />
            <PostSummary
                postLink={postLink}
                postHeading='h1'
                createdAt={post.createdAt}
                title={post.title}
                excerpt={post.excerpt}
            />
        </section>
    )
}
