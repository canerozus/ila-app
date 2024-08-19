import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = useSelector((state) =>
    state.products.products.find((product) => product.id === parseInt(id))
  );

  const handleBack = () => {
    navigate("/");
  };

  if (!product) {
    navigate("/");
  }

  return (
    <div className="container mt-5">
      <button className="btn btn-secondary mb-3" onClick={handleBack}>
        Back to Product List
      </button>
      <div className="d-flex flex-column flex-md-row align-items-center">
        <img
          src={product.image}
          alt={product.title}
          className="img-fluid mb-3 mb-md-0"
          style={{ maxWidth: "200px", marginRight: "20px" }}
        />
        <div>
          <h1>{product.title}</h1>
          <p>
            <strong>Description:</strong> {product.description}
          </p>
          <p>
            <strong>Price:</strong> ${product.price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
