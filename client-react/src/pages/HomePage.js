import React, { useState, useEffect } from "react";
import { Container, Row, Card, Spinner, Carousel } from "react-bootstrap";
import adminService from "../services/admin";
import { useNavigate } from "react-router-dom";
import head from "../assets/textheaderligred.png";
import newitems from "../assets/newitem.png";

import "./HomePage.css";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();

  const fetchAllProducts = async () => {
    setLoading(true);

    let allProducts = await adminService.getAllProducts();
    if (allProducts.error) {
      setAllProducts("Could not load products");
    } else {
      setLoading(false);
      setAllProducts(allProducts.response.data);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const getReadablePrice = (price) => {
    var dollars = price / 100;
    dollars = dollars.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
    return dollars;
  };

  return (
    <Container className="text-center mb-5">
      <img
        className="d-block w-100"
        src={head}
        style={{ objectFit: "contain" }}
      />

      {loading && (
        <div className="text-center mx-auto w-100">
          <Spinner animation="border" />
        </div>
      )}
      {!loading && (
        <Carousel fade className="mb-5">
          {allProducts.slice(0, 3).map((product, key) => (
            <Carousel.Item
              key={key}
              onClick={() => {
                navigate("/product", { state: { product } });
              }}
            >
              <img
                className="d-block w-100"
                src={product.img}
                alt={product.title}
                style={{ height: 400, objectFit: "cover" }}
              />
              <Carousel.Caption
                style={{ backgroundColor: "rgba(0,0,0,0.5)", borderRadius: 10 }}
              >
                <h3>{product.title}</h3>
                <p>{product.desc}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
      <hr className="solid text-white"/>

      <img
        className="d-block w-100 m-3"
        src={newitems}
        style={{
          objectFit: "contain",
          width: ".5em",
          height: "15em",
        }}
      />
      <hr className="solid text-white"/>
      <br />

      <Row className="justify-content-center mx-auto gy-4 gx-4">
        {!loading &&
          allProducts.slice(3).map((product, key) => (
            <Card
              style={{ width: "18rem", margin: 10 }}
              key={key}
              onClick={() => {
                navigate("/product", { state: { product } });
              }}
              className="bg-dark"
            >
              <Card.Img
                variant="top"
                src={product.img}
                className="w-100"
                style={{ contain: "" }}
              />
              <Card.Body className="text-white">
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>{product.desc}</Card.Text>
                <Card.Text>{getReadablePrice(product.price)}</Card.Text>
              </Card.Body>
            </Card>
          ))}
      </Row>
    </Container>
  );
}
