import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'

const Connections = () => {

    const connections = useSelector((store) => store.connections)
    const dispatch = useDispatch()

    const fetchConnections = async ()=> {
        try {
            const res = await axios.get(BASE_URL+"/user/connections",{ withCredentials: true})
            console.log(res.data.data)
            dispatch(addConnections(res.data.data))
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(()=>{
        fetchConnections()
    },[])

    if (!connections) return

    if(connections.length ===0) return <h1>No Connections found</h1>
  return (
    <div >
        <div className='flex justify-center my-10'>
            <h1 className='font-bold text-3xl'>Connections</h1> 
        </div>

        {
          connections.map((connection)=> {
            const {_id, firstName, lastName, photoUrl, age, gender, about } = connection

            return (
              <div key={_id} className='flex justify-center'>
       <div className="card card-side bg-base-300 shadow-xl w-1/2 ">
  <figure>
    <img
      src={photoUrl}
      alt="Movie" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName+" "+lastName}</h2>
    { age && gender && <p>{age + ", " + gender}</p> }
    <p>{about}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Message</button>
    </div>
  </div>
</div>
       </div>
            )
          })
        }
       
    </div>    
  )
}

export default Connections