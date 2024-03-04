import React, {useState, useEffect, useRef} from 'react';
import"../Styles/EditProduct.css";
import { Link } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { firebaseConfigInstance } from '../Models/MyFireBaseConfig';

export default function EditProduct() {

    const nameRef = useRef();
    const priceRef = useRef();
    const [products] = useState();
    const searchParams = new URLSearchParams(window.location.search);
    const prodID = searchParams.get("productid");
    const prodName = searchParams.get("productname");
    const prodPrice = searchParams.get("productprice");

    useEffect(() => {
        console.log("Prod to edit!!", prodName);
        console.log("Prod to edit!!", prodPrice);
        nameRef.current.value = prodName;
        priceRef.current.value = prodPrice;
    }, []);
    
    const onEditAction = () => {
            editProduct({
            productID: prodID,
            name: nameRef.current.value,
            price: +priceRef.current.value,
          });
      };

    const editProduct = async (product) => {
        try {
            console.log('Product editted successfully!', product);
            await firebaseConfigInstance.editProduct(product);
            console.log('Product editted successfully!');
            alert("Product Editted!!");
            fetchDetails(prodID);
        } catch (error) {
            console.error('Error edit product to cart:', error);
        }
    };

    const fetchDetails = async (prodID) => {
        try{
            console.log("Fetching updated value", prodID);
            const prodRef = await firebaseConfigInstance.getProductById(prodID);
            nameRef.current.value = prodRef.name;
            priceRef.current.value = prodRef.price;
        } catch(error) {
            console.log('Error while fetching updated values:', error);
        }
    };


  return (
        <>
            <div className='headss'>
            <div className="navbarsss" style={{ backgroundColor: "#cccccc" }}>
                <h2>Edit Product</h2>
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
            <button type="button" className="btn btn-success" onClick={onEditAction}>
                Edit Product
            </button>
            </div>

            </div>
        </>
  )
}
