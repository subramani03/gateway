import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import FormContext from '../Utils/FormContext';

const Navbar = () => {
  const location = useLocation().pathname;
  const {formData}=useContext(FormContext);
  const [sticky, setSticky] = useState(false);
  const navigate = useNavigate();
  window.addEventListener('scroll', () => {
    if (window.scrollY > 550) {
      setSticky(true)
    } else {
      setSticky(false)
    }
  });
  return (
    <div className={`navbar ${location === '/' ? 'text-white fixed' : 'bg-zinc-950 shadow-lg'} ${sticky ? 'bg-zinc-950 shadow-lg ' : ''} z-30`}>
      <div className="flex-1 cursor-pointer" onClick={() => { navigate('/') }}>
        <div tabIndex={0} className="avatar mx-2">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src={formData?.logo} />
          </div>
        </div>
        <a className="text-lg sm:text-xl md:text-2xl lg:text-2xl font-semibold ">{formData?.name}</a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end z-20">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-zinc-950 rounded-box z-1 mt-3 w-52 p-2 shadow-md text-primary font-semibold">
            {
              /^\/admin.*/.test(location) ? (
                <>
                  <li>
                    <Link to={'/admin'} >Registration Details</Link>
                  </li>
                  <li>
                    <Link to={'/admin/SymposiumDetails'} >Edit Event Details</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to={'/'} >Home</Link>
                  </li>
                  <li>
                    <Link to={'/event'} >Events</Link>
                  </li>
                  {/* <li>
                    <Link to={'/about'} >About</Link>
                  </li> */}
                  {/* <li>
                    <a href="https://heyzine.com/flip-book/81d488f5af.html" target="_blank">Magazines</a>
                  </li> */}
                </>
              )
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
