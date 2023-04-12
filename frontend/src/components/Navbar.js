import { Link } from 'react-router-dom'

import useLogout from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    return (
        <header>
            <div>
                <Link to='/'><h1>Car<span className='blue'>Sales</span></h1></Link>
            </div>
            <nav>
                {user && <Link onClick={() => logout()}>Logout</Link>}
                {!user && <Link to='/login'>Login</Link>}
                {!user && <Link to='/signup'>Signup</Link>}
                <Link to='/sell'>Sell Car</Link>
            </nav>
        </header>
    )
}


export default Navbar