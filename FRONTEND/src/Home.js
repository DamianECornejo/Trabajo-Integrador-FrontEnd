import { Link } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';

function Home() {
    return (<> 
      

        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="01.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>Bienvenidos a mi trabajo integrador</h3>
              <p>Hecho por Damián Cornejo.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="03.jpg"
              alt="Second slide"
            />
    
            <Carousel.Caption>
              <h3>Creador de contenido</h3>
              <p>Y futuro programador fullstacks.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="02.jpg"
              alt="Third slide"
            />
    
            <Carousel.Caption>
              <h3>Para mas información:</h3>
              <p>
                correo electronico: damiancorbit@gmail.com
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        </>  );
      
    }

export default Home;