import React from 'react';
import './ProductSection.css';


export const ProductSection = () => (
     <div className='bg-white p-5 d-flex justify-content-center row'>
        <h1 className="text-center col-12 mt-5 mb-4">Nuestros Servicios</h1>
        <div className="row  col-10 px-5  mb-5  d-flex justify-content-center">
            <div className=" col-sm-4 col-md">
                <figure>
                    <img src="/img/BankAccount.png" alt='' className="img-fluid" />
                    <figcaption>Quiero una Cuenta</figcaption>
                </figure>
            </div>
            <div className="col-sm-4 col-md">
                <figure>
                    <img src="/img/CreditCard.png" alt='' className="img-fluid" />
                    <figcaption>Quiero una Tarjeta</figcaption>
                </figure>
            </div>
            <div className="col-sm-4 col-md">
                <figure>
                    <img src="/img/Loan.png" alt='' className="img-fluid" />
                    <figcaption>Necesito un Préstamo</figcaption>
                </figure>
            </div>
            <div className="col-sm-4 col-md">
                <figure>
                    <img src="/img/Insurance.png" alt='' className="img-fluid" />
                    <figcaption>Quiero un Seguro</figcaption>
                </figure>
            </div>
            <div className="col-sm-4 col-md">
                <figure>
                    <img src="/img/Investment.png" alt='' className="img-fluid" />
                    <figcaption>Quiero Invertir</figcaption>
                </figure>
            </div>
        </div>
    </div>
   
);
