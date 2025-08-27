import clsx from 'clsx'

type SpinLoaderProps = {
    className?: string
}

export default function SpinLoaderButton({ className = '' }: SpinLoaderProps) {
    return (
        <div
            className={clsx(
                'w-4 h-4',
                'border-2 border-t-transparent border-slate-900',
                'rounded-full',
                'animate-spin',
                className
            )}
        ></div>
    )
}
