import "dotenv/config.js";
import { Pool } from "pg";

// create postgres client
const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// products data

const products = [
  {
    name: "Wireless Headphones",
    description:
      "Over-ear wireless headphones with immersive sound, noise isolation, and a long-lasting battery.",
    price: "45000.00",
    image: "https://placehold.co/600x600?text=Wireless+Headphones",
    category: "Audio",
  },
  {
    name: "Smart Watch",
    description:
      "A stylish smartwatch with fitness tracking, heart rate monitoring, and smartphone notifications.",
    price: "65000.00",
    image: "https://placehold.co/600x600?text=Smart+Watch",
    category: "Wearables",
  },
  {
    name: "Bluetooth Speaker",
    description:
      "A portable Bluetooth speaker with clear audio, deep bass, and a rechargeable battery.",
    price: "28000.00",
    image: "https://placehold.co/600x600?text=Bluetooth+Speaker",
    category: "Audio",
  },
  {
    name: "Mechanical Keyboard",
    description:
      "A durable mechanical keyboard with tactile switches, responsive typing, and adjustable backlighting.",
    price: "52000.00",
    image: "https://placehold.co/600x600?text=Mechanical+Keyboard",
    category: "Accessories",
  },
  {
    name: "Wireless Mouse",
    description:
      "An ergonomic wireless mouse with adjustable sensitivity and reliable connectivity for everyday work.",
    price: "18000.00",
    image: "https://placehold.co/600x600?text=Wireless+Mouse",
    category: "Accessories",
  },
  {
    name: "USB-C Hub",
    description:
      "A compact USB-C hub with multiple ports for connecting displays, storage devices, and accessories.",
    price: "22000.00",
    image: "https://placehold.co/600x600?text=USB-C+Hub",
    category: "Accessories",
  },
  {
    name: "Laptop Backpack",
    description:
      "A water-resistant backpack with a padded laptop compartment and organized storage for daily essentials.",
    price: "35000.00",
    image: "https://placehold.co/600x600?text=Laptop+Backpack",
    category: "Bags",
  },
  {
    name: "Power Bank",
    description:
      "A high-capacity portable power bank for charging smartphones and other compatible devices on the go.",
    price: "25000.00",
    image: "https://placehold.co/600x600?text=Power+Bank",
    category: "Power & Charging",
  },
  {
    name: "Webcam HD",
    description:
      "A high-definition webcam with clear video, built-in microphone, and easy USB connectivity for meetings.",
    price: "30000.00",
    image: "https://placehold.co/600x600?text=HD+Webcam",
    category: "Computer Accessories",
  },
  {
    name: "Gaming Controller",
    description:
      "A comfortable wireless gaming controller with responsive buttons and precise analog sticks.",
    price: "40000.00",
    image: "https://placehold.co/600x600?text=Gaming+Controller",
    category: "Gaming",
  },
];

// seeding products table

async function seedProducts() {
  console.log('seeding products');
  try {
    for (const product of products) {
      await db.query(
        `
        INSERT INTO products (name, description, price, image, category)
        VALUES ($1, $2, $3, $4, $5);
        `,
        [product.name, product.description, product.price, product.image, product.category],
      );
    }
    console.log('seeding successul');
  } catch (err) {
    if (err instanceof Error) {
      console.log("ERROR", err.message);
      await db.end();
      process.exit(1);
    }
    console.log("An error occured");
    await db.end();
    process.exit(1);
  } finally{
    await db.end();
    process.exit(1);
  }
  
}

seedProducts();
