import { useEffect, useState } from "react"
import { getMongo } from "../services/ApiServices"

const TestMongo = () =>{
    const [data,setData] = useState([])
    const getData = async() =>{
        let respose = await getMongo();
        console.log(respose)
    }
    useEffect(()=>{
        getData()
    },[])
    return(
        <>
            test
        </>
    )
}
export default TestMongo