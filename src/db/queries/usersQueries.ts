import {db} from '../db.js';

export const checkUserExists = async (userId: string) => {

  try{
  const result = await db.query(`
    SELECT * 
    FROM users
    WHERE id = $1
    `, [userId]);

  return result.rows[0];
  } catch(err){
    if(err instanceof Error){
       console.log(err.message);
        db.end();
    process.exit(1)
    }
    console.log('An error occured'); 
    db.end();
    process.exit(1)
  }
};