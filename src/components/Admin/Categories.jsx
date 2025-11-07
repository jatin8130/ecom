import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import axios from 'axios'
import swal from 'sweetalert2'

const Categories = () => {

    const [Cate, setCate] = useState([])
    const [cateinput, setcateinput] = useState('')
    const [ui, setui] = useState(false)

    const categorie = async () => {
        try {
            let res = await axios.get('https://ecomnode.vercel.app/categories')
            setCate(res.data)
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        categorie()
    }, [ui])

    const handlechange = (e) => {
        setcateinput(e.target.value)
    }

    const Addcategorie = async () => {
        if (cateinput !== '') {
            try {
                let res = await axios.post('https://ecomnode.vercel.app/categories', { cate: cateinput })
                if (res.data.status) {
                    setui(!ui)
                    swal.fire({
                        icon: 'success',
                        title: 'Categorie add',
                        text: 'New categorie add successfully !',
                        timer: 3000
                    })
                }
            } catch (error) {
                swal.fire({
                    icon: 'warning',
                    title: 'Something wrong!',
                    text: error
                })
            } finally {
                setcateinput('')
            }
        } else {
            swal.fire({
                icon: 'warning',
                title: 'Categorie empty !',
                text: "Pls write something on categorie input don't leave empty"
            })
        }
    }

    const deletecate = async (id) => {
        try {
            let res = await axios.delete(`https://ecomnode.vercel.app/categories/${id}`)
            if (res.data.status) {
                setui(!ui)
                swal.fire({
                    icon: 'success',
                    title: 'Categorie deleted succefully!',
                    timer: 3000
                })
            } else {
                swal.fire({
                    icon: 'warning',
                    title: 'Something error categorie',
                    timer: 3000
                })
            }
        } catch (error) {
            swal.fire({
                icon: 'warning',
                title: 'Something wrong',
                text: error,
                timer: 3000
            })
        }
    }

    return (
        <div>
            <Layout>
                <div className='sm:ml-48 ml-10 p-5 space-y-7'>
                    <h1 className='text-lg font-semibold'>Categories</h1>

                    <div className='space-y-2'>
                        <p className='text-slate-500'>Create new category</p>
                        <input
                            onChange={handlechange}
                            value={cateinput}
                            autoComplete="off"
                            className='p-2 sm:w-[50%] w-[100%] shadow rounded-lg border border-2'
                            type='text'
                            placeholder='Category name' />
                    </div>

                    <button onClick={Addcategorie} className='bg-blue-500 text-white py-1 px-4 rounded-lg text-lg'>Save</button>

                    <div className='space-y-2'>
                        <p className='font-medium'>CATEGORY NAME</p>
                        {
                            !Cate.length ?
                                <div className='flex items-center justify-center w-full pt-10'>
                                    <img src='/images/loader.gif' alt='...' />
                                </div>
                                :
                                <div className='space-y-1 bg-gray-100 px-4 py-2 rounded-lg'>
                                    {
                                        Cate.map((item, ind) => {
                                            return (
                                                <div key={ind} className='grid grid-cols-2'>
                                                    <h1 className='font-semibold capitalize'>{item.cate}</h1>
                                                    <button onClick={() => deletecate(item._id)} className='rounded-lg w-fit bg-red-500 hover:bg-red-400 px-2 py-1 text-white font-medium'><i className="ri-delete-bin-line"></i> Delete</button>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                        }
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default Categories
