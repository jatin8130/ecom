import React from 'react'
import Layout from './Layout'

const AdminHome = () => {
    return (
      <div>
        <Layout>
          <h1
            className='sm:ml-48 ml-10 sm:text-4xl text-2xl font-semibold sm:top-[40%] sm:left-[40%] top-[30%] left-[40%] text-nowrap'
            style={{
              position: 'absolute',
              transform: 'translate(-50%, -50%)',
              background: 'linear-gradient(to right, black, #4E004E)',
              backgroundClip: 'text',
              color: 'transparent'
            }}
          >Welcome, Admin</h1>
        </Layout>
      </div>
    )
}

export default AdminHome

