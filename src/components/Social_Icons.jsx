
export const Social_Icons = () => {
    let socialIcons = ['../src/assets/instagramIcon.png', '../src/assets/facebookIcon.png', '../src/assets/twitterIcon.png', '../src/assets/pinterestIcon.png'];
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