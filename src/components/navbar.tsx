'use client'
import React from 'react'
// import { Input } from './ui/input'
import { Button } from './ui/button'
import Image from 'next/image'
// import { Moon, Sun, User} from "lucide-react"
import Link from 'next/link'
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuTrigger
// } from "@/components/ui/dropdown-menu"
// import { buttonVariants } from './ui/button'

const Navbar = () => {
    return (
        <div className='max-w-[1280px] mx-auto'>
            <div className='flex items-center py-4 gap-10 justify-between'>
                <Link href='/'>
                    <Image src='/photos/cwLighting-light.png' width={100} height={40} alt='Logo Image' />
                </Link>
                <div className='space-x-3'>
                    <Button asChild>
                        <Link href='/'>Home</Link>
                    </Button>
                    <Button asChild>
                        <Link href='/portfolio'>Portfolio</Link>
                    </Button>
                    <Button asChild>
                        <Link href='/contact-me'>Contact</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Navbar