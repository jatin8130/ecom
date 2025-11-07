import React, { useState, useEffect, useContext } from 'react'
import Layout from '../ecomLayout'
import './home.css'
import axios from 'axios'
import { Swiper, SwiperSlide } from 'swiper/react';
import { InputContext } from '../Contextapi/Context';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Autoplay, Pagination } from 'swiper/modules';
import Swal from 'sweetalert2';

const swiper = [
  {
    img: 'https://portotheme.com/html/molla/assets/images/demos/demo-2/slider/slide-1.jpg'
  },
  {
    img: 'https://portotheme.com/html/molla/assets/images/demos/demo-2/slider/slide-2.jpg'
  },
  {
    img: 'https://portotheme.com/html/molla/assets/images/demos/demo-2/slider/slide-3.jpg'
  },
  {
    img: 'https://portotheme.com/html/molla/assets/images/demos/demo-2/slider/slide-1.jpg'
  },
]

const index = ({ swip, title }) => {

  const [product, setproduct] = useState([])
  const { value } = useContext(InputContext);
  const [UserId, setUserId] = useState('');
  const [userProfile, setuserProfile] = useState({})
  const [cartup, setcartup] = useState(true)  

  const fetch = async () => {
    try {
      const res = await axios.get('https://ecomnode.vercel.app/products')
      const data = res.data
      setproduct(data);
    } catch (error) {
      console.log(error);
    }
  }

  const Profile = async () => {
    const data = JSON.parse(localStorage.getItem('shopsphere'));
    const id = data._id
    try {
      const res = await axios.get(`https://ecomnode.vercel.app/users/email/${id}`)
      setuserProfile({
        ...userProfile,
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
    fetch()
    Profile()
  }, [])

  const getdiscount = (price, disc) => {
    let dis = price - ((price * disc) / 100)
    return dis
  }

  // Filter products based on search query
  const filteredProducts = product.filter(product =>
    product.name.toLowerCase().includes(value.toLowerCase())
  );

  const Orders = async (item) => {
    if (userProfile.username && userProfile.address) {
      try {
        const res = await axios.post('https://ecomnode.vercel.app/orders',
          {
            categorie: item.categorie,
            color: item.color,
            price: JSON.stringify(getdiscount(item.price, item.discount)),
            img: item.img,
            name: item.name,
            userid: UserId,
            ...userProfile
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

        Swal.fire({
          icon: 'success',
          title: 'Product order !',
          text: 'Product was order they will be dispatch soon !',
          timer: 3000
        })

      } catch (error) {
        console.log(error);
      }
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Update profile.',
        text: 'Pls update your profile for buy product then move forward',
        timer: 3000
      })
    }
  }

  const Carts = async (item) => {
    if (userProfile.username && userProfile.address) {
      try {
        const res = await axios.post('https://ecomnode.vercel.app/carts',
          {
            categorie: item.categorie,
            color: item.color,
            price: JSON.stringify(getdiscount(item.price, item.discount)),
            img: item.img,
            name: item.name,
            userid: UserId,
            ...userProfile
          }
        )
        if (!res.data.data.acknowledged) {
          Swal.fire({
            icon: 'error',
            title: 'Product not added !',
            text: 'Product not added in cart ? Pls try again !',
            timer: 3000
          })
        }

        Swal.fire({
          icon: 'success',
          title: 'Product added !',
          text: 'Product was added in cart !',
          timer: 3000
        })

        setcartup(!cartup)

      } catch (error) {
        console.log(error);
      }
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Update profile.',
        text: 'Pls update your profile for add product in cart then move forward',
        timer: 3000
      })
    }
  }

  return (
    <Layout cart={cartup}>
      {
        swip && <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
        >
          {
            swiper.map((item, ind) => (
              <SwiperSlide key={ind} className='swiperslide'>
                <img className='w-full md:h-[16cm] sm:h-[10cm] h-[6cm] z-0' src={item.img} alt='...' />
              </SwiperSlide>
            ))
          }
        </Swiper>
      }

      <div className='sm:w-10/12 w-12/12 p-1 mx-auto my-2'>
        <h1 className='font-semibold sm:text-2xl text-xl ml-1 mb-3'>{title}</h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {filteredProducts.map((item, ind) => (
            <div
              key={ind}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-transform duration-200 hover:-translate-y-1 p-3 flex flex-col justify-between"
            >
              <div>
                <img
                  src={item.img}
                  alt="..."
                  className="rounded-lg w-full h-40 sm:h-48 object-cover"
                />
                <h1 className="text-sm sm:text-base capitalize font-semibold mt-2">
                  {(item.name).slice(0, 15)}...
                </h1>

                <div className="flex items-center gap-2 flex-wrap mt-1">
                  <p className="font-semibold text-green-600">
                    ₹{getdiscount(item.price, item.discount)}
                  </p>
                  <del className="text-gray-400">₹{item.price}</del>
                  <span className="bg-red-100 text-red-600 font-semibold text-xs px-2 py-0.5 rounded">
                    {item.discount}%
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-3">
                <p className="text-gray-500 font-medium text-xs sm:text-sm">
                  Free Delivery
                </p>
                <button
                  onClick={() => Orders(item)}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition"
                >
                  Buy now
                </button>
                <button
                  onClick={() => Carts(item)}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-md transition"
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default index
