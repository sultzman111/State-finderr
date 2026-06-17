import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div >
  <div className='bg-blue-700 p-20 rounded-2xl'>
<div> Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
     Nostrum accusamus fugit repudiandae minima pariatur veniam nihil uM<br/>nde porro eaque,
     delectus assumenda cupiditate placeat a esse cumque. <br />Aliquam, voluptates harum. Eligendi!
</div>
<div className='mb-10 mt-29 text-3xl text-white font-sans font-bold'> The world number 1 state finder</div>

 {/* Right side: Authentication links (Marked Yellow) */}
       <div className="flex items-center">
         <ul className="flex items-center gap-6 m-0 p-0 list-none">
          
           <li>
             <Link to="/SignIn" className="text-[15px] font-medium text-white no-underline border border-blue-600 rounded px-4 py-2 hover:bg-blue-600 hover:text-white transition-all duration-200">
               Sign in
             </Link>
           </li>
         </ul>
       </div>

</div>
<div>
<div>Our top recommended offers</div>





</div>




    </div>
  )
}

export default Home