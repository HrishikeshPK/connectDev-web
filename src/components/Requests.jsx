// import axios from "axios"
// import { BASE_URL } from "../utils/constants"
// import { useDispatch, useSelector } from "react-redux"
// import { addRequests } from "../utils/requestSlice"
// import { useEffect } from "react"

// const Requests = () => {

//     const dispatch = useDispatch()

//     const requests = useSelector((store)=> store.requests)
//     const fetchRequests = async ()=> {
//         try {
//             const res = await axios.get(BASE_URL +"/user/requests/received", {withCredentials: true})
//             dispatch(addRequests(res.data.data))
//         } catch (err) {
//             console.log(err)
//         }
//     }

//     useEffect(()=>{
//         fetchRequests()
//     },[])

//     if (!requests) return

//     if(requests.length ===0) return <h1>No Connections found</h1>
//   return (

//     <div>
//         <div className='flex justify-center my-10'>
//             <h1 className='font-bold text-3xl'>Requests</h1> 
//         </div>

//         {requests.map((request)=> {
//           const {_id, firstName, lastName, photoUrl, age, gender, about } = request

//         return (
//           <div key={_id} className="flex justify-center">
//           <div className="card bg-base-300 w-96 shadow-xl">
//     <figure>
//       <img
//         src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
//         alt="Shoes" />
//     </figure>
//     <div className="card-body">
//       <div className="card-actions justify-end">
//       <button className="btn btn-secondary">Reject</button>
//       <button className="btn btn-primary">Accept</button>
//       </div>
//     </div>
//   </div>
//           </div>
//         )  
//         })}

 
//     </div>
//   )
// }

// export default Requests

import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect, useState } from "react";

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector((store) => store.requests);
    const [error, setError] = useState(null);

    const reviewRequest = async (status, _id) => {
        try {
            const res = axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {}, {withCredentials: true})   // post call il data send cheyyuniila so second para  should be empty
            dispatch(removeRequest(_id))
        } catch (err) {
            err.message
        }
    }

    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests/received", { withCredentials: true });
            console.log(res.data.data)
            dispatch(addRequests(res.data.data));
        } catch (err) {
            setError("Failed to fetch requests. Please try again later.");
            console.error(err);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    if (error) return <h1>{error}</h1>;
    if (!requests) return <h1>Loading...</h1>;
    if (requests.length === 0) return <h1>No Requests Found</h1>;

    return (
        <div>
            <div className="flex justify-center my-10">
                <h1 className="font-bold text-3xl">Requests</h1>
            </div>
            {requests.map((request) => {
                const { _id, firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;

                return (
                    <div key={_id} className="flex justify-center">
                        <div className="card bg-base-300 w-96 shadow-xl">
                            <figure>
                                <img
                                    src={photoUrl || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
                                    alt={`${firstName} ${lastName}`}
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{firstName} {lastName}</h2>
                                <p>{about || "No information provided"}</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-secondary" onClick={() => reviewRequest("rejected", request._id)}>Reject</button>
                                    <button className="btn btn-primary" onClick={() => reviewRequest("accepted", request._id)}>Accept</button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Requests;
