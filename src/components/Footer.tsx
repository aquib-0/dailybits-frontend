import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='w-full h-[10vh] flex justify-start sm:justify-center items-center px-10 border-t'>
      <ul className='hidden sm:flex gap-x-5 font-light'>
        <li><Link to='/'>Help</Link></li>  {/*TO-DO - Implement help page for any necessary navigation help or any other queries.*/}
        <li><Link to='/'>Status</Link></li>
        <li><Link to='/'>About</Link></li>
        <li><Link to='/'>Careers</Link></li>
        <li><Link to='/'>Press</Link></li>
        <li><Link to='/'>Blogs</Link></li>
        <li><Link to='/'>Store</Link></li>
        <li><Link to='/'>Privacy</Link></li>
        <li><Link to='/'>Rules</Link></li>
        <li><Link to='/'>Terms</Link></li>
      </ul>

      <ul className='flex sm:hidden gap-x-5 font-light'>
        <li><Link to='/'>About</Link></li>
        <li><Link to='/'>Help</Link></li>  {/*TO-DO - Implement help page for any necessary navigation help or any other queries.*/}
        <li><Link to='/'>Blogs</Link></li>
        <li><Link to='/'>Store</Link></li>
        {/* <li><Link to='/'>Status</Link></li> */}
        {/* <li><Link to='/'>Careers</Link></li> */}
        {/* <li><Link to='/'>Press</Link></li> */}
        
        {/* <li><Link to='/'>Privacy</Link></li> */}
        {/* <li><Link to='/'>Rules</Link></li> */}
        {/* <li><Link to='/'>Terms</Link></li> */}
      </ul>
    </div>
  )
}

export default Footer
