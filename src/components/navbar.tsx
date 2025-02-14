//navbar.tsx
//Copyright (C) 2025  Charlie Ward GPL v3
//Full License @ https://github.com/Charlie-Ward/cw-lighting/blob/main/LICENSE

'use client';
import React, { useState } from 'react';
import { Button } from './ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, SquareX } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='max-w-[1280px] mx-auto'>
            <div className='flex items-center justify-between py-4'>
                <Link href='/'>
                    <Image src='/photos/cwLighting-light.png' width={100} height={40} alt='Logo Image' />
                </Link>
                <div className='hidden md:flex space-x-3'>
                    <Button asChild>
                        <Link href='/'>Home</Link>
                    </Button>
                    <Button asChild>
                        <Link href='/portfolio'>Portfolio</Link>
                    </Button>
                    <Button asChild>
                        <Link href='/contact'>Contact</Link>
                    </Button>
                </div>
                <Button onClick={toggleMenu} className='md:hidden p-2'>
                    {isOpen ? (
                        <SquareX />
                    ) : (
                        <Menu />
                    )}
                </Button>
            </div>
            {isOpen && (
                <div className='md:hidden flex flex-col space-y-2 py-2'>
                    <Button asChild>
                        <Link href='/'>Home</Link>
                    </Button>
                    <Button asChild>
                        <Link href='/portfolio'>Portfolio</Link>
                    </Button>
                    <Button asChild>
                        <Link href='/contact'>Contact</Link>
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Navbar;