import clsx from 'clsx'
import { Button } from '../Button'

type DialogProps = {
    isVisible?: boolean
    title: string
    content: React.ReactNode
    onConfirm: () => void
    onCancel: () => void
    disabled: boolean
}

export function Dialog({
    isVisible = false,
    title,
    content,
    onConfirm,
    onCancel,
    disabled,
}: DialogProps) {
    if (!isVisible) return null

    function handleCalcel() {
        if (disabled) {
            return
        }

        onCancel()
    }

    return (
        <div
            className={clsx(
                'fixed inset-0 w-screen h-screen bg-black/50 backdrop-blur-xs',
                'flex items-center justify-center',
                'z-50'
            )}
            onClick={handleCalcel}
        >
            <div
                className={clsx(
                    'max-w-2xl mx-6 bg-slate-100 rounded p-6',
                    'flex flex-col gap-6',
                    'shadow-lg shadow-black/30 text-center'
                )}
                role='dialog'
                aria-modal='true'
                aria-labelledby='dialog-title'
                aria-describedby='dialog-description'
                onClick={(e) => e.stopPropagation()}
            >
                <h3 id='dialog-title' className='text-xl font-extrabold'>
                    {title}
                </h3>
                <div id='dialog-description'>{content}</div>
                <div className='flex items-center justify-around'>
                    <Button
                        variant='ghost'
                        autoFocus
                        onClick={handleCalcel}
                        disabled={disabled}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant='default'
                        onClick={onConfirm}
                        disabled={disabled}
                        className='disabled:cursor-wait'
                    >
                        Confirmar
                    </Button>
                </div>
            </div>
        </div>
    )
}
