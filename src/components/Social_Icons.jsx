import instagramIcon from '../assets/instagramIcon.png';
import facebookIcon from '../assets/facebookIcon.png';
import twitterIcon from '../assets/twitterIcon.png';
import pinterestIcon from '../assets/pinterestIcon.png';


export const Social_Icons = () => {
    let socialIcons = [instagramIcon, facebookIcon, twitterIcon, pinterestIcon];
    let alt = ['instagram', 'facebook', 'twitter', 'pinterest'];

    const icon = socialIcons.map((item, i) => {
        return (
            <li className="social__list_item" key={i}>
                <a href="#"><img src={item} alt={alt[i]} className="social__icon icon"/></a>
            </li>
        )
    })

    return (
        <>
            <div className="social">
                <ul className="social__list">{icon}</ul>
            </div>
        </>
    )
}