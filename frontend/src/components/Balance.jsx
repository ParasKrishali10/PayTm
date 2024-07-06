import axios from "axios"
import { useEffect, useState } from "react"
export const Balance=({value})=>{
    const [balance,setBalance]=useState(1000);
    useEffect(()=>{
        const fetchBalance=async()=>{
            const response=await axios.get("http://localhost:3000/api/v1/account/balance",{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            })
            setBalance(response.data.balance)
        }
        fetchBalance()
    },[])
    return <div className="flex">
        <div className="font-bold text-lg pt-3 ml-5">
            Your balance RS {balance}
        </div>
    </div>
}