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
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d304524.00058471283!2d-1.829087101054806!3d53.39526275721332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48790aa9fae8be15%3A0x3e2827f5af06b078!2sSheffield%2C%20Reino%20Unido!5e0!3m2!1ses!2sco!4v1700599197797!5m2!1ses!2sco"
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

                <button>Send</button>
            </div>
        </div>
    </div>
  )
}

export default CantactForm