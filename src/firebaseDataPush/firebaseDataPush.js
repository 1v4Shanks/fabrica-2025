import { db, collection, addDoc } from "./firebaseDataConfig";
import products from "../assets/assets";

const addProductsToFirestore = async () => {
  try {
    for (const product of products) {
      await addDoc(collection(db, "products"), {
        _id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        category: product.category,
        subCategory: product.subCategory,
        sizes: product.sizes,
        date: product.date,
        bestseller: product.bestseller,
        keywords: product.keywords,
      });
      console.log(`Product ${product.name} added successfully!`);
    }
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

export default addProductsToFirestore;
