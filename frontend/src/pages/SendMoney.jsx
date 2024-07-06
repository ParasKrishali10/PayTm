import {useSearchParams} from 'react-router-dom'
import axios from "axios"
import { useState } from 'react';
export const SendMoney=()=>{
    const [searchParams]=useSearchParams();
    const[amount,setAmount]=useState(0)
    const id=searchParams.get("id");
    const name=searchParams.get("name")
    return <div className="flex justify-center h-screen bg-gray-100">
        <div className="h-full flex flex-col justify-center">
            <div className="shadow border h-96 w-96 bg-white">
                <div className="pt-5 font-semibold text-2xl">
                    Send Money
                </div>
                <div className="flex mt-24 ml-10">
                    <div className=" font-semibold text-lg text-white rounded-full w-10 h-10 bg-green-500 ">
                        <div className="mt-1">
                        {name[0]}
                        </div>
                        
                    </div>
                    <div className="ml-3 font-bold text-xl mt-1">
                        {name}
                    </div>
                </div>
                <div className="font-semibold text-left mt-3 ml-12">
                    Amount (in Rs)
                </div>
                <div className="flex p-3 px-4 ml-6 rounded-md  ">
                    <input onChange={(e)=>{
                            setAmount(e.target.value)
                    }} type="number" placeholder="Enter Amount" className=" h-10 w-full p-2 mr-4"/>
                </div>
                <div className="p-2">
                    <button onClick={()=>{
                        axios.post("http://localhost:3000/api/v1/account/transfer",{
                            to:id,
                            amount
                        },{
                            headers:{
                                Authorization:`Bearer ${localStorage.getItem("token")}`
                            }
                        })
                        alert("Transfer Successful")
                    }} className="bg-green-500 h-10 w-80 rounded-md text-white" >Initiate Transfer</button>
                </div>
            </div>
        </div>
    </div>
}