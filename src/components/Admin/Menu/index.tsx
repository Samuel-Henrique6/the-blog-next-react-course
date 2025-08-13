'use client'

import clsx from 'clsx'
import {
    CircleXIcon,
    FileTextIcon,
    HouseIcon,
    MenuIcon,
    PlusIcon,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export function Menu() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname() // hook do next que retorna o caminho da url

    useEffect(() => {
        setIsOpen(false)
    }, [pathname])

    const navClasses = clsx(
        'bg-slate-900 text-slate-100 rounded-lg',
        'flex flex-col gap-2 mb-8',
        'sm:flex-row sm:flex-wrap',
        !isOpen && 'overflow-hidden',
        !isOpen && 'h-10',
        'sm:overflow-visible sm:h-auto'
    )
    const linkClasses = clsx(
        '[&>svg]:w-[16px] [&>svg]:h-[16px] px-4',
        'flex items-center gap-2 rounded-lg cursor-pointer',
        'transition hover:bg-slate-800',
        'h-10',
        'shrink-0'
    )
    const openCloseBtnClasses = clsx(
        linkClasses,
        'text-blue-200 italic',
        'sm:hidden'
    )

    return (
        <nav className={navClasses}>
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className={openCloseBtnClasses}
            >
                {!isOpen ? (
                    <>
                        <MenuIcon />
                        Menu
                    </>
                ) : (
                    <>
                        <CircleXIcon />
                        Fechar
                    </>
                )}
            </button>
            <a className={linkClasses} href='/' target='_blank'>
                <HouseIcon />
                Home
            </a>

            <Link className={linkClasses} href='/admin/post'>
                <FileTextIcon />
                Posts
            </Link>

            <Link className={linkClasses} href='/admin/post/new'>
                <PlusIcon />
                Criar post
            </Link>
        </nav>
    )
}
