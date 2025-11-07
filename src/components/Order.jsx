import React, { useState, useEffect } from 'react'
import Layout from './ecomLayout'
import axios from 'axios'

const Order = () => {

    const [Orders, setOrders] = useState([])

    const order = async () => {
        const data = JSON.parse(localStorage.getItem('shopsphere'));
        const id = data._id
        try {
            let res = await axios.get(`https://ecomnode.vercel.app/orders/user/${id}`)
            setOrders(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        order()
    }, [])

    return (
        <Layout>
            <h1 className='font-semibold text-center text-xl pt-4 p-3'>Track your Order/Order's</h1>
            <div className='sm:w-8/12 w-11/12 mx-auto bg-slate-100 rounded-lg p-2 m-2 mb-8 space-y-2'>
                {
                    Orders.length ? Orders.map((item, ind) => {
                        return (
                            <div className='grid grid-cols-2 items-center' key={ind}>
                                <img className='w-auto h-24' src={item.img} alt='...' />
                                <div>
                                    <p className='font-semibold'>Status: <span className='text-violet-800'>{item.status || 'Recorded'}</span></p>
                                    <p className='font-semibold text-sm'>Shipping to: {item.address}</p>
                                    <p className='font-semibold text-sm'>Product: {item.name}</p>
                                    <p className='font-semibold text-sm'>Color: {item.color}</p>
                                    <p className='font-semibold text-sm'>Price: {item.price}</p>
                                </div>
                            </div>
                        )
                    }) : <p className='text-center font-semibold '>Order page are Empty | you not order anything.</p>
                }
            </div>
        </Layout>
    )
}

export default Order
