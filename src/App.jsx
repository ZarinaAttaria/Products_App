import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Navbar.jsx";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("");
  const productsPerPage = 10;


  const getData = async (page, sort) => {
    const skip = (page - 1) * productsPerPage;
    const sortType = sort ? `&sortBy=${sort}&order=asc` : "";
    await fetch(`https://dummyjson.com/products?limit=${productsPerPage}&skip=${skip}${sortType}`)
      .then((response) => response.json())
      .then((data) => setProducts(data.products));
  };

  useEffect(() => {
    getData(page, sort);
  }, [page, sort]);

  const handleSort = (value) => {
    setSort(value);
  };

  const handleNext = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevious = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <>
      <Navbar setProducts={setProducts} productsPerPage={productsPerPage} page={page} sort={sort} products={products} />
      <button onClick={() => handleSort("price")}>Sort by price</button>
      <button onClick={() => handleSort("title")}>Sort by title</button>
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
        <button onClick={handlePrevious} disabled={page === 1}>Previous</button>
        <span>Page {page}</span>
        <button onClick={handleNext}>Next</button>
      </div>
    </>
  );
}

export default App;
