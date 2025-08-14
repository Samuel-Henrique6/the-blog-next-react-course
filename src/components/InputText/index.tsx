import clsx from 'clsx'
import { useId } from 'react'

type InputTextProps = {
    labelText?: string
    type?: 'text' | 'password'
} & React.ComponentProps<'input'>

export function InputText({
    labelText = '',
    type = 'text',
    ...props
}: InputTextProps) {
    const id = useId() // hook do react para gerar um id unico

    return (
        <div className='flex flex-col gap-1'>
            {labelText && (
                <label htmlFor={id} className='text-sm'>
                    {labelText}
                </label>
            )}
            <input
                {...props}
                className={clsx(
                    'bg-white outline-0 text-base/tight',
                    'ring-2 ring-slate-400 rounded',
                    'p-2 transition focus:ring-blue-600',
                    'placeholder:text-slate-300',
                    'disabled:bg-slate-200 disabled:text-slate-400',
                    'disabled:placeholder:text-slate-300',
                    'read-only:bg-slate-100',
                    props.className
                )}
                type={type}
                id={id}
            />
        </div>
    )
}
