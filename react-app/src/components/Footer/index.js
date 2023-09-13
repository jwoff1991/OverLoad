import { Link } from "react-router-dom/cjs/react-router-dom.min"
import './footer.css'


const Footer = () => {

    return (

        <div className="footer-fiv">

        <Link to='/my-story'>Story</Link>
        <Link to='https://github.com/jwoff1991'>Gitub</Link>
        <Link to='https://www.linkedin.com/in/jonathanbwofford/'>LinkedIn</Link>
        <Link to='https://myportfolio-jonathanwofford.netlify.app/'>Portfolio</Link>
        </div>

    )
}


export default Footer
