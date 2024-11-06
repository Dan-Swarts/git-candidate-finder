import { Link } from "react-router-dom";
import './nav.css'

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <div className="navBar">
      <Link to='/'>
        <div>Home</div>
      </Link>

      <Link to='/SavedCandidates'>
        <div>savedcandidates</div>
      </Link>
    </div>
  )
};

export default Nav;
