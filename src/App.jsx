import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      await fetch("https://dummyjson.com/products?limit=10&skip=10")
        .then((response) => response.json())
        .then((data) => setProducts(data.products));
    };
    getData();
  }, []);

  return (
    <>
      <div className="container">
        {products.map((product, id) => (
          <div className="card" style={{ width: "18rem" }} key={id}>
            <img src={product.images} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text">Rs {product.price}</p>

              <a href="#" className="btn btn-primary">
                Add to Cart
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
//
