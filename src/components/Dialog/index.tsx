import clsx from 'clsx'

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
                    <button
                        className={clsx(
                            'bg-slate-300 hover:bg-slate-400 transition text-slate-950',
                            'flex items-center justify-center',
                            'py-2 px-4 rounded cursor-pointer'
                        )}
                        autoFocus
                        onClick={handleCalcel}
                        disabled={disabled}
                    >
                        Cancelar
                    </button>
                    <button
                        className={clsx(
                            'bg-blue-500 hover:bg-blue-600 transition text-blue-50',
                            'flex items-center justify-center',
                            'py-2 px-4 rounded cursor-pointer',
                            'disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-wait'
                        )}
                        onClick={onConfirm}
                        disabled={disabled}
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    )
}
