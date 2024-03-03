import React, { useState, useEffect } from 'react';
import '../Styles/ShoppingPage.css';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { firebaseConfigInstance } from '../Models/MyFireBaseConfig';

export default function ShoppingPage() {
    const [products, setProducts] = useState([]);

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
            alert("Item added to Cart!");
        } catch (error) {
            console.error('Error adding product to cart:', error);
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

            <div className='prod'>
            
            <ul>
                <br></br>
                {products.map(product => ( 
                    <li key={product.id}>
                        <div className='prodlist'>
                        <div className='prods'><strong>Product: </strong>{product.data.name}</div>
                        <strong>Price: </strong>{product.data.price}$
                        </div>
                        <button type="button" className="btn btn-secondary bt" onClick={() => addProductsToCart(product)}>
                            Add To Cart
                        </button>
                        <button type="button" className="btn btn-secondary bt">
                            Edit
                        </button>
                        <button type="button" className="btn btn-secondary bt">
                            Delete Product
                        </button>
                        <br></br>
                        <br></br>
                    </li>
                ))}
                
            </ul>
            </div>
        </>
    );
}
