import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
        <Link className="navbar__link" to="/">
          Tour Clarksville
        </Link>
        <li className="navbar__item">
          <Link className="navbar__link" to="/NewReview">
            Review Form
          </Link>
        </li>
        <li className="navbar__item">
          <Link className="navbar__link" to="/ReviewList">
            Reviews
          </Link>
        </li>
      
        {
                localStorage.getItem("site_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("site_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}
