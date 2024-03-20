import { useLocation } from "react-router-dom";
import './NavBar.scss';

export const NavBar = () => {
    let items = ['home', 'myPhotos'];
    let icons = ['../src/assets/homePageIcon.png', '../src/assets/navBarFavoriteIcon.png'];
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
                <a href={links[i]} id={item}>{item}</a>
            </li>
        );
    })

    

    return (
        <nav className="nav">
            <ul className="nav__list">{navItems}</ul>
        </nav>
    );
}