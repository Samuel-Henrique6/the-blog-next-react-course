'use client'

import { ErrorMessage } from '@/components/ErrorMessage'
import React from 'react'

type RootErrorPageProps = {
    error: Error
    reset: () => void
}
export default function RootErrorPage({ error, reset }: RootErrorPageProps) {
    React.useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <ErrorMessage
            pageTitle='Internal Server Error'
            contentTitle='501'
            content={
                <>
                    <p>
                        Ocorreu um erro inesperado. Tente novamente mais tarde
                    </p>
                    <button
                        className='btn btn-primary cursor-pointer mt-4'
                        onClick={() => reset()}
                    >
                        Clique aqui para tentar novamente
                    </button>
                </>
            }
        />
    )
}
