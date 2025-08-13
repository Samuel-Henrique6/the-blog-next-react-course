import { Menu } from '@/components/Admin/Menu'

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <>
            <Menu />
            {children}
        </>
    )
}
