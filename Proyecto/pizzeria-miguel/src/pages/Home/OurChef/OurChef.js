import React from 'react'
import './OurChef.css'

const OurChef = () => {
  return (
    <div>
        <div className='chef-img'>
            <div className='container'>
                <div className='chef-content'>
                    <h1 className='heading-primary'>
                        Nuestras <span>Sedes</span>
                    </h1>

                    <p className='text-white'>
                    El mejor lugar para pasarla chimba.
                    </p>
                </div>
            </div>
        </div>

        {/* chef info  */}

        <div className='container'>
            <div className='grid-container py-md'>
                <div className='grid-item chef-info'>
                    <h3 className='heading-tertiary'>
                        <span>Jardín Plaza</span>
                    </h3>

                    <h4>Sede Principal</h4>

                    <p>Ven y visitanos, estamos ubicados en la Cra. 98#16-200, ¡Te esperamos!.</p>
                </div>

                <div className='grid-item chef-info'>
                    <h3 className='heading-tertiary'>
                        <span>Chipichape</span>
                    </h3>

                    <h4>Sede Norte</h4>

                    <p>Ven y visitanos, estamos ubicados en la Calle 38 Nte. #6N-45, ¡Te esperamos!.</p>
                </div>



                <div className='grid-item chef-info'>
                    <h3 className='heading-tertiary'>
                        <span>Parque del Perro</span>
                    </h3>

                    <h4>Sede Oeste</h4>

                    <p>Ven y visitanos, estamos ubicados en la Cra. 34 #3-2 a 3-166, ¡Te esperamos!.</p>
                </div>



                <div className='grid-item chef-info'>
                    <h3 className='heading-tertiary'>
                        <span>Valle del Lili</span>
                    </h3>

                    <h4>Sede Sur</h4>

                    <p>Ven y visitanos, estamos ubicados en la Calle 45a #60, ¡Te esperamos!.</p>
                </div>
            </div>




        </div>
    </div>
  )
}

export default OurChef