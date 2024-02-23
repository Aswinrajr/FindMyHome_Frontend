import axios from "axios"
import { useEffect } from "react"
import { useSelector } from "react-redux"


const Dashboard = () => {
  const provider = useSelector((state)=>state.providerAuth.provider)
  console.log("provider: ",provider)
  useEffect(()=>{
    const completeData = axios.post("/provider/completedata",provider)
    console.log(completeData)

  },[])
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard