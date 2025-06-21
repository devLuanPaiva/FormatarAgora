'use client'

import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { AiFillThunderbolt } from 'react-icons/ai'
import { MdOutlineFileCopy } from 'react-icons/md'
import { RiSettings4Fill } from 'react-icons/ri'
import { Tooltip, IconButton } from '@mui/material'

export function Header() {
    return (
        <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full px-4 sm:px-8 py-4 bg-gradient-to-r from-zinc-100 via-white to-zinc-200 shadow-sm flex justify-between items-center z-50 relative"
        >
            <Link href="/" className="flex items-center gap-2 group">
                <Image
                    src="/logo.png"
                    alt="Formatar Agora"
                    width={40}
                    height={40}
                    className="h-16 w-auto transition-transform duration-300 group-hover:rotate-6"
                />
                <motion.span
                    className="text-xl font-bold text-zinc-800 tracking-tight"
                    whileHover={{ scale: 1.05 }}
                >
                    Formatar <br /><span className="text-purple-800">Agora</span>
                </motion.span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
                <Link
                    href="/conversor"
                    className={cn(
                        'text-zinc-600 hover:text-purple-800 transition-colors font-medium text-sm'
                    )}
                >
                    Conversor
                </Link>
                <Link
                    href="/formatos"
                    className={cn(
                        'text-zinc-600 hover:text-purple-800 transition-colors font-medium text-sm'
                    )}
                >
                    Formatos
                </Link>
                <Link
                    href="/sobre"
                    className={cn(
                        'text-zinc-600 hover:text-purple-800 transition-colors font-medium text-sm'
                    )}
                >
                    Sobre
                </Link>
            </nav>

            <div className="flex items-center gap-2">
                <Tooltip title="Modo Turbo">
                    <IconButton color="primary">
                        <AiFillThunderbolt className="text-xl text-purple-800" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Histórico de Arquivos">
                    <IconButton>
                        <MdOutlineFileCopy className="text-xl text-zinc-600" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Configurações">
                    <IconButton>
                        <RiSettings4Fill className="text-xl text-zinc-600" />
                    </IconButton>
                </Tooltip>
            </div>
        </motion.header>
    )
}
