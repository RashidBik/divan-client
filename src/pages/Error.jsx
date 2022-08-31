import React from 'react'
import { Link } from 'react-router-dom'



function Error() {

  return (
    <div className='bg-gray-900 text-gray-300 m-auto'>
        <h1>Page Not Found...</h1>
        <div className='text-2xl text-gray-500'>404</div>
          <div>Try this link</div>
          <Link className='text-blue-700' to="/" >Leave</Link>
      
    </div>
  )
}

export default Error
