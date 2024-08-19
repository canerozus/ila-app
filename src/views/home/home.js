import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import Modal from "../../components/modal";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchProducts } from "../../redux/productSlice";
import EditProduct from "../../components/editProduct";
import AddProduct from "../../components/addProduct";

const Home = () => {
  const [editOpen, setEditOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const productStatus = useSelector((state) => state.products.status);

  useEffect(() => {
    if (productStatus === "idle") {
      dispatch(fetchProducts());
    }
  }, [productStatus, dispatch]);

  const handleDeleteProduct = (productId) => {
    return dispatch(deleteProduct(productId));
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "title",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="d-flex gap-2">
            <Link
              to={`/product/${row.original.id}`}
              className="btn btn-info btn-sm flex-fill text-white"
            >
              Details
            </Link>
            <button
              className="btn btn-primary btn-sm flex-fill"
              onClick={() => {
                setEditOpen(true);
                setSelectedProductId(row.original.id);
              }}
            >
              Edit
            </button>
            <button
              className="btn btn-danger btn-sm flex-fill"
              onClick={() => handleDeleteProduct(row.original.id)}
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    [products]
  );

  const tableInstance = useTable({ columns, data: products });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Product List</h1>
        <button className="btn btn-custom" onClick={() => setAddOpen(true)}>
          Add New Product
        </button>
      </div>
      <div className="table-responsive">
        <table
          {...getTableProps()}
          key={getTableProps().key}
          className="table table-striped table-bordered"
        >
          <thead className="table-dark">
            {headerGroups.map((headerGroup, i) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={i}>
                {headerGroup.headers.map((column, i) => (
                  <th {...column.getHeaderProps()} key={i}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={i}>
                  {row.cells.map((cell, i) => (
                    <td {...cell.getCellProps()} key={i}>
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Modal
        open={editOpen}
        setOpen={() => setEditOpen()}
        portalId={"edit"}
        title={"Edit Product"}
      >
        <EditProduct
          setModalOpen={() => setEditOpen()}
          productId={selectedProductId}
          initialData={products.find(
            (product) => product.id === selectedProductId
          )}
        />
      </Modal>
      <Modal
        open={addOpen}
        setOpen={() => setAddOpen()}
        portalId={"add"}
        title={"Add Product"}
      >
        <AddProduct setModalOpen={() => setAddOpen()} />
      </Modal>
    </div>
  );
};

export default Home;
