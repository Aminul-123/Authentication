import {connect } from "@/database/dbConnection"
import User from "@/models/userModels";
import bcryptjs from "bcryptjs";


import { NextRequest, NextResponse } from "next/server";

connect()
export  async  function  POST(req:NextRequest) {
    try {
        const body = await req.json()
        const {username , email, password } =body
       // const data ={ username , email, password};
       // console.log(data)
      let user= await User.findOne({email})
      if(user ) {
        return NextResponse.json({error: "User already Exist"}, {status: 404})
      }
      const salt =await bcryptjs.genSalt(10)
      const hashedPassword = await bcryptjs.hash(password, salt)
      await User.create({
        username,
        email,
        password:hashedPassword
      })
      return NextResponse.json({message: "User Registered successfully"}, {status: 201})

    }
     catch( error:any) {
        //console.log(error);
        return NextResponse.json({error:error.message}, {status:500})
     }
}