import { Link } from "react-router-dom/cjs/react-router-dom.min"
import './footer.css'


const Footer = () => {

    return (

        <div className="footer-fiv">

        <Link to='/my-story'>Story</Link>
        <a href='https://github.com/jwoff1991' target='_blank'>Gitub</a>
        <a href='https://www.linkedin.com/in/jonathanbwofford/' target='_blank'>LinkedIn</a>
        <a href='https://myportfolio-jonathanwofford.netlify.app/' target='_blank'>Portfolio</a>
        </div>

    )
}


export default Footer
