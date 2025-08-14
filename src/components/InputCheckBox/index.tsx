import clsx from 'clsx'
import { useId } from 'react'

type InputCheckBoxProps = {
    labelText?: string
    type?: 'checkbox'
} & React.ComponentProps<'input'>

export function InputCheckBox({
    labelText = '',
    type = 'checkbox',
    ...props
}: InputCheckBoxProps) {
    const id = useId() // hook do react para gerar um id unico

    return (
        <div className='flex items-center gap-2'>
            <input
                {...props}
                className={clsx(
                    'w-4 h-4 outline-none',
                    'focus:ring-2 focus:ring-blue-600',
                    props.className
                )}
                type={type}
                id={id}
            />
            {labelText && (
                <label htmlFor={id} className='text-sm'>
                    {labelText}
                </label>
            )}
        </div>
    )
}
