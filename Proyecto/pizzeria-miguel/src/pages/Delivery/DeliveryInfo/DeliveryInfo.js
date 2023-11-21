import React from 'react'
import {BsFillStarFill} from 'react-icons/bs'

import './DeliveryInfo.css'

const DeliveryInfo = () => {
  return (
    <div className='section delivery-info'>
        <div className='container'>
            <div className='grid-container'>
                <div>
                    <div className='delivery-iconbox'>
                        <BsFillStarFill color="#c3512f" />
                        <h3 className='heading-tertiary'>
                            order with <span>woocommerce</span>
                        </h3>
                    </div>

                    <p>You can power your own online ordering system with the free Woocommerce Plugin. You will receive an E-Mail for each order and can change the payment settings to accept anything from credit card, to paypal to bank deposit. The number of products you can add have no limit. Even variations are possible</p>
                </div>

                <div>
                    <div className='delivery-iconbox'>
                        <BsFillStarFill color="#c3512f" />
                        <h3 className='heading-tertiary'>
                           additional <span>information</span>
                        </h3>
                    </div>

                    <p>You can power your own online ordering system with the free Woocommerce Plugin. You will receive an E-Mail for each order and can change the payment settings to accept anything from credit card, to paypal to bank deposit. The number of products you can add have no limit. Even variations are possible</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DeliveryInfo