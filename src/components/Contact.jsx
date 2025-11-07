import React from 'react'
import Layout from './ecomLayout'
import Swal from 'sweetalert2'

const Contact = () => {

  const Contact = (e) => {
    e.preventDefault()
    Swal.fire({
      icon: 'success',
      text: 'Your inquiry has registered !',
      timer: 2000
    })
    e.target.reset()
  }

  return (
    <Layout>

        <form onSubmit={Contact}
        style={{backgroundColor: '#353e3fff'}}
         className='flex flex-col lg:w-6/12 w-11/12 mx-auto py-6 px-4 my-6 h-fit rounded-xl text-white'
         >
          <h1 className='text-xl font-semibold text-center'>Contact Us</h1>
          <p className='font-semibold text-center mb-6'>Any inquiry ? Pls fill the form</p>

          <label className='font-semibold font-serif'>Your name</label>
          <input className='p-2 rounded-lg mb-4 mt-1 text-black' type='text' placeholder='enter your name' required />

          <label className='font-semibold font-serif'>Your email</label>
          <input className='p-2 rounded-lg mb-4 mt-1 text-black' type='email' placeholder='enter your email' required />

          <label className='font-semibold font-serif'>Your inquiry/message</label>
          <textarea className='p-2 rounded-lg mb-4 mt-1 text-black' rows={4} required ></textarea>

          <button className='bg-violet-800 hover:bg-violet-700 text-white p-2 rounded-lg w-full mt-5'>Submit</button>
        </form>

    </Layout>
  )
}

export default Contact
