
export const NavBar = () => {
    let items = ['home', 'myPhotos'];
    let icons = ['../src/assets/homePageIcon.png', '../src/assets/navBarFavoriteIcon.png'];
    let links = ['/', '/myPhotos']

    const navItems = items.map((item, i) => {
        return (
            <li key={i} className="nav__list_item">
                <img src={icons[i]} alt={item} className='icon'/>
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