import React, {useState, useEffect} from 'react';
import "../Styles/ShoppingCart.css";
import { FaHome } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { firebaseConfigInstance } from '../Models/MyFireBaseConfig';

export default function ShoppingCart() {
    
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsData = await firebaseConfigInstance.getCartProducts();
                setProducts(productsData);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

        const removeProductsfromCart = async (productId) => {
            await firebaseConfigInstance.removeProductsFromCart(productId);
            alert("Item removed from Cart!");
            window.location.reload();
        };

        const getTotalPrice = () => {
            return products.reduce((total, product) => total + product.data.price, 0);
        };

    return (
        <><div className='headss'>
            <div className="navbarsss" style={{ backgroundColor: "#cccccc" }}>
                <h2>Shopping Cart</h2>
                <Link to="/">
                    <FaHome className="iconsss" />
                </Link>
            </div>


        </div>

        <div className='prodtot'>
            <div className='prod'>
                {products.length === 0 ? (
                <div className="empty-cart">Your cart is empty!!</div>
                ) : (
                <ul>
                    <br></br>
                    {products.map(product => (
                        <li key={product.id}>
                            <div className='cartlist'>
                                <div className='prods'><strong>Product: </strong>{product.data.name}</div>
                                <strong>Price: </strong>{product.data.price}$
                            </div>
                            <button type="button" className="btn btn-secondary bt" onClick={() => removeProductsfromCart(product)}>
                                Remove
                            </button>
                            <br></br>
                        </li>
                    ))}

                    </ul>
                )}
                </div>

                <div className = 'total'>
                <h3>Total: {getTotalPrice()}$</h3>
                </div>
            </div>
        </>
    );
  }

