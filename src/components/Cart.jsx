import React, { useEffect, useState } from 'react'
import Layout from './ecomLayout'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

  const [cartData, setcartData] = useState([])
  const [load, setload] = useState(false)
  const navigate = useNavigate()

  const Cart = async () => {
    const data = JSON.parse(localStorage.getItem('shopsphere'));
    const id = data._id
    try {
      const res = await axios.get(`https://ecomnode.vercel.app/carts/${id}`)

      setcartData(res.data)

    } catch (error) {
      new Swal({
        icon: 'error',
        title: 'Error occurs',
        text: error
      })
    }
  }

  useEffect(() => {
    Cart()
  }, [load])

  const Delete = async (item) => {
    try {
      const res = await axios.delete(`https://ecomnode.vercel.app/carts/${item._id}`)
      setload(!load);

      if (res.data.status) {
        Swal.fire({
          icon: 'success',
          title: 'Product removed.',
          text: 'product successfully deleted from cart.'
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Product not removed.',
          text: 'product not deleted from cart.'
        })
      }

    } catch (error) {
      new Swal({
        icon: 'error',
        title: 'Error occurs',
        text: error
      })
    }
  }

  const total = () => {
    return cartData.reduce((acc, item) => acc + Number(item.price), 0)
  }

  const Order = async (item) => {
    try {
      const res = await axios.post('https://ecomnode.vercel.app/orders',
        {
          categorie: item.categorie,
          color: item.color,
          price: item.price,
          img: item.img,
          name: item.name,
          userid: item.userid,
          email: item.email,
          role: item.role,
          username: item.username,
          address: item.address
        }
      )
      if (!res.data.data.acknowledged) {
        Swal.fire({
          icon: 'error',
          title: 'Product not order !',
          text: 'Product not order ? Pls try again !',
          timer: 3000
        })
      }
      
      if (res.data.data.acknowledged) {
        const res = await axios.delete(`https://ecomnode.vercel.app/carts/${item._id}`)
        window.location.reload()
      }

      Swal.fire({
        icon: 'success',
        title: 'Product order !',
        text: 'Product was order they will be dispatch soon !',
        timer: 3000
      })

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout>
      <p className='text-xl text-center font-semibold p-3'>Your's cart</p>

      <div className='sm:w-9/12 w-11/12 mx-auto space-y-5 bg-slate-100 p-2 rounded-lg mb-5 grid sm:grid-cols-2 grid-cols-1 gap-2'>
        <div className='space-y-3'>
          {cartData.length ?
            cartData.map((item, ind) => {
              return (
                <div key={ind} className='flex gap-2 items-center'>
                  <img className='h-28' src={item.img} alt='...' />

                  <div className='space-y-1'>
                    <p className='capitalize font-medium'>{item.name}</p>
                    <p className='text-sm'>color: <span className='font-medium'>{item.color}</span></p>
                    <p className='text-sm'>price: <span className='font-medium'>₹ {item.price}</span></p>
                    <button onClick={() => Delete(item)} className='bg-red-400 hover:bg-red-600 text-sm text-white py-1 px-2 rounded'><i className="ri-delete-bin-line"></i> Delete</button>
                    <button onClick={() => Order(item)} className='bg-green-400 hover:bg-green-600 text-sm text-white py-1 px-2 rounded ml-1'><i className="ri-shape-line"></i> Order</button>
                  </div>

                  <div className=''></div>
                </div>
              )
            }) : <p className='font-semibold text-xl text-center p-5'>Empty cart !</p>
          }
        </div>

        <div className='flex flex-col gap-3'>
          <div className='bg-slate-200 p-2 rounded-lg space-y-3'>
            <div className='flex justify-between items-center'>
              <p className='text-lg font-medium'>Subtotal</p>
              <p className='text-lg font-medium'>₹ {total()}</p>
            </div>

            <div className='flex justify-between items-center'>
              <p className='text-sm font-medium'>Shipping</p>
              <p className='text-sm text-slate-600'>free delivery</p>
            </div>

            <div className='flex justify-between items-center'>
              <p className='text-sm font-medium'>Included taxes</p>
              <p className='text-sm'>₹ {`${cartData.length ? '22' : '0'}`}</p>
            </div>

            <div className='flex justify-between items-center'>
              <p className='text-lg font-medium'>Total(tax incl.)</p>
              <p className='text-lg font-medium'>₹ {`${cartData.length ? total()+22 : '0'}`}</p>
            </div>

            <p className='text-center font-medium underline cursor-pointer'>Have a promo code?</p>

          </div>

          <button onClick={() => navigate('/')} className='border border-slate-400 border-2 rounded-lg p-2 hover:bg-slate-600 hover:text-white'>CONTINUE SHOPPING</button>
        </div>
      </div>

    </Layout>
  )
}

export default Cart
