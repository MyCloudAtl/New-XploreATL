import { Link } from 'react-router-dom'

export default function NavBar() {
    return (
    <div className="NavBar">
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/eateries">
          <button>Eateries</button>
        </Link>
        <Link to="/hotspots">
          <button>HotSpots</button>
        </Link>
    </div>
    )
}