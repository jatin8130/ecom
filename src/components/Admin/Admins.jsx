import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import axios from 'axios'
import swal from 'sweetalert2'

const Admins = () => {

  const [Admins, setAdmins] = useState([])
  const [addAdmin, setaddAdmin] = useState({
    email: '',
    pass: '',
    role: 'admin'
  })
  const [uiupdate, setuiupdate] = useState(false)

  const admin = async () => {
    try {
      let res = await axios.get('https://ecomnode.vercel.app/users?role=admin')
      setAdmins(res.data)
    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    admin()
  }, [uiupdate])

  const handlechange = (e) => {
    const { name, value } = e.target

    setaddAdmin({
      ...addAdmin,
      [name]: value
    })
  }

  const Add = async () => {
    try {
      let res = await axios.post('https://ecomnode.vercel.app/users', addAdmin)
      if (res.data.status) {
        setuiupdate(!uiupdate)
        swal.fire({
          icon: 'success',
          text: 'Admin added successfully.',
          timer: 3000
        })
      }
    } catch (error) {
      swal.fire({
        icon: 'warning',
        title: 'something wrong !',
        timer: 3000
      })
    } finally {
      setaddAdmin({
        email: '',
        pass: ''
      })
    }
  }

  const deleted = async (id) => {
    try {
      let res = await axios.delete(`https://ecomnode.vercel.app/users/${id}`)
      if (res.data.status) {
        setuiupdate(!uiupdate)
        swal.fire({
          icon: 'success',
          text: 'Deleted successfully.',
          timer: 3000
        })
      } else {
        swal.fire({
          icon: 'warning',
          title: 'something wrong !',
          timer: 3000
        })
      }
    } catch (error) {
      swal.fire({
        icon: 'warning',
        title: 'something wrong !',
        text: error,
        timer: 3000
      })
    }
  }

  return (
    <div>
      <Layout>
        <div className='sm:ml-48 ml-10 p-5 flex flex-col gap-3'>
          <h1 className='text-[22px] font-semibold'>Admins</h1>

          <p className='text-sm font-semibold'>Add new admin</p>

          <input
            onChange={handlechange}
            value={addAdmin.email}
            name='email'
            className='sm:w-6/12 border border-2 shadow rounded-lg p-2'
            type='email'
            required
            autoComplete="off"
            placeholder='Google email' />

          <input
            onChange={handlechange}
            value={addAdmin.pass}
            name='pass'
            required
            autoComplete="off"
            className='sm:w-6/12 border border-2 shadow rounded-lg p-2'
            type='password'
            placeholder='Google password' />

          <button onClick={Add} className='border w-fit bg-blue-600 text-white p-2 rounded-lg'>+ Add admin</button>

          <h1 className='font-semibold text-lg'>Existing admins</h1>

          <p className='text-xs font-semibold'>ADMINS GOOGLE EMAIL</p>

          {
            !Admins.length ?
              <div className='flex items-center justify-center w-full mt-10'>
                <img src='/images/loader.gif' alt='...' />
              </div>
              :
              <div className='bg-slate-100 p-2 rounded-lg sm:mr-[10cm] space-y-1'>
                {
                  Admins.map((item, ind) => {
                    return (
                      <div key={ind} className='grid grid-cols-2' >
                        <p className='font-medium'>{item.email}</p>
                        <button onClick={() => deleted(item._id)} className='rounded-lg w-fit bg-red-500 hover:bg-red-400 px-2 py-1 text-white font-medium'><i className="ri-delete-bin-line"></i> Delete</button>
                      </div>
                    )
                  })
                }
              </div>
          }
        </div>
      </Layout >
    </div >
  )
}

export default Admins
