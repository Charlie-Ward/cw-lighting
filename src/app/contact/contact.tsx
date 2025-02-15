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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-5'>
          <label
            htmlFor='name'
            className='mb-3 block text-base font-medium text-black'
          >
            Full Name
          </label>
          <input
            type='text'
            placeholder='Full Name'
            className='w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md'
            {...register('name', { required: true })}
          />
        </div>
        <div className='mb-5'>
          <label
            htmlFor='email'
            className='mb-3 block text-base font-medium text-black'
          >
            Email Address
          </label>
          <input
            type='email'
            placeholder='example@domain.com'
            className='w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md'
            {...register('email', { required: true })}
          />
        </div>
        <div className='mb-5'>
          <label
            htmlFor='message'
            className='mb-3 block text-base font-medium text-black'
          >
            Message
          </label>
          <textarea
            rows={4}
            placeholder='Type your message'
            className='w-full resize-none rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md'
            {...register('message', { required: true })}
          ></textarea>
        </div>
        <div>
          <button className='hover:shadow-form rounded-md bg-purple-500 py-3 px-8 text-base font-semibold text-white outline-none'>
            Submit
          </button>
        </div>
      </form>
    );
  };

// const Contact = () => {
//   return (
//     <div className="h-screen w-full bg-black flex items-center justify-center">
//       <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
//         <h1 className="text-white text-4xl font-bold mb-4">Get In Touch</h1>
//         <p className="mb-8 text-gray-300">Have a project in mind? Let's discuss how I can help you bring it to life.</p>
//         <form className="space-y-4" action="mailto:charlie@cwlx.co.uk" method="post" encType="text/plain">
//           <div>
//             <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
//             <input type="text" name="name" id="name" className="mt-1 block w-full rounded-md border-black bg-gray-600 text-white placeholder:text-white shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Your name" required />
//           </div>
//           <div>
//             <label htmlFor="email" className="block text-sm font    -medium text-gray-300">Email</label>
//             <input type="email" name="email" id="email" className="mt-1 block w-full rounded-md border-black bg-gray-600 text-white placeholder:text-white shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Your email" required />
//           </div>
//           <div>
//             <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
//             <textarea id="message" name="message" rows={3} className="mt-1 block w-full rounded-md border-black bg-gray-600 text-white placeholder:text-white shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Your message" required></textarea>
//           </div>
//           <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Send</button>
//         </form>
//       </div>
//     </div>
//   )
// }

export default Contact