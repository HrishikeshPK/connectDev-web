import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'



const Admin = () => {

  const [users, setUsers] = useState([])
  const [searchKey, setSearchKey] = useState("")

  const [selectedUser, setSelectedUser] = useState(null);

const openModal = (user) => {
  setSelectedUser(user);
  document.getElementById('my_modal_5').showModal();
};


  const getUser = async (searchKey)=>{
    try {
      const res = await axios.get(`${BASE_URL}/admin/feed?search=${searchKey}`)
      console.log(res.data)
      setUsers(res.data)
    } catch (err) {
      console.log(err.message)
    }
  }
  useEffect(() => {
    const timeout = setTimeout(() => {
      getUser(searchKey);
    }, 500); // Adjust debounce delay as needed
  
    return () => clearTimeout(timeout);
  }, [searchKey]);
  

  const deleteUser = async (userId) => {
    try {
      const res = await axios.delete(`${BASE_URL}/admin/user/${userId}`)
      alert(res.data.message); 
      setUsers(users.filter(user => user._id !== userId))
    } catch (err) {
      console.error(err);
      alert("Failed to delete user");
    }
  };
  


  return (
    <>
    <div className='m-auto my-3 w-[300px] '>
    <label className="input input-bordered flex items-center gap-2">
  <input onChange={e=> setSearchKey(e.target.value)} type="text" className="grow" placeholder="Search Users" />
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      fillRule="evenodd"
      d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
      clipRule="evenodd" />
  </svg>
</label>

    </div>
    
    <div className='pb-16'>
      <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        
        <th>Name</th>
        <th>About</th>
        <th>Gender</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        users.map(user => (
          <tr key={user._id}>
          
          <td>
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="mask mask-squircle h-12 w-12">
                  {
                    user.photoUrl ?<img
                    src={user.photoUrl}
                    alt="Avatar Tailwind CSS Component" /> : <img
                    src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                    alt="Avatar Tailwind CSS Component" />}
                </div>
              </div>
              <div>
                <div className="font-bold">{user.firstName+" "+user.lastName}</div>
                <div className="text-sm opacity-50">{user.age}</div>
              </div>
            </div>
          </td>
          <td>
            {user.about}
            <br />
            <span className="badge badge-ghost badge-sm">{user.skills}</span>
          </td>
          <td>{user.gender}</td>
          <th>
          <button className="btn" onClick={() => openModal(user)}>Details</button>
            {/* Open the modal using document.getElementById('ID').showModal() method */}


          </th>
        </tr>
        ))
       }
       <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    {selectedUser && (
      <>
        <h3 className="font-bold text-lg">{selectedUser.firstName} {selectedUser.lastName}</h3>
        <p className="py-4">{selectedUser.about}</p>
        <p>Gender: {selectedUser.gender}</p>
        <p>Age: {selectedUser.age}</p>
        <p>Skills: {selectedUser.skills}</p>
        <p>Created at: {selectedUser.trialStartDate}</p>
        <p>Payment Status: {selectedUser.paymentStatus}</p>
        <button className="btn btn-error mt-10" onClick={() => deleteUser(selectedUser._id)}>Remove User</button>
      </>
      
    )}
    <div className="modal-action">
      <form method="dialog">
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>

      {/* row 2 */}
     
    </tbody>
    {/* foot */}
    
  </table>
</div>
    </div>
    </>
  )
}

export default Admin





// import React, { useEffect, useState } from 'react'
// import { BASE_URL } from '../utils/constants'
// import axios from 'axios'



// const Admin = () => {

//   const [users, setUsers] = useState([])

//   const getUser = async ()=>{
//     try {
//       const res = await axios.get(BASE_URL+"/admin/feed")
//       console.log(res.data)
//       setUsers(res.data)
//     } catch (err) {
//       console.log(err.message)
//     }
//   }
//   useEffect(()=>{
//     getUser()
//   },[])

//   console.log(users)

//   return (
//     <div className='pb-16'>
//       <div className="overflow-x-auto">
//   <table className="table">
//     {/* head */}
//     <thead>
//       <tr>
        
//         <th>Name</th>
//         <th>About</th>
//         <th>Gender</th>
//         <th></th>
//       </tr>
//     </thead>
//     <tbody>
//       {/* row 1 */}
//       {
//         users.map(user => (
//           <tr key={user._id}>
          
//           <td>
//             <div className="flex items-center gap-3">
//               <div className="avatar">
//                 <div className="mask mask-squircle h-12 w-12">
//                   {
//                     user.photoUrl ?<img
//                     src={user.photoUrl}
//                     alt="Avatar Tailwind CSS Component" /> : <img
//                     src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
//                     alt="Avatar Tailwind CSS Component" />}
//                 </div>
//               </div>
//               <div>
//                 <div className="font-bold">{user.firstName+" "+user.lastName}</div>
//                 <div className="text-sm opacity-50">{user.age}</div>
//               </div>
//             </div>
//           </td>
//           <td>
//             {user.about}
//             <br />
//             <span className="badge badge-ghost badge-sm">{user.skills}</span>
//           </td>
//           <td>{user.gender}</td>
//           <th>
//           <button className="btn" onClick={()=>document.getElementById('my_modal_5').showModal()}>Details</button>
//             {/* Open the modal using document.getElementById('ID').showModal() method */}

// <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
//   <div className="modal-box">
//     <h3 className="font-bold text-lg">{user.firstName}</h3>
//     <p className="py-4">Press ESC key or click the button below to close</p>
//     <div className="modal-action">
//       <form method="dialog">
//         {/* if there is a button in form, it will close the modal */}
//         <button className="btn">Close</button>
//       </form>
//     </div>
//   </div>
// </dialog>
//           </th>
//         </tr>
//         ))
//        }
//       {/* row 2 */}
     
//     </tbody>
//     {/* foot */}
    
//   </table>
// </div>
//     </div>
//   )
// }

// export default Admin