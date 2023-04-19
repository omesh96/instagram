import React from 'react'
import "../css/Home.css"

const Home = () => {
  return (
    <div className='home'>
      {/* card */}

      <div className="card">
        {/* card header */}
        <div className="card-header">

          <div className="card-pic">
            <img src="https://images.unsplash.com/photo-1607283817061-bac25eeaefab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=804&q=80" 
            alt="" />
          </div>
          <h5>Omesh</h5>
        </div>

         {/* card image */}

         <div className="card-image">
          <img src="https://images.unsplash.com/photo-1681407980201-9c1e64d5f502?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80"
           alt="" />
         </div>
 
      {/* card content */}

      <div className="card-content">
      <span className="material-symbols-outlined">favorite</span>
      <p>1 Like</p>
      <p>This is Amazing..!</p>
      </div>

      {/* add comment */}

     <div className="add-comment">
     <span className="material-symbols-outlined">mood</span>
     <input type="text" placeholder='Add a Comment' />
     <button className='comment'>Post</button>
     </div>

      </div>
    </div>
  )
}

export default Home