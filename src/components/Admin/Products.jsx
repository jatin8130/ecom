import React, { useEffect, useState } from 'react'
import swal from 'sweetalert2'
import Layout from './Layout'
import axios from 'axios'

const Products = () => {

  const models = {
    name: '',
    price: '',
    color: '',
    img: '',
    categorie: '',
    discount: ''
  }

  const [Product, setProduct] = useState([]);
  const [Categorie, setCategorie] = useState([])
  const [productpopup, setproductpopup] = useState(false);
  const [update, setupdate] = useState(false)
  const [Addproduct, setAddproduct] = useState(models)
  const [saveadd, setsaveadd] = useState(true)
  const [id, setid] = useState('');

  const Fetch = async () => {
    try {
      let res = await axios.get('https://ecomnode.vercel.app/products');
      setProduct(res.data);

    } catch (error) {
      console.log(error);

    }
  }

  const Cate = async () => {
    try {
      let res = await axios.get('https://ecomnode.vercel.app/categories');
      setCategorie(res.data);

    } catch (error) {
      swal.fire({
        icon: 'warning',
        title: 'Something wrong!',
        text: error
      })
    }
  }

  useEffect(() => {
    Fetch();
    Cate();
  }, [update])

  const onchanged = (e) => {
    const { name, value } = e.target

    setAddproduct({
      ...Addproduct,
      [name]: value
    })
  }

  const Add = async (e) => {
    e.preventDefault()
    console.log(Addproduct);

    try {
      let res = await axios.post('https://ecomnode.vercel.app/products', Addproduct);
      if (res.data) {
        setproductpopup(!productpopup)
        swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Product added successfully!'
        })
        setupdate(!update);
        setAddproduct(models)
      } else {
        setproductpopup(!productpopup)
        setAddproduct(models)
        swal.fire({
          icon: 'warning',
          title: 'Something wrong!',
          text: 'Something wrong, product not added!'
        })
      }

    } catch (error) {
      swal.fire({
        icon: 'warning',
        title: 'Something wrong!',
        text: error
      })
    }
  }

  const deleted = async (id) => {
    try {
      let res = await axios.delete(`https://ecomnode.vercel.app/products/${id}`)
      if (res.data.status) {
        setupdate(!update);
        swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Product added successfully!'
        })
      } else {
        swal.fire({
          icon: 'warning',
          title: 'Something wrong!',
          text: 'Something wrong!!'
        })
      }
    } catch (error) {
      swal.fire({
        icon: 'warning',
        title: 'Something wrong!',
        text: error
      })
    }
  }

  const updated = async (id) => {
    setsaveadd(false)
    try {
      let res = await axios.get(`https://ecomnode.vercel.app/products/${id}`)
      if (res.data) {
        setproductpopup(!productpopup);
        setid(res.data._id);
        setAddproduct({
          ...Addproduct,
          name: res.data.name,
          categorie: res.data.categorie,
          price: res.data.price,
          color: res.data.color,
          discount: res.data.discount,
          img: res.data.img
        })
      } else {
        setproductpopup(!productpopup)
        swal.fire({
          icon: 'warning',
          title: 'Something wrong!',
          text: 'Something wrong!!'
        })
      }
    } catch (error) {
      swal.fire({
        icon: 'warning',
        title: 'Something wrong!',
        text: error
      })
    }
  }

  const Save = async (e) => {
    e.preventDefault()
    try {
      let res = await axios.put(`https://ecomnode.vercel.app/products/${id}`, Addproduct)
      if (res.data.status) {
        setupdate(!update);
        setproductpopup(!productpopup)
        swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Product updated successfully!'
        })

      } else {
        setproductpopup(!productpopup)
        swal.fire({
          icon: 'warning',
          title: 'Something wrong!',
          text: 'Something wrong!!'
        })
      }
    }
    catch (error) {
      swal.fire({
        icon: 'warning',
        title: 'Something wrong!',
        text: error
      })
    } finally {
      setsaveadd(true)
      setid('');
    }
  }

  return (
    <div>
      <Layout>
        <div className='sm:ml-48 ml-7 p-5 pr-2'>

          <dialog open={productpopup} className='fixed sm:w-5/12 w-[95%] h-fit rounded-lg shadow-lg p-5 bg-slate-50'>
            <div className='flex justify-between'>
              <h1 className='text-lg font-semibold mb-2'>{saveadd ? 'Add new product' : 'Save product'}</h1>
              <i onClick={() => setproductpopup(!productpopup)} className="ri-close-large-line font-semibold text-lg"></i>
            </div>
            <form className='flex flex-col sm:gap-2 gap-1' onSubmit={(e) => { saveadd ? Add(e) : Save(e) }}>
              <label className='font-semibold'>Name</label>
              <input
                onChange={onchanged}
                name='name'
                value={Addproduct.name || ''}
                className='bg-slate-100 p-2 rounded-lg'
                type='text'
                required
                autoComplete="off"
                placeholder='Enter product name' />


              <label className='font-semibold'>categorie</label>
              <select
                onChange={onchanged}
                name='categorie'
                value={Addproduct.categorie || ''}
                required
                autoComplete="off"
                className='bg-slate-100 p-2 rounded-lg'>
                <option></option>
                {
                  Categorie.map((item) => (
                    <option key={item._id}> {item.cate} </option>
                  ))
                }
              </select>

              <label className='font-semibold'>Price</label>
              <input
                onChange={onchanged}
                name='price'
                value={Addproduct.price || ''}
                className='bg-slate-100 p-2 rounded-lg'
                type='number'
                required
                autoComplete="off"
                placeholder='Enter product price' />

              <label className='font-semibold'>Color</label>
              <input
                onChange={onchanged}
                name='color'
                value={Addproduct.color || ''}
                className='bg-slate-100 p-2 rounded-lg'
                type='text'
                required
                autoComplete="off"
                placeholder='Enter product color' />

              <label className='font-semibold'>Discount</label>
              <input
                onChange={onchanged}
                name='discount'
                value={Addproduct.discount || ''}
                className='bg-slate-100 p-2 rounded-lg'
                type='number'
                autoComplete="off"
                placeholder='Enter product discount if you want!' />

              <label className='font-semibold'>Image</label>
              <input
                onChange={onchanged}
                name='img'
                value={Addproduct.img || ''}
                className='bg-slate-100 p-2 rounded-lg'
                type='text'
                required
                autoComplete="off"
                placeholder='Enter product img link' />

              <button className='bg-blue-500 hover:bg-blue-400 text-white p-2 rounded-lg mt-4 font-semibold'>{saveadd ? 'Add product' : 'Save product'}</button>
            </form>
          </dialog>

          <h1 onClick={() => setproductpopup(!productpopup)} className='text-white bg-blue-600 w-fit py-2 px-3 text-sm rounded-lg hover:bg-blue-500 cursor-pointer'>+ Add new product</h1>

          <h1 className='font-semibold my-4'>PRODUCTS</h1>

          <div className='flex flex-wrap sm:gap-5 gap-3'>
            {
              !Product.length ?
                <div className='flex items-center justify-center w-full mt-10'>
                  <img src='/images/loader.gif' alt='...' />
                </div>
                :
                Product.map((item, ind) => {
                  return (
                    <div key={ind} className='sm:w-[5.5cm] w-[3.3cm] bg-white shadow-lg flex flex-col justify-between'>
                      <div className='sm:w-[5.5cm] w-[3.3cm]'>
                        <img className='sm:h-[5.5cm] sm:w-[5.5cm] h-[4cm] w-[4cm] object-cover' src={item.img} alt={item.name} />
                        <p className='font-semibold px-2 pt-1 sm:text-[16px] text-sm capitalize'>{item.name}</p>

                        <div className='flex flex-wrap sm:gap-2 gap-x-2 gap-y-1 font-medium px-2 pt-1 sm:text-[16px] text-sm'>
                          <p>₹ {Math.floor(item.price - (item.price * item.discount || 0) / 100).toLocaleString()}</p>
                          <del>₹ {item.price}</del>
                          <p>{item.discount || 'No discount'}% </p>
                        </div>

                        <p className='sm:flex hidden font-medium mt-1 px-2 pt-1 text-sm capitalize'>{item.color}</p>
                      </div>

                      <div className='grid grid-cols-2 gap-[1px] mt-4'>
                        <button onClick={() => updated(item._id)} className='bg-green-400 hover:bg-green-500 p-1'><i className="ri-pencil-line"></i></button>
                        <button onClick={() => deleted(item._id)} className='bg-red-400 hover:bg-red-500 p-1'><i className="ri-delete-bin-line"></i></button>
                      </div>
                    </div>
                  )
                })
            }
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default Products
