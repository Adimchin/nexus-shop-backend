import { checkUserExists } from "../db/queries/usersQueries.js";
import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const jwtToken = req.cookies.jwt;

  if (!jwtToken || jwtToken === "") {
    return res.status(401).json({
      error: {
        message: "user is unauthorized or not logged in",
      },
    });
  }

  // verify jwt token
  
  const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET!);

  if (typeof decoded === "string" || !decoded.userId) {
  throw new Error("Invalid token payload");
}


  //verify user still exists
  const usersList = await checkUserExists(decoded.userId); 

if(usersList.length <= 0){
  return res.json({error: {
    message: 'user does not exist'
  }})
};

  next();
};
