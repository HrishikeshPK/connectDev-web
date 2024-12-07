

const UserCard = ({user}) => {
    console.log(user)
    const { firstName, lastName, photoUrl, age, gender, about } = user

  return (
    user && (
    <div className="card bg-base-300 w-96 shadow-xl">
  <figure>
    <img
      src={photoUrl}
      alt="photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName +" "+ lastName}</h2>
    {age && gender && <p>{age + ", " + gender}</p>}
    <p>{about}</p>
    <div className="card-actions justify-around">
      <button className="btn btn-secondary">Ignore</button>
      <button className="btn btn-primary">Interested</button>
    </div>
  </div>
</div>)
  )
}

export default UserCard