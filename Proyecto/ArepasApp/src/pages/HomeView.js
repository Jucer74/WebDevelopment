import React, { useState, useEffect } from 'react'; 
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import CardProduct from '../component/CardProduct';
import DetalleProducto from '../component/DetalleProducto';
import { getAllWithPagination } from '../services/paginacion';
import { getAllProducts } from "../services/productos/productosPeticiones";

function HomeView() {
  const [lastPage,setLastPage] = useState(1);
  const [actualPage, setActualPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const paginationLimit = 3;

  const handleExpandDetails = (product) => {
    setSelectedProduct(product);
    setShowDetails(!showDetails);
  };

  /* Lógica de la petición */
  const fetchData = async (entity, page, limit) => {
    try {
      const response = await getAllWithPagination(entity, page, limit);
      setProducts(response); // Asignar directamente la respuesta al estado products
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {  
    const fetchAllProducts = async () => {
    try {
      const response = await getAllProducts();
      return response;
    } catch (error) {
      console.log(error);
      return [];
    }
    };

    fetchAllProducts()
      .then((allProducts) => {
        const numProducts = allProducts.length;
        setLastPage(Math.ceil(numProducts / paginationLimit));
      })
      .catch((error) => {
        console.log(error);
      })
  },[]);

  useEffect(() => {
    fetchData('products', actualPage, paginationLimit);
  }, [actualPage]);

  const nextPage = () => {
    if (actualPage < lastPage){
      setActualPage(prevState => prevState + 1);
    }
  };

  const prevPage = () => {
    if (actualPage > 1) {
      setActualPage(prevState => prevState - 1);
    }
  };

  return (
    <>
      <h1 className='m-5 fw-bold'>Nuestro Menú</h1>

      <Container>
        <Row className="mx-5 justify-content-md-center">
          {products.map((product) => (
            <Col className='mb-4' key={product.id} md={4}>
              <CardProduct product={product} handleDetails={handleExpandDetails} />
            </Col>
          ))}
        </Row>
        <Row className="w-100 justify-content-md-center" >
          <Pagination>
            <Pagination.Prev onClick={prevPage} />
            <Pagination.Item>{actualPage}</Pagination.Item>
            <Pagination.Next onClick={nextPage} />
          </Pagination>
        </Row>
      </Container>

      {showDetails && <DetalleProducto show={showDetails} handleDetails={handleExpandDetails} product={selectedProduct} />}
    </>
  );
}

export default HomeView;