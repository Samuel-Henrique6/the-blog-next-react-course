import clsx from 'clsx'
import { PostCoverImage } from '../PostCoverImage'
import { PostSummary } from '../PostSummary'

export function PostFeatured() {
    const slug = 'lorem-ipsum'
    const postLink = `/post/${slug}`
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
                    alt: 'Cover Image',
                    src: '/images/bryen_0.png',
                    width: 1200,
                    height: 720,
                    priority: true,
                }}
            />
            <PostSummary
                postLink={postLink}
                postHeading='h1'
                createdAt='2025-08-01T10:00:00Z'
                title='Lorem ipsum, dolor sit amet consectetur'
                excerpt='Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias blanditiis vel dolorum ab nulla nemo beatae laboriosam harum? Error alias ullam a nemo, quod ducimus soluta aliquid quos fugit magnam! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias blanditiis vel dolorum ab nulla nemo beatae laboriosam harum?'
            />
        </section>
    )
}
