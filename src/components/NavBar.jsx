import { Link, useLocation, useNavigate } from "react-router-dom";
import './NavBar.scss';
import homePageIcon from '../assets/homePageIcon.png'
import navBarFavoriteIcon from '../assets/navBarFavoriteIcon.png'

export const NavBar = () => {
    const navigate = useNavigate();
    let items = ['home', 'myPhotos'];
    let icons = [homePageIcon, navBarFavoriteIcon];
    let links = ['/', '/myPhotos']

    const location = useLocation();

    const handleLoad = () => {
        let home = document.getElementById('home_li');
        let myPhotos = document.getElementById('myPhotos_li');
        if(location.pathname === '/'){
            home.setAttribute('class', 'nav__list_item active')
        } else if(location.pathname === '/myPhotos') {
            myPhotos.setAttribute('class', 'nav__list_item active');
            home.setAttribute('class', 'nav__list_item');
        }
    }

    const navItems = items.map((item, i) => {
        
        return (
            <li onLoad={handleLoad} key={i} className="nav__list_item" id={item + '_li'}>
                <img  src={icons[i]} alt={item} className='icon' id={item + '_link'}/>
                <Link to={links[i]} id={item} onClick={() => navigate(links[i])}>{item}</Link>
            </li>
        );
    })

    

    return (
        <nav className="nav">
            <ul className="nav__list">{navItems}</ul>
        </nav>
    );
}