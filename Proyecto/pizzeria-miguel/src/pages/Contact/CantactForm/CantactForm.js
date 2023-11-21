import React from 'react'
import './CantactForm.css'
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import bgImage from '../../../assets/cake.jpg'

const CantactForm = () => {
  return (
    <div className='section'>
   <div className='container grid-container contact-content'>
       <Card className="mb-4">
           <Card.Body>
               <Card.Title>Google Maps</Card.Title>
               <Card.Text>
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.92203084829!2d-76.5300936249538!3d3.3692356517601527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e30a17491d2a5f9%3A0xf06c44da2d3c8a74!2sCentro%20Comercial%20Jard%C3%ADn%20Plaza!5e0!3m2!1ses!2sco!4v1700466453961!5m2!1ses!2sco"
                      width="100%" height="538" frameborder="0" style={{border:0}} allowfullscreen></iframe>
               </Card.Text>
           </Card.Body>
       </Card>

            <div>
                <h1 className='heading-secondary'>
                    Contact <span>Us</span>
                </h1>

                <form>
                    <div className='form-field name-email'>
                        <div>
                            <label>Name</label>
                            <input type="text" name='name' />
                        </div>

                        <div>
                            <label>Email</label>
                            <input type="email" name='email' />
                        </div>
                    </div>


                    <div className='form-field'>
                        <div>
                            <label>Subject</label>
                            <input type="text" name='subject' />
                        </div>
                    </div>

                    <div className='form-field'>
                        <div>
                            <label>Message</label>
                            <textarea type="text" name='message' />
                        </div>
                    </div>
                </form>

                <button>Submit</button>
            </div>
        </div>
    </div>
  )
}

export default CantactForm