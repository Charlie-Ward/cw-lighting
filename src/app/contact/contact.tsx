//contact.tsx
//Copyright (C) 2025  Charlie Ward GPL v3
//Full License @ https://github.com/Charlie-Ward/cw-lighting/blob/main/LICENSE

'use client'

import React from 'react'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { sendEmail } from '@/utils/send-emails'

export type FormData = {
    name: string;
    email: string;
    message: string;
};

const Contact: FC = () => {
  const { register, handleSubmit } = useForm<FormData>();
  
  function onSubmit(data: FormData) {
    sendEmail(data);
  }
  
  return (
    <div className='h-screen w-full bg-black flex items-center justify-center'>
      <div className='bg-gray-800 p-8 rounded-lg shadow-lg'>
        <h1 className='text-white text-4xl font-bold mb-4'>Get In Touch</h1>
        <p className="mb-8 text-gray-300">Have a project in mind? Let's discuss how I can help you bring it to life.</p>
        <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor='name'className='block text-sm font-medium text-gray-300'>Full Name</label>
            <input type='text' placeholder='Name' className='mt-1 block w-full rounded-md border-black bg-gray-600 text-white placeholder:text-white shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' {...register('name', { required: true })} />
          </div>
          <div>
            <label htmlFor='email' className='block text-sm font-medium text-gray-300'>Email</label>
            <input type='email' placeholder='example@domain.com' className='mt-1 block w-full rounded-md border-black bg-gray-600 text-white placeholder:text-white shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' {...register('email', { required: true })} />
          </div>
          <div>
            <label htmlFor='message' className='block text-sm font-medium text-gray-300'>Your Message</label>
            <textarea rows={4} placeholder='Type your message' className='mt-1 block w-full rounded-md border-black bg-gray-600 text-white placeholder:text-white shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' {...register('message', { required: true })}></textarea>
          </div>
          <button className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>Send Message</button>
        </form>
      </div> 
    </div>
  );
};

export default Contact