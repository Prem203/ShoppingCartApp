import React, {useState, useEffect, useRef} from 'react';
import"../Styles/AddProduct.css";
import { Link } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { firebaseConfigInstance } from '../Models/MyFireBaseConfig';

export default function AddProduct() {

    const nameRef = useRef();
    const priceRef = useRef();
    const [products] = useState([]);

    const onAddProduct = () => {
            addNewProduct({
            name: nameRef.current.value,
            price: +priceRef.current.value,
          });
      };

    const addNewProduct = async (productName) => {
        try {
            await firebaseConfigInstance.addNewProduct(productName);
            console.log('Product added to cart successfully!');
            alert("New Product Added!!");
            window.location.reload();
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };


  return (
        <>
            <div className='headss'>
            <div className="navbarsss" style={{ backgroundColor: "#cccccc" }}>
                <h2>Add Product</h2>
                <Link to="/">
                    <FaHome className="iconsss" />
                </Link>
            </div>
            </div>

            <div className='addprods'>
            <div className="input-group mb-3" style={{ width: '500px', margin: '0 auto'}}>
                <span className="input-group-text" id="inputGroup-sizing-default">
                    Product Name
                </span>
                <input
                    type="text"
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                    title="Enter product name"
                    ref={nameRef}
                    required
                />
            </div>


            <div className="input-group" style={{ width: '500px', margin: '0 auto' }}>
            <span className="input-group-text" id="inputGroup-sizing-default">
                    Price
                </span>
                <input
                type="number"
                className="form-control"
                aria-label="Dollar amount (with dot and two decimal places)"
                min="0"
                step="0.01"
                title="Enter a valid numeric value"
                ref={priceRef}
                required
                />
                <span className="input-group-text">$</span>
            </div>

            <div className='addbuttons'>
            <button type="button" className="btn btn-success" onClick={() => onAddProduct(products)}>
                Add Product
            </button>
            </div>

            </div>
        </>
  )
}
