//contact.tsx
//Copyright (C) 2025  Charlie Ward GPL v3
//Full License @ https://github.com/Charlie-Ward/cw-lighting/blob/main/LICENSE

'use client'

import React from 'react'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { sendEmail } from '@/utils/send-emails'
import Image from 'next/image'

export type FormData = {
    name: string;
    email: string;
    phone: string;
    message: string;
};

const Contact: FC = () => {
  const { register, handleSubmit } = useForm<FormData>();
  
  function onSubmit(data: FormData) {
    sendEmail(data);
  }
  
  return (
    <div className='h-screen w-full bg-black flex items-center justify-center relative overflow-hidden'>
      {/* Background Image - positioned to cover height first */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/photos/home/contactMatilda.avif" // Replace with your image path
          alt="Background"
          fill
          className="object-cover"
          style={{ objectPosition: 'center' }}
          priority
        />
        {/* Add a dark overlay to improve form readability */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      
      {/* Contact Form - with higher z-index to appear above the background */}
      <div className='bg-gray-800 p-8 rounded-lg shadow-lg z-10 relative max-w-md w-full bg-opacity-90'>
        <h1 className='text-white text-4xl font-bold mb-4'>Get In Touch</h1>
        <p className="mb-8 text-gray-300">Have a project in mind? Let&apos;s discuss how I can help you bring it to life.</p>
        <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor='name'className='block text-sm font-medium text-gray-300'>Full Name <span className='text-red-600 font-bold'>*</span></label>
            <input type='text' className='mt-1 block w-full border-black bg-white text-black placeholder:text-white shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' {...register('name', { required: true })} />
          </div>
          <div>
            <label htmlFor='email' className='block text-sm font-medium text-gray-300'>Email <span className='text-red-600 font-bold'>*</span></label>
            <input type='email' className='mt-1 block w-full border-black bg-white text-black placeholder:text-white shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' {...register('email', { required: true })} />
          </div>
          <div>
            <label htmlFor='phone'className='block text-sm font-medium text-gray-300'>Phone Number <span className='text-red-600 font-bold'>*</span></label>
            <input type='text' className='mt-1 block w-full border-black bg-white text-black placeholder:text-white shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' {...register('phone', { required: true })} />
          </div>
          <div>
            <label htmlFor='message' className='block text-sm font-medium text-gray-300'>Your Message <span className='text-red-600 font-bold'>*</span></label>
            <textarea rows={4} className='mt-1 block w-full border-black bg-white text-black placeholder:text-white shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' {...register('message', { required: true })}></textarea>
          </div>
          <button className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>Send Message</button>
        </form>
        <div className='text-white mt-4'>
          Or alternatively you can send an email to charlie@cwlx.co.uk 
        </div> 
      </div>
    </div>
  );
};

export default Contact