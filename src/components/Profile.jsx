import React, { useState } from 'react'
import Layout from './ecomLayout'
import { useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

const Profile = () => {

  const [formdata, setformdata] = useState({
    email: '',
    role: '',
    username: '',
    address: '',
    gender: ''
  })
  const [userId, setUserId] = useState(null);

  const Onhandle = (e) => {
    const {value, name} = e.target

    setformdata({
      ...formdata,
      [name]: value
    })    
  }

  const Contact = async () => {
    const data = JSON.parse(localStorage.getItem('shopsphere'));
    const id = data._id
    try {
      const res = await axios.get(`https://ecomnode.vercel.app/users/email/${id}`)
      setformdata({
        ...formdata,
        email: res.data.email,
        role: res.data.role,
        username: res.data.username,
        gender: res.data.gender,
        address: res.data.address
      })      

    } catch (error) {
      console.log(error);

    }
  }  

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('shopsphere')); // Fetch userId from session storage
        if (data) {
            setUserId(data._id);
        }
    Contact()
  }, [])

  const Savedetail = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.patch(`https://ecomnode.vercel.app/users/email/${userId}`, 
        {
          username: formdata.username,
          address: formdata.address,
          gender: formdata.gender
        }
      )
      if(res.data.status){
        Swal.fire({
          icon: 'success',
          text: 'Updated!',
          title: 'User updated successfully !',
          timer: 2000
        })
      }     
      if(!res.data.status){
        Swal.fire({
          icon: 'error',
          text: 'Already updated!',
          title: 'User already updated successfully !',
          timer: 2000
        })
      }   

    } catch (error) {
      console.log(error);

    }
  }

  return (
    <Layout>
      <div>
        <form className='bg-slate-200 px-3 py-6 sm:w-6/12 w-11/12 mx-auto my-6 rounded-lg flex flex-col gap-3 relative' onSubmit={Savedetail}>
          <p className='absolute top-0 right-3 font-medium text-lg'>{formdata.role}<span className='text-violet-600'>/profile</span></p>
          <div className='flex flex-col items-center gap-1'>
            <img className='h-[3cm] w-auto rounded-full' src={`${formdata.gender === 'female' ? 'https://www.shareicon.net/data/512x512/2016/09/15/829452_user_512x512.png' : 'https://img.freepik.com/premium-vector/man-professional-business-casual-young-avatar-icon-illustration_1277826-635.jpg?w=740'}`} alt='...' />
            <p className='font-semibold text-xl capitalize'>hey's {(formdata.username || 'user')}</p>
          </div>
          <input onChange={Onhandle} name='username' className='p-2 rounded-lg' type='text' placeholder='enter user username' value={formdata.username} />
          <input onChange={Onhandle} name='email' className='p-2 rounded-lg' type='email' placeholder='enter your email' value={formdata.email} />
          
          <div className='space-x-2'>
            <input onChange={Onhandle} name='gender' value='male' checked={formdata.gender === 'male' && true} type='radio' /><label>Male</label>
            <input onChange={Onhandle} name='gender' value='female' checked={formdata.gender === 'female' && true} type='radio' /><label>Female</label>
          </div>

          <input onChange={Onhandle} name='address' className='p-2 rounded-lg' type='text' placeholder='enter your address' value={formdata.address} />

          <button className='bg-violet-500 text-white py-2 px-4 mt-3 rounded-lg hover:bg-violet-400'>Save</button>
        </form>
      </div>
    </Layout>
  )
}

export default Profile
