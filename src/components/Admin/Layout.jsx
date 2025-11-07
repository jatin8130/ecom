import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
    
    const {pathname} = useLocation();

    return (
        <div>
            <nav className='sticky top-0 bg-white'>
                <aside className='sm:w-48 w-10 h-screen shadow-lg fixed'>
                    <Link to='/admin' className='flex items-center gap-1 text-xl shadow-md pl-3 sm:py-5 py-3 rounded-lg font-medium'>
                        <i className="ri-store-3-line"></i>
                        <h1 className='hidden sm:flex'>Ecommerce</h1>
                    </Link>

                    <Link to='/admin/dashboard'
                    style={pathname === '/admin/dashboard' ? {
                        backgroundColor: '#C8C5F6',
                        color: '#0000FF'
                    } : null}
                     className='flex gap-1 items-center pl-3 sm:py-5 py-3 font-medium text-lg rounded-lg hover:text-[#0000FF] hover:bg-[#C8C5F6]'>
                        <i className="ri-dashboard-2-line"></i>
                        <p className='hidden sm:flex'>Dashboard</p>
                    </Link>

                    <Link to='/admin/products'
                    style={pathname === '/admin/products' ? {
                        backgroundColor: '#C8C5F6',
                        color: '#0000FF'
                    } : null}
                      className='flex gap-1 items-center pl-3 sm:py-5 py-3 font-medium text-lg rounded-lg hover:text-[#0000FF] hover:bg-[#C8C5F6]'>
                        <i className="ri-shopping-bag-2-line"></i>
                        <p className='hidden sm:flex'>Products</p>
                    </Link>

                    <Link to='/admin/categories'
                    style={pathname === '/admin/categories' ? {
                        backgroundColor: '#C8C5F6',
                        color: '#0000FF'
                    } : null}
                      className='flex gap-1 items-center pl-3 sm:py-5 py-3 font-medium text-lg rounded-lg hover:text-[#0000FF] hover:bg-[#C8C5F6]'>
                        <i className="ri-list-check"></i>
                        <p className='hidden sm:flex'>Categories</p>
                    </Link>

                    <Link to='/admin/orders'
                    style={pathname === '/admin/orders' ? {
                        backgroundColor: '#C8C5F6',
                        color: '#0000FF'
                    } : null}
                      className='flex gap-1 items-center pl-3 sm:py-5 py-3 font-medium text-lg rounded-lg hover:text-[#0000FF] hover:bg-[#C8C5F6]'>
                        <i className="ri-file-list-3-line"></i>
                        <p className='hidden sm:flex'>Orders</p>
                    </Link>

                    <Link to='/admin/admins'
                    style={pathname === '/admin/admins' ? {
                        backgroundColor: '#C8C5F6',
                        color: '#0000FF'
                    } : null}
                      className='flex gap-1 items-center pl-3 sm:py-5 py-3 font-medium text-lg rounded-lg hover:text-[#0000FF] hover:bg-[#C8C5F6]'>
                        <i className="ri-admin-line"></i>
                        <p className='hidden sm:flex'>Admins</p>
                    </Link>

                    <Link to='/' className='flex gap-1 items-center pl-3 sm:py-5 py-3 font-medium text-lg hover:rounded-lg hover:text-[#0000FF] hover:bg-[#C8C5F6]'>
                        <i className="ri-arrow-left-circle-line"></i>
                        <p className='hidden sm:flex'>Back to <i className="ri-home-3-line"></i></p>
                    </Link>
                </aside>

                <div className='sm:ml-48 ml-10 sm:p-5 p-3 bg-white sm:text-xl text-lg rounded-lg flex justify-between items-center'>
                    <h1 className='capitalize'>Hello, <span className='font-semibold'>Jatin Mehra</span></h1>
                    <div className='hidden sm:flex items-center gap-2'>
                        <img className='w-10 h-10 rounded-full' src='/images/wistoria.webp' alt='...' />
                        <p className='text-[15px] font-semibold capitalize'>Jatin Mehra</p>
                    </div>
                </div>

            </nav>

            {children}
        </div>
    )
}

export default Layout;
