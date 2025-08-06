import { ErrorMessage } from '@/components/ErrorMessage'
export default function NotFoundPage() {
    return (
        <ErrorMessage
            pageTitle='Página nao encontrada'
            contentTitle='404'
            content={
                'Erro 404 - A página que você procurou não foi encontrada.'
            }
        />
    )
}
