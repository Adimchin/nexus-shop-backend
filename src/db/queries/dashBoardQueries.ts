import { db } from "../db.js";

const getDashboardStats = async () => {
  try {
  const sql = `
    SELECT COUNT(*) AS total_products , COUNT(*) FILTER (WHERE featured = true) AS featured_products , COUNT(DISTINCT category) AS total_categories, COUNT(*) FILTER (WHERE stock < 10) AS low_stock
    FROM products;
  `;
  const result = await db.query(sql);
  return { stats: result.rows[0] };
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      return {
        error: {
          message: err.message,
        },
      };
    }
    console.log("An error occured in the database");
    return {
      error: {
        message: "An error occured in the database",
      },
    };
  }
};

export { getDashboardStats };