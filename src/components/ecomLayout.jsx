import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { InputContext } from '../components/Contextapi/Context'

const menus = [
    { label: 'Home', link: '/', enum: ['user', 'admin'] },
    { label: 'all product', link: '/products', enum: ['user', 'admin'] },
    { label: 'cart', link: '/cart', enum: ['user', 'admin'] },
    { label: 'order', link: '/order', enum: ['user', 'admin'] },
    { label: 'profile', link: '/profile', enum: ['user', 'admin'] },
    { label: 'contact', link: '/contact', enum: ['user', 'admin'] },
    { label: 'admin', link: '/admin', enum: ['admin'] }
]

const ecomLayout = ({ children, cart }) => {

    const location = useLocation()
    const navigate = useNavigate()
    const [Show, setShow] = useState(false);
    const [inputSearch, setinputSearch] = useState('');
    const [userRole, setuserRole] = useState('')
    const [profilepopup, setprofilepopup] = useState(false)
    const [Username, setUsername] = useState({
        gender: 'male',
        user: ''
    })
    const [cartLength, setcartLength] = useState(0)

    const { setvalue } = useContext(InputContext);

    const Result = async () => {
        const data = JSON.parse(localStorage.getItem('shopsphere'));
        const id = data._id
        try {
          const res = await axios.get(`https://ecomnode.vercel.app/users/email/${id}`)
          const { gender, username } = res.data
          setUsername({
            ...Username,
            gender: gender,
            user: username
          })                  
    
        } catch (error) {
          console.log(error);
    
        }
      } 
      
      const Cart = async () => {
          const data = JSON.parse(localStorage.getItem('shopsphere'));
          const id = data._id
        try {
          const res = await axios.get(`https://ecomnode.vercel.app/carts/${id}`)
          setcartLength(res.data.length);  
    
        } catch (error) {
          console.log(error);
    
        }
      }      

    // getting login details from session
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('shopsphere'));
        
        if(data){
            setuserRole(data.role)            
        } else{
            setuserRole('user')
        }

        Result()
        Cart()
    }, [cart])    

    // sending input search value to context api 
    const Search = (e) => {
        const value = e.target.value

        setinputSearch(value);
        setvalue(value);
    }

    // make logout functionality
    const logout = () => {
        localStorage.clear('shopsphere')
        navigate('/login')
    }

    if (location.pathname === '/login' || location.pathname === '/signup')
        return (
            children
        )

    return (
        <div>
            <nav className='flex justify-between items-center sm:py-5 py-2 sm:px-12 px-2 gap-1 sticky top-0 bg-white z-50'>
                <div className='flex items-center gap-2'>
                    <i onClick={() => setShow(true)} className="ri-menu-2-line lg:hidden block text-2xl font-semibold"></i>

                    <Link to='/' className='flex gap-1 items-center cursor-default sm:text-2xl text-lg font-medium sm:block hidden'>
                        Shop<span className='text-violet-600'>Sphere</span>
                    </Link>
                </div>

                {/* laptop menus */}

                <ul className='font-semibold lg:flex gap-4 capitalize hidden'>
                    {
                        menus.map((item, ind) => {
                            return (
                                item.enum.includes(userRole) &&
                                <Link
                                    style={{
                                        backgroundColor: location.pathname === item.link ? '#8B5CDC' : '',
                                        color: location.pathname === item.link ? 'white' : ''
                                    }}
                                    key={ind}
                                    className='hover:text-white hover:bg-[#8B5CDC] py-2 px-3 rounded-lg'
                                    to={item.link}
                                >
                                    {item.label}
                                </Link>
                            )
                        })
                    }
                    {
                        !localStorage.getItem('shopsphere') ?
                            <>
                                <Link
                                    style={{
                                        backgroundColor: location.pathname === '/login' ? '#8B5CDC' : '',
                                        color: location.pathname === '/login' ? 'white' : ''
                                    }}
                                    className='hover:text-white hover:bg-[#8B5CDC] py-2 px-3 rounded-lg'
                                    to='/login'
                                >
                                    LogIn
                                </Link>
                                <Link
                                    style={{
                                        backgroundColor: location.pathname === '/singup' ? '#8B5CDC' : '',
                                        color: location.pathname === '/signup' ? 'white' : ''
                                    }}
                                    className='hover:text-white hover:bg-[#8B5CDC] py-2 px-3 rounded-lg'
                                    to='/signup'
                                >
                                    SignUp
                                </Link>
                            </>
                            :
                            <button onClick={logout} className='hover:text-white hover:bg-[#8B5CDC] py-2 px-3 rounded-lg'><i className="ri-logout-circle-line font-medium"></i> LogOut</button>
                    }
                </ul>

                {/* mobile menu */}

                <ul className={`lg:hidden flex flex-col font-semibold capitalize fixed top-0 ${Show ? 'left-0' : 'left-[-100%]'} h-full bg-white sm:w-6/12 w-11/12 sm:p-6 p-3 gap-3 duration-300`}>
                    <div className='flex justify-between items-center border-black border-b pb-4'>
                        <h1 className='tracking-wide sm:text-xl text-lg font-semibold'>Shop<span className="text-violet-600">Sphere</span></h1>
                        <i onClick={() => setShow(false)} className="ri-close-large-line sm:text-xl text-lg font-semibold"></i>
                    </div>
                    {
                        menus.map((item, ind) => {
                            return (
                                item.enum.includes(userRole) &&
                                <Link
                                    style={{
                                        backgroundColor: location.pathname === item.link ? '#8B5CDC' : '',
                                        color: location.pathname === item.link ? 'white' : ''
                                    }}
                                    key={ind}
                                    onClick={() => setShow(false)}
                                    className='hover:text-white hover:bg-[#8B5CDC] py-2 px-3 rounded-lg'
                                    to={item.link}
                                >
                                    {item.label}
                                </Link>
                            )
                        })
                    }
                    {
                        !localStorage.getItem('shopsphere') ?
                            <div className='flex flex-col gap-3'>
                                <Link
                                    style={{
                                        backgroundColor: location.pathname === '/login' ? '#8B5CDC' : '',
                                        color: location.pathname === '/login' ? 'white' : ''
                                    }}
                                    className='hover:text-white hover:bg-[#8B5CDC] py-2 px-3 rounded-lg'
                                    to='/login'
                                >
                                    LogIn
                                </Link>
                                <Link
                                    style={{
                                        backgroundColor: location.pathname === '/singup' ? '#8B5CDC' : '',
                                        color: location.pathname === '/signup' ? 'white' : ''
                                    }}
                                    className='hover:text-white hover:bg-[#8B5CDC] py-2 px-3 rounded-lg'
                                    to='/signup'
                                >
                                    SignUp
                                </Link>
                            </div>
                            :
                            <button onClick={logout} className='hover:text-white hover:bg-[#8B5CDC] py-2 px-3 rounded-lg text-left'><i className="ri-logout-circle-line font-normal"></i> LogOut</button>
                    }
                </ul>

                <div onClick={() => setprofilepopup(!profilepopup)} className='flex items-center gap-2 relative cursor-pointer -z-10'>
                    <img className='h-10 w-10 rounded-full' src={`${Username.gender === 'female' ? 'https://www.shareicon.net/data/512x512/2016/09/15/829452_user_512x512.png' : 'https://img.freepik.com/premium-vector/man-professional-business-casual-young-avatar-icon-illustration_1277826-635.jpg?w=740'}`} alt='...' />
                    <h1 className='sm:text-xl text-lg font-semibold'>{`${Username.user || 'User'}`}</h1>

                    {
                        profilepopup &&
                        <div className='h-fit w-40 bg-slate-200 absolute top-11 right-0 text-center rounded-lg'>
                            <div onClick={() => navigate('/profile')} className='text-lg p-2 hover:bg-slate-100 rounded-t-lg cursor-pointer'><i className="ri-user-shared-2-line"></i> Profile</div>

                            <div onClick={() => navigate('/cart')} className='text-lg p-2 hover:bg-slate-100 rounded-t-lg cursor-pointer'><i className="ri-shopping-cart-2-line"></i> Cart <span className='bg-violet-400 px-1 text-white rounded-full text-sm'>{cartLength}</span></div>

                            <div className='h-[1px] w-full bg-slate-400'></div>

                            <div onClick={logout} className='text-lg p-2 hover:bg-slate-100 rounded-b-lg cursor-pointer'><i className="ri-logout-circle-line"></i> Logout</div>
                        </div>
                    }
                </div>
            </nav>

            {
                (location.pathname === '/' || location.pathname === '/products') &&
                <div className='sm:py-1 py-2 flex justify-between items-center gap-12 lg:px-32 sm:px-12 px-2'>
                    <form className='w-full h-fit'>
                        <input onChange={Search} value={inputSearch} className='sm:p-3 p-2 rounded-lg bg-violet-100 w-full' type='text' placeholder='Search porduct' />
                    </form>

                    <div className='lg:flex hidden gap-2 items-center'>
                        <p className='text-xl font-semibold tracking-wide'>e<span className='text-violet-500'>Commerce</span></p>
                        <img className='h-auto w-20' src='https://portotheme.com/html/molla/assets/images/demos/demo-2/products/product-2-2.jpg' alt='...' />
                        <p className='text-xl font-semibold text-nowrap'><span className='text-violet-600'>Deal</span> with Shop<span className='text-violet-600'>Sphere</span></p>
                    </div>
                </div>
            }

            {children}

            <footer className='bg-[#232323] text-white'>
                <div className='sm:px-32 sm:py-12 px-2 py-4 grid sm:grid-cols-2 grid-cols-1 gap-4'>

                    <div className='w-fit space-y-3'>
                        <p className='text-xl font-medium tracking-wider'>FOLLOW</p>

                        <div className='sm:text-4xl text-3xl space-x-2'>
                            <i className="ri-facebook-circle-fill text-violet-600"></i>
                            <i className="ri-twitter-fill text-violet-600"></i>
                            <i className="ri-linkedin-box-fill text-violet-600"></i>
                            <i className="ri-youtube-fill text-violet-600"></i>
                            <i className="ri-instagram-fill text-violet-600"></i>
                        </div>

                        <div className='flex justify-between'>
                            <div className='sm:text-lg'>
                                <p>Autumn</p>
                                <p>Winter</p>
                                <p>Spring</p>
                                <p>Summer</p>
                            </div>

                            <div className='sm:text-lg'>
                                <p>Casual</p>
                                <p>Classic</p>
                                <p>Urban</p>
                                <p>Sport</p>
                            </div>
                        </div>
                    </div>

                    <div className='space-y-3'>
                        <div className='flex gap-3 sm:text-xl text-lg'>
                            <p>New Arrivals</p>
                            <p>Discount</p>
                            <p>Contact US</p>
                        </div>

                        <p className='text-base tracking-wide'>Subcribe to get the latest on sales, New releases and more...</p>

                        <form>
                            <input className='p-3 rounded-lg w-full text-black' type='text' placeholder='' />
                        </form>

                        <button className='bg-violet-600 hover:bg-violet-500 font-medium py-2 px-4 text-lg rounded-lg'>Subcribe</button>

                        <p className='text-base tracking-wide'>StoreM4 Powered by <span className='text-violet-600'>Mobirise</span></p>

                        <p className='text-base tracking-wide'>Supported payment systems</p>

                        <div className='flex gap-2'>
                            <img src='/images/pay1.png' alt='...' />
                            <img src='/images/pay2.png' alt='...' />
                            <img src='/images/pay3.png' alt='...' />
                            <img src='/images/pay4.png' alt='...' />
                        </div>
                    </div>
                </div>

                <div className='grid sm:grid-cols-2 grid-cols-1 sm:px-32 sm:py-12 px-2 py-4 gap-4 items-center'>
                    <div className='space-y-1'>
                        <p>Return policy</p>
                        <p>Search our store</p>
                        <p>Blog</p>
                        <p>Contact us</p>
                        <p>About us</p>
                    </div>

                    <p>Copyright © 2024 All Right Reserved Terms of Use and Privacy Policy</p>
                </div>
            </footer>
        </div>
    )
}

export default ecomLayout
