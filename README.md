# ShoppingCartApp
This is a simple shopping cart application, that allows users to add/remove products to the cart, create, update, delete products from the total list of available products. The application makes use of Firestore database to store a list of collections which are:

- Products (Database Collection) The list of available products with the attributes (ID, Name, Price, Image). Functionalities:
- Users can create a new product with the attributes (Name, Price, Image)
- Users can update an existing product whose attributes are (Name, Price & Image)
- Users can also delete a product from the database


## Getting Started
To get a local copy up and running, follow these simple steps.
1.Make sure you have the latest version of NodeJS installed using the command:

```bash
npm install npm@latest -g
```

2.Clone the repository using the following command:

```bash
git clone https://github.com/Prem203/ShoppingCartApp.git
```

3.To install package dependencies, use the following command:

```bash
npm install
```

4.To run the program:

```bash
npm run dev
```

5.If any errors, persist make sure you have Firebase installed:

```bash
npm install --save firebase
```

## License
The project is licensed user MIT and is publicly available to all for use.

## Video Demo

## Web Hosting:
The project is currently hosted using Firebase, kindly use this link:
https://pdpproj-37201.firebaseapp.com/
