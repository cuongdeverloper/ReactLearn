import { useEffect, useState } from "react";
import { getApiCustomerMongoDB } from "../../services/ApiServices"

const TestApi = () =>{
    const [api,setApi] = useState([]);
    const getApi = async() =>{
        let data = await getApiCustomerMongoDB();
        setApi(data)
        console.log('check api',data)
    }
    useEffect(()=>{
        getApi();
    },[])
    return(
        <div>
            TEST API
            {/* {api && api.length > 0 && api.map((item,index) =>{
                <p>{item}</p>
            })} */}
        </div>
    )
}
export default TestApi