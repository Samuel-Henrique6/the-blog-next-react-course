import { formatDateTime, formatDistanceToNow } from '@/utils/format-datetime'
import { PostHeading } from '../PostHeading'

type PostSummaryProps = {
    postHeading: 'h1' | 'h2'
    postLink: string
    createdAt: string
    title: string
    excerpt: string
}

export function PostSummary({
    postHeading,
    postLink,
    createdAt,
    title,
    excerpt,
}: PostSummaryProps) {
    return (
        <div className='flex flex-col gap-4 md:justif y-center'>
            <time
                className='text-slate-600 text-sm/tight'
                dateTime={createdAt}
                title={formatDistanceToNow(createdAt)}
            >
                {formatDateTime(createdAt)}
            </time>
            <PostHeading url={postLink} as={postHeading}>
                {title}
            </PostHeading>
            <p>{excerpt}</p>
        </div>
    )
}
