import React, { useState, useEffect } from 'react';
import '../Styles/ShoppingPage.css';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { firebaseConfigInstance } from '../Models/MyFireBaseConfig';

export default function ShoppingPage() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 5;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsData = await firebaseConfigInstance.getProducts();
                setProducts(productsData);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const addProductsToCart = async (productName) => {
        try {
            await firebaseConfigInstance.addProductsToCart(productName);
            console.log('Product added to cart successfully!');
            alert("Product added to Cart!");
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };

    const deleteProduct = async (product) => {
        try {
            await firebaseConfigInstance.deleteProduct(product);
            console.log('Product deleted!');
            alert("Product Deleted!!!");
            window.location.reload();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const nextPage = () => {
        if (currentPage < Math.ceil(products.length / productsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            <div className='headss'>
                <div className="navbarsss" style={{ backgroundColor: "#cccccc" }}>
                    <h2>Shopping Page</h2>
                    <Link to="/ShoppingCart">
                        <FaShoppingCart className='iconsss' />
                    </Link>
                </div>
            </div>
            <div>
                <Link to="/AddProduct">
                    <button type="button" className="btn btn-info add" >
                        Add Product
                    </button>
                </Link>
            </div>

            <div className='prod'>
                <ul>
                    {currentProducts.map(product => (
                        <li key={product.id}>
                            <div className='prodlist'>
                                <div className='prods'><strong>Product: </strong>{product.data.name}</div>
                                <strong>Price: </strong>{product.data.price}$
                            </div>
                            <button type="button" className="btn btn-secondary bt" onClick={() => addProductsToCart(product)}>
                                Add To Cart
                            </button>
                            <Link to={`/EditProduct?productid=${product.id}&productname=${product.data.name}&productprice=${product.data.price}`}>
                                <button type="button" className="btn btn-secondary bt">
                                    Edit
                                </button>
                            </Link>
                            <button type="button" className="btn btn-secondary bt" onClick={() => deleteProduct(product)}>
                                Delete Product
                            </button>
                            <br></br>
                            <br></br>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Pagination */}
            <div className="d-flex justify-content-center">
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={prevPage}>&laquo; Previous</button>
                        </li>
                        {[...Array(Math.ceil(products.length / productsPerPage)).keys()].map(number => (
                            <li key={number + 1} className={`page-item ${number + 1 === currentPage ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => paginate(number + 1)}>
                                    {number + 1}
                                </button>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage === Math.ceil(products.length / productsPerPage) ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={nextPage}>Next &raquo;</button>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}
