import { db } from "../db.js";

const getProducts = async (search: string, sort: string, category: string) => {
  let sql = "SELECT * FROM products ";

  if (category !== "All" && category) {
    sql += "WHERE category = $1";
  }

  if (search && search.trim() !== "") {
    sql += "AND ILIKE name (%$2%)";
  }

  if (sort === "newest-first") {
    sql += "ORDER BY created_at DESC";
  }

  if (sort === "oldest-first") {
    sql += "ORDER BY created_at ASC";
  }

  try {
    const products = await db.query(sql);
    return products;
  } catch (err) {
    if (err instanceof Error) {
      console.log("ERROR", err.message);
      await db.end();
      process.exit(1);
    }
    console.log("An error occured");
    await db.end();
    process.exit(1);
  }
};

export {getProducts}