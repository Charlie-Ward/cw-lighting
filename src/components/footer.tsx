//footer.tsx
//Copyright (C) 2025  Charlie Ward GPL v3
//Full License @ https://github.com/Charlie-Ward/cw-lighting/blob/main/LICENSE

import React from 'react'
import Link from 'next/link'

const Footer = () => {
    return (
        <footer className="">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <div className="sm:flex sm:items-center sm:justify-between">
                <span className="text-sm text-gray-400 sm:text-center dark:text-gray-400">&copy; {new Date().getFullYear()} Charlie Ward All rights reserved. License can be found <Link href="/license" className='text-decoration: underline text-blue-500'>here.</Link>
                </span>
                <div className="flex mt-4 sm:justify-center sm:mt-0">
                </div>
            </div>
            </div>
        </footer>
    )
}

export default Footer