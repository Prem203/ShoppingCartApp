// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

export default function MyFirebase() {
  const firebaseConfig = {
  apiKey: "AIzaSyCWe6C6rm3wtQhxlX24IRIjOIJDUzlF6Y8",
  authDomain: "pdpproj-37201.firebaseapp.com",
  projectId: "pdpproj-37201",
  storageBucket: "pdpproj-37201.appspot.com",
  messagingSenderId: "341771127779",
  appId: "1:341771127779:web:8039ad3a16f9dd786e2ed6",
  measurementId: "G-K5HQEL793Z",
  };

  const app = initializeApp(firebaseConfig);
  const myDatabase = getFirestore(app);

  const me = {};

  me.getProducts = async () => {
    const products = [];
    const productsRef = collection(myDatabase, "products");
    const snapProducts = await getDocs(productsRef);
    for (const doc of snapProducts.docs) {
      console.log(doc.id, " => ", doc.data());
      products.push({ id: doc.id, data: doc.data() });
    }
    return products;
  };

  me.addProductsToCart = async (product) => {
    console.log("Adding products to cart", product);
    let response = {};
    const cartprodRef = collection(myDatabase, "cart");
    console.log("cartRef", cartprodRef);
    try {
      const { id, data } = product;
      const prodDocRef = doc(cartprodRef, id);
      await setDoc(prodDocRef, {
        name: data.name,
        price: data.price,
      });
      console.log("Products added to cart successfully");
      response = {
        success: true,
        message: "Products added to cart successfully",
      };
      return response;
    } catch (error) {
      console.error("Error adding products to cart:", error);
      response = { success: false, message: "Failed to add products to cart" };
      return response;
    }
  };

  me.getCartProducts = async () => {
    const products = [];
    const productsRef = collection(myDatabase, "cart");
    const snapProducts = await getDocs(productsRef);
    for (const doc of snapProducts.docs) {
      console.log(doc.id, " => ", doc.data());
      products.push({ id: doc.id, data: doc.data() });
    }
    return products;
  };

  me.removeProductsfromCart = async (product) => {
    console.log("Removing products from cart", product);
    let response = {};
    const cartRef = collection(myDatabase, "cart");
    console.log("cartRef", cartRef);
    try {
      await deleteDoc(doc(cartRef, product.id));
      console.log("Products removed from cart successfully");
      response = {
        success: true,
        message: "Products removed from cart successfully",
      };
      return response;
    } catch (error) {
      console.error("Error removing products from cart:", error);
      response = {
        success: false,
        message: "Failed to remove products from cart",
      };
      return response;
    }
  };
  
  return me;
}



export const firebaseConfigInstance = new MyFirebase();
