import React, { useState } from 'react'
import Layout from './ecomLayout'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'

const Signup = () => {

  const navigate = useNavigate()
  const [passShow, setpassShow] = useState({
    pass: true,
    confirm: true
  })
  const [infoForm, setinfoForm] = useState({
    name: '',
    email: '',
    pass: '',
    confirm: ''
  })

  const handle = (e) => {
    const {value, name} = e.target
    
    setinfoForm({
      ...infoForm,
      [name]: value
    })
  }
  
  const onsubmitform = async (e) => {
    e.preventDefault()
    if(infoForm.pass === infoForm.confirm){
      try {
        const res = await axios.post('https://ecomnode.vercel.app/users',
          {
            email: infoForm.email,
            pass: infoForm.pass,
            role: 'user'
          }
        )
        if (res.data.status) {
          const {role, _id} = res.data.data
          localStorage.setItem('shopsphere', JSON.stringify({role, _id}))

          Swal.fire({
            icon: 'success',
            text: 'User singup success',
            timer: 2000
          })
          
          navigate('/')
        } else if(!res.data.status){
          Swal.fire({
            icon: 'warning',
            title: 'User already exists',
            text: 'Pls login for access our website',
            timer: 2000
          })

          navigate('/login')
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'something wrong !',
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
    } else{
      Swal.fire({
        icon: 'error',
        title: 'Confirm password are not same',
        text: 'Password and confirm password both are diffrent ? Pls correct then move forward.',
        timer: 5000
      })
    }
  }

  return (
    <Layout>
      <div style={{backgroundColor: "#deedfbff"}}
        className='h-screen w-full flex items-center justify-center'
      >
        <div className='grid sm:grid-cols-2 grid-cols-1 items-center md:w-10/12 w-11/12 mx-auto h-fit gap-3 bg-slate-100 rounded-xl sm:py-12 py-6 px-6'>
          <img className='sm:block hidden w-full' src='/images/signup.svg' alt='signup' />

          <form className='flex flex-col gap-2' onSubmit={onsubmitform}>
            <div className='flex justify-between flex-wrap gap-1 sm:mb-8 mb-4 items-center cursor-default'>
              <h1 className='text-xl font-semibold'>Shop<span className='text-violet-700'>Sphere</span></h1>
              <p className='text-violet-700 font-semibold'>Access our ecommerce website for extra ordinary deals.</p>
            </div>

            <h1 className='sm:text-xl text-lg font-semibold mb-4 cursor-default'>Signup | <span className='text-violet-700'>Pls enter your credentials</span></h1>

            <input onChange={handle} value={infoForm.name} name='name' className='bg-zinc-300 p-3 rounded text-lg' type='text' placeholder='enter your name' required />
            <input onChange={handle} value={infoForm.email} name='email' className='bg-zinc-300 p-3 rounded text-lg' type='email' placeholder='enter your email' required />

            <div className='flex items-center relative'>
              <input onChange={handle} value={infoForm.pass} name='pass' className='bg-zinc-300 p-3 w-full text-lg' type={passShow.pass ? 'password' : 'text'} placeholder='password' required autoComplete='false' />
              {
                passShow.pass
                  ?
                  <i onClick={() => setpassShow({...passShow, pass: false})} className="ri-eye-line p-2 text-slate-700 text-lg absolute right-0"></i>
                  :
                  <i onClick={() => setpassShow({...passShow, pass: true})} className="ri-eye-off-line p-2 text-slate-700 text-lg absolute right-0"></i>
              }
            </div>

            <div className='flex items-center relative'>
              <input onChange={handle} value={infoForm.confirm} name='confirm' className='bg-zinc-300 p-3 w-full text-lg' type={passShow.confirm ? 'password' : 'text'} placeholder='confirm' required autoComplete='false' />
              {
                passShow.confirm
                  ?
                  <i onClick={() => setpassShow({...passShow, confirm: false})} className="ri-eye-line p-2 text-slate-700 text-lg absolute right-0"></i>
                  :
                  <i onClick={() => setpassShow({...passShow, confirm: true})} className="ri-eye-off-line p-2 text-slate-700 text-lg absolute right-0"></i>
              }
            </div>

            <p className='font-semibold my-2'>You already have account Pls ? <Link to='/login' className='text-blue-600'>Login</Link></p>

            <button className='bg-violet-500 hover:bg-violet-600 text-white text-lg font-medium py-2 px-4 rounded mt-1 w-fit'>Signup</button>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default Signup
