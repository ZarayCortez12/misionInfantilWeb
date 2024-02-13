import mongoose from "mongoose";

export const connectDB =  async () => {
    try{
        await mongoose.connect("mongodb+srv://misionesinfantilesweb:P4MsXnVB0dSXjLu4@misionesinfantiles.irlgnxe.mongodb.net/misionesInfantiles?retryWrites=true&w=majority");
        console.log("Database is connect");
    } catch(error){  
        console.log("Database Error"); 
    }
   
}