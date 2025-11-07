import React, { useState } from 'react'
import Layout from './ecomLayout'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
import { data } from 'autoprefixer'

const Login = () => {

  const navigate = useNavigate()
  const [passShow, setpassShow] = useState(true)
  const [infoform, setinfoform] = useState({
    email: '',
    pass: ''
  })

  const handle = (e) => {
    const {name, value} = e.target

    setinfoform({
      ...infoform,
      [name]: value
    })
  }

  const onsubmitform = async (e) => {
    e.preventDefault()    
      try {
        const res = await axios.post('https://ecomnode.vercel.app/users/login', infoform)
        if (res.data.status) {          
          const {role, _id} = res.data.data          
          localStorage.setItem('shopsphere', JSON.stringify({role, _id}))          

          Swal.fire({
            icon: 'success',
            title: 'User login success',
            timer: 2000
          })

          navigate('/')          
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Wrong login details',
            timer: 3000
          })
        }               
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'something wrong !',
          text: error,
          timer: 3000
        })
      }
  }

  return (
    <Layout>
      <div style={{backgroundColor: "#deedfbff"}}
        className='h-screen w-full flex items-center justify-center'
      >
        <div className='grid sm:grid-cols-2 grid-cols-1 items-center md:w-10/12 w-11/12 mx-auto h-fit gap-3 bg-slate-100 rounded-xl sm:py-12 py-6 sm:px-6 px-4'>
          <img className='sm:block hidden w-full' src='/images/login.svg' alt='login' />

          <form className='flex flex-col gap-2' onSubmit={onsubmitform}>
            <div className='flex justify-between flex-wrap gap-1 sm:mb-8 mb-4 items-center cursor-default'>
              <h1 className='text-xl font-semibold'>Shop<span className='text-violet-700'>Sphere</span></h1>
              <p className='text-violet-700 font-semibold'>Access our ecommerce website for extra ordinary deals.</p>
            </div>

            <h1 className='sm:text-xl text-lg font-semibold mb-4 cursor-default'>Login | <span className='text-violet-700'>Pls enter correct credentials</span></h1>
            <input onChange={handle} value={infoform.email} name='email' className='bg-zinc-300 p-3 rounded text-lg' type='email' placeholder='enter your email' required />

            <div className='flex items-center relative'>
              <input onChange={handle} value={infoform.pass} name='pass' className='bg-zinc-300 p-3 w-full text-lg' type={passShow ? 'password' : 'text'} placeholder='password' required autoComplete='false' />
              {
                passShow
                  ?
                  <i onClick={() => setpassShow(false)} className="ri-eye-line p-2 text-slate-700 text-lg absolute right-0"></i>
                  :
                  <i onClick={() => setpassShow(true)} className="ri-eye-off-line p-2 text-slate-700 text-lg absolute right-0"></i>
              }
            </div>

            <p className='font-semibold my-2'>You don't have account Pls ? <Link to='/signup' className='text-blue-700'>Signup</Link></p>

            <button className='bg-violet-500 hover:bg-violet-600 text-white text-lg font-medium py-2 px-4 rounded mt-1 w-fit'>Login</button>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default Login
