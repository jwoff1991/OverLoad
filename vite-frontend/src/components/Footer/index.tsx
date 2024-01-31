import { Link } from "react-router-dom"
import './footer.css'


const Footer = () => {

    return (

        <div className="footer-fiv">

        <Link to='/my-story'>Story</Link>
        <a href='https://github.com/jwoff1991' target='_blank' rel="noreferrer">Gitub</a>
        <a href='https://www.linkedin.com/in/jonathanbwofford/' target='_blank' rel="noreferrer">LinkedIn</a>
        <a href='https://myportfolio-jonathanwofford.netlify.app/' target='_blank' rel="noreferrer">Portfolio</a>
        </div>

    )
}


export default Footer
