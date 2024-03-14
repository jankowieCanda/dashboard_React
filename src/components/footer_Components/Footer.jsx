import { Logo } from "../Logo";
import { Social_Icons } from "../Social_Icons";
import './Footer.scss';

export const Footer = () => {
    

    return (
        <footer className="footer">
            <Logo />
            <small className="footer__descrip">sed risus ultricies tristique nulla</small>
            <Social_Icons />
        </footer>
    );
};