import React from 'react'
import "./Home.css";


const Home = () =>{
  return(
    <div className="App">
       <h2 style={{marginTop:"20px"}}>Daniel Loaiza Roldan</h2>
        <div class="jumbotron">
        <h3 class="display-6">64594</h3>
        <hr class="my-4"/>
        </div>      
        <img  class="responsive" style={{borderRadius:"30px", }}src='https://caracol.com.co/radio/imagenes/2022/04/19/el_pulso_del_futbol/1650386081_724819_1650386234_miniatura_normal.jpg'/>
    </div>
  )
}
export default Home;