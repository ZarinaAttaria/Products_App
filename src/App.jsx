import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Navbar.jsx";

function App() {
  const [products, setProducts] = useState([]);
const[page, setPage]=useState(1);
const productsPerPage=10;

const getData = async (page) => {
  const skip=(page-1)*productsPerPage;
  await fetch(`https://dummyjson.com/products?limit=${productsPerPage}&skip=${skip}`)
    .then((response) => response.json())
    .then((data) => setProducts(data.products));
};

  useEffect(() => {
    
    getData(page);
  }, [page]);

const handleNext=()=>{
  setPage((prevPage)=>prevPage+1);
}
const handlePrevious=()=>{
  setPage((prevPage)=>Math.max((prevPage-1),1));
}
  return (
    <>
      <Navbar setProducts={setProducts} productsPerPage={productsPerPage} page={page}/> 
      <div className="container">
        {products.map((product, id) => (
          <div className="card" style={{ width: "18rem" }} key={id}>
            <img
              src={product.images[0]}
              alt={product.title}
              style={{ height: "200px", objectFit: "cover" }}
              className="card-img-top"
            />
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

      <div>
        <button onClick={handleNext}>Next</button>
        <span>Page {page}</span>
        <button onClick={handlePrevious} disabled={page===1}>Previous</button>


      </div>
    </>
  );
}

export default App;
