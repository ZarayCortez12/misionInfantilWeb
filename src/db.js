import mongoose from "mongoose";

export const connectDB =  async () => {
    try{
        await mongoose.connect("mongodb+srv://misionesinfantilesweb:P4MsXnVB0dSXjLu4@misionesinfantiles.irlgnxe.mongodb.net/misionesInfantiles?retryWrites=true&w=majority");
        console.log("Database Connect");
    } catch(error){  
        console.log("Database Error"); 
    }
   
}