import React from 'react'
import './OurChef.css'

const OurChef = () => {
  return (
    <div>
        <div className='chef-img'>
            <div className='container'>
                <div className='chef-content'>
                    <h1 className='heading-primary'>
                        Our <span>Restaurants</span>
                    </h1>

                    <p className='text-white'>
                    The best place to have a good time.
                    </p>
                </div>
            </div>
        </div>

        {/* chef info  */}

        <div className='container'>
            <div className='grid-container py-md'>
                <div className='grid-item chef-info'>
                    <h3 className='heading-tertiary'>
                        <span>Sheffield</span>
                    </h3>

                    <h4>main restaurant</h4>

                    <p>Come and visit us, we are located at Cra. 98#16-200, We are waiting for you!.</p>
                </div>

                <div className='grid-item chef-info'>
                    <h3 className='heading-tertiary'>
                        <span>Cali</span>
                    </h3>

                    <h4>America</h4>

                    <p>Come and visit us, we are located on Calle 38 Norte. #6N-45, We are waiting for you!.</p>
                </div>

                <div className='grid-item chef-info'>
                    <h3 className='heading-tertiary'>
                        <span>Singapore</span>
                    </h3>

                    <h4>Asia</h4>

                    <p>Come and visit us, we are located at Cra. 34 #3-2 to 3-166, We are waiting for you!.</p>
                </div>


            </div>




        </div>
    </div>
  )
}

export default OurChef