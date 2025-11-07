import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import axios from 'axios'
import swal from 'sweetalert2'

const Orders = () => {

  const [Orders, setOrders] = useState([])
  const [ui, setui] = useState(false)

  const order = async () => {
    try {
      let res = await axios.get('https://ecomnode.vercel.app/orders')
      setOrders(res.data)
    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    order()
  }, [ui])

  const deleted = async (id) => {
    try {
      let res = await axios.delete(`https://ecomnode.vercel.app/orders/${id}`)
      if(res.data.status) {
        setui(!ui)
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

  if (!Orders.length)
    return (
      <Layout>
        <div className='flex justify-center mt-44'>
          <img src='/images/loader.gif' alt='...' />
        </div>
      </Layout>
    )

    const Onhandle = async (e, id) => {
      try {        
        const res = await axios.patch(`https://ecomnode.vercel.app/orders/${id}`,
          {
            status: e.target.value
          }
        )        
        if (res.data.status) {
          swal.fire({
            icon:'success',
            title: 'status updated.',
            text: 'product status updated.',
            timer: 2000
          })  
          
          setui(!ui)
        }
  
      } catch (error) {
        console.log(error);
      }
    }

  return (
    <div>
      <Layout>
        <div className='sm:ml-48 ml-10 sm:p-5 p-2 space-y-2'>
          <h1 className='font-semibold text-lg'>Orders</h1>

          <div className='overflow-x-auto'>
            <table className='w-[100%]'>
              <thead>
                <tr className='bg-gray-200'>
                  <th className='py-2 px-4'>Customer's name</th>
                  <th>Products</th>
                  <th>Address's</th>
                  <th>Status</th>
                  <th>Delete</th>
                </tr>
              </thead>

              <tbody>
                {
                  Orders.map((item, ind) => {
                    return (
                      <tr key={ind} className='bg-white even:bg-gray-100 text-center capitalize font-medium'>
                        <td className='p-2'>{item.username || 'No user name'}</td>
                        <td className='flex gap-1 items-center'>
                          <img className='h-[1.5cm] w-[1.5cm] object-cover rounded-lg' src={item.img} alt='...' />
                          <p>{item.name}</p>
                        </td>
                        <td>{item.address || 'no user address'}</td>
                        <td>
                          <select onChange={(e) => Onhandle(e, item._id)} value={item.status || 'Recorded'} className='bg-transparent'>
                            <option value="Recorded">Recorded</option>
                            <option value="Dispatch">Dispatch</option>
                            <option value="Picked up">Picked up</option>
                            <option value="Deliver">Deliver</option>
                          </select>
                        </td>
                        <td>
                          <div onClick={() => deleted(item._id)} className='bg-rose-500 text-white flex p-1 rounded-lg gap-1'>
                            <i className="ri-delete-bin-line"></i>
                            <button>Delete</button>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default Orders
