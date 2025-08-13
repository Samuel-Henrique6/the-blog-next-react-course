import type { Metadata } from 'next'
import './globals.css'
import { Container } from '@/components/Container'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
    title: {
        default: 'Blog - Curso React 19 e Next.js 15', // Default title for the home page
        template: '%s | The Blog', // Template for the title of other pages
    },
    description: 'Descrição do blog',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='pt-BR'>
            <body>
                <Container>
                    <Header />
                    {children}
                    <Footer />
                </Container>

                <ToastifyContainer />
            </body>
        </html>
    )
}
