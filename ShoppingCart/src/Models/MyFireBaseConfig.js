// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  getDoc,
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

  me.addNewProduct = async (product) => {
    console.log("Adding new product", product);
    let response = {};
    const productsRef = collection(myDatabase, "products");
    console.log("productsRef", productsRef);
    try {
      await setDoc(doc(productsRef), {
        name: product.name,
        price: product.price,
      });
      console.log("New product added successfully");
      response = { success: true, message: "New product added successfully" };
      return response;
    } catch (error) {
      console.error("Error adding new product:", error);
      response = { success: false, message: "Failed to add new product" };
      return response;
    }
  };

  me.removeProductsFromCart = async (product) => {
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

  me.updateProduct = async (product) => {
    console.log("Updating product", product);
    const productRef = doc(myDatabase, "products", product.productId);
    try {
      await setDoc(productRef, {
        productName: product.productName,
        productPrice: product.productPrice,
      });
      console.log("Product updated successfully");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  me.deleteProduct = async (product) => {
    console.log("Deleting products", product);
    const productReference = collection(myDatabase, "products");
    const cartReference = collection(myDatabase, "cart");
    try {
      await deleteDoc(doc(productReference, product.id));
      await deleteDoc(doc(cartReference, product.id));
      console.log("Products removed from cart successfully");
    } catch (error) {
      console.error("Error removing products from cart:", error);
    }
  };

  me.getProductById = async (productId) => {
    const productRef = doc(myDatabase, "products", productId);
    try {
      const productDoc = await getDoc(productRef);
      if (productDoc.exists()) {
        return productDoc.data();
      } else {
        console.log("No such product exists!");
        return null;
      }
    } catch (error) {
      console.error("Error getting product:", error);
      return null;
    }
  };

  me.editProduct = async (product) => {
    console.log("Updating product", product.productID);
    const productRef = doc(myDatabase, "products", product.productID);
    console.log("Updating product", product.productID);
    try {
      await setDoc(productRef, {
        name: product.name,
        price: product.price,
      });
      console.log("Product updated successfully");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return me;
}

export const firebaseConfigInstance = new MyFirebase();
