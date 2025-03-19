import JWT from "jsonwebtoken"
import bcrypt from "bcrypt"

  export  const jwtoken=(id)=>{
 const token = JWT.sign({id},process.env.SECRET_KEY,{expiresIn:"90d"})

 return token;
}

 export const verifyToken=(token)=>{
const verifytoken= JWT.verify(token,process.env.SECRET_KEY)
return verifytoken;
 }



export const comparePassword = async (userPassword, hashedPassword) => {
  return await bcrypt.compare(userPassword, hashedPassword);
};
