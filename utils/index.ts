import { compare, hash } from "bcryptjs";

export const hashPassword = async (password: string) => {
  const hashedPassword = await hash(password, 10);
  
  return hashedPassword;
};


export const comparePassword=async(pass:string,hashpass:string)=>{
  const isSame=await compare(pass,hashpass)
  return isSame
}
