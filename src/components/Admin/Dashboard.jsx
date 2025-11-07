import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import axios from 'axios'

const Dashboard = () => {

  const [admin, setadmin] = useState(0)
  const [user, setuser] = useState(0)
  const [order, setorder] = useState(0)
  const [revenue, setrevenue] = useState({
    sell: 0,
    margin: 0,
    invest: 0
  })

  const admins = async () => {
    try {
      let res = await axios.get('https://ecomnode.vercel.app/users?role=admin')
      setadmin(res.data.length)
    } catch (error) {
      console.log(error);
    }
  }

  const users = async () => {
    try {
      let res = await axios.get('https://ecomnode.vercel.app/users?role=user')
      setuser(res.data.length)

    } catch (error) {
      console.log(error);
    }
  }

  const orders = async () => {
    try {
      let res = await axios.get('https://ecomnode.vercel.app/orders')
      setorder(res.data)

    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    admins()
    users()
    orders()
  }, [])

  useEffect(() => {
    if (order.length) {
      const sells = order.reduce((acc, item) => { return acc + parseInt(item.price) }, 0)
      setrevenue({
        ...revenue,
        sell: sells
      })
    }
  }, [order])

  if (admin === 0 && user === 0 && order === 0)
    return (
      <Layout>
        <div className='flex justify-center mt-44'>
          <img src='/images/loader.gif' alt='...' />
        </div>
      </Layout>
    )

  return (
    <div>
      <Layout>
        <div className='sm:ml-48 ml-10 sm:p-10 p-5'>

          <div>
            <h1 className='font-semibold text-2xl mb-5'>Basic-details</h1>

            <div className='flex gap-4 flex-wrap'>
              <div className='space-y-1 sm:w-36 w-44 bg-[#F5F5F5] shadow-lg rounded text-center p-3'>
                <p className='font-semibold'>Admins</p>
                <p className='font-semibold text-3xl text-[#000080]'>{admin}</p>
                <p className='text-sm text-[12px]'>Total Admins {admin}</p>
              </div>

              <div className='space-y-1 sm:w-36 w-44 bg-[#F5F5F5] shadow-lg rounded text-center p-3'>
                <p className='font-semibold'>Users</p>
                <p className='font-semibold text-3xl text-[#000080]'>{user}</p>
                <p className='text-sm text-[12px]'>Total Users {user}</p>
              </div>

              <div className='space-y-1 sm:w-36 w-44 bg-[#F5F5F5] shadow-lg rounded text-center p-3'>
                <p className='font-semibold'>Orders</p>
                <p className='font-semibold text-3xl text-[#000080]'>{order.length || order}</p>
                <p className='text-sm text-[12px]'>Total Orders {order.length || order}</p>
              </div>
            </div>
          </div>

          <div>
            <h1 className='font-semibold text-2xl my-5'>Revenue</h1>

            <div className='flex gap-4 flex-wrap'>
              <div className='space-y-1 sm:w-36 w-44 bg-[#F5F5F5] shadow-lg rounded text-center p-3'>
                <p className='font-semibold'>Sells</p>
                <p className='font-semibold text-3xl text-[#000080]'>₹ {revenue.sell.toLocaleString()}</p>
                <p className='text-sm text-[12px]'>Total sells ₹ {revenue.sell.toLocaleString()}</p>
              </div>

              <div className='space-y-1 sm:w-36 w-44 bg-[#F5F5F5] shadow-lg rounded text-center p-3'>
                <p className='font-semibold'>Margins</p>
                <p className='font-semibold text-3xl text-[#000080]'>₹ {(revenue.sell - (revenue.sell * 32) / 100).toLocaleString() || revenue.margin}</p>
                <p className='text-sm text-[12px]'>Total margin ₹ {(revenue.sell - (revenue.sell * 32) / 100).toLocaleString() || revenue.margin}</p>
              </div>

              <div className='space-y-1 sm:w-36 w-44 bg-[#F5F5F5] shadow-lg rounded text-center p-3'>
                <p className='font-semibold'>Investments</p>
                <p className='font-semibold text-3xl text-[#000080]'>₹ {parseInt(revenue.sell + (revenue.sell - (revenue.sell * 32) / 100)).toLocaleString() || revenue.invest}</p>
                <p className='text-sm text-[12px]'>Total invest ₹ {parseInt(revenue.sell + (revenue.sell - (revenue.sell * 32) / 100)).toLocaleString() || revenue.invest}</p>
              </div>
            </div>
          </div>

        </div>
      </Layout >
    </div >
  )
}

export default Dashboard
