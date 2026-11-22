import type { Request, Response } from "express";
import { getProducts, addProduct, getProduct, deleteProduct, updateProduct, getRecentProducts } from "../db/queries/productQueries.js";

const getProductsHandler = async (req: Request, res: Response) => {
  const { category, search, sort, offset } = req.query;

  console.log(typeof category, typeof search, typeof sort, typeof offset);

  // get filtered products
  const { error, data, count } = await getProducts(
    String(search ?? ""),
    String(sort),
    String(category ?? "All"),
    String(offset ?? 0),
  );

  if (error) {
    res.status(400).json({ error });
  }

  res.json({
    status: "success",
    data,
    count,
  });
};

const addProductHandler = async (req: Request, res: Response) => {
  const productBody = req.body;

  console.log("productBody", productBody);

  // add product
  const { error, product } = await addProduct(productBody);

  if (error) {
    console.log("error", error);
    return res.status(400).json({ error });
  }

  res.json({
    status: "success",
    data: product,
    message: "product added successfully",
  });
};

const deleteProductHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  // check if product exists
  const {product, error} = await getProduct(id);

  if (error) {
    return res.status(404).json({error: {
      message: 'product does not exist'
    }})
  };

  // delete product
  const {product: deletedProduct, error: deleteError} = await deleteProduct(id);

   if (deleteError) {
    return res.status(404).json({error: {
      message: 'product does not exist'
    }})
  };

 res.json({
    status: "success",
    data: deletedProduct,
    message: "product deleted successfully",
  });  
};

const updateProductHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const productBody = req.body;

  // CHECK IF PRODUCT EXISTS
  const { product, error } = await getProduct(id);

  if (error) {
    return res.status(404).json({
      error: {
        message: error.message,
      },
    });
  }

  // UPDATE PRODUCT
  const { product: updatedProduct, error: updateError } = await updateProduct(id, productBody);

  if (updateError) {
    return res.status(400).json({error: updateError});
  }

  res.json({
    status: "success",
    data: updatedProduct,
    message: "product updated successfully",
  });
};

const getProductHandler = async (req: Request, res: Response) => {
  const {id} = req.params;

   // CHECK IF PRODUCT EXISTS
  const { product, error } = await getProduct(id);

  if (error) {
    return res.status(404).json({
      error: {
        message: error.message,
      },
    });
  }

  res.json({
    status: 'success',
    data: product
  })
}

const getRecentProductsHandler = async (req: Request, res: Response) => {

  // get recent products
  const { products, error } = await getRecentProducts();

  if (error) {
    return res.status(404).json({
      error: {
        message: error.message,
      },
    });
  }

  res.json({
    status: 'success',
    data: products,
    count: products[0].count
  })
}

export { getProductsHandler, addProductHandler, deleteProductHandler, updateProductHandler, getProductHandler, getRecentProductsHandler };
