
const homeOptions = ['../src/assets/downloadIcon.png', '../src/assets/favoriteIconUnselected.png'];

export const optionsBar = () => {
    const option = homeOptions.map((opt, i) => {
        let alt_text = opt.slice(13).replace('.png', '')
        return (
            <div key={i} className="iconBox">
                <img className="icon" src={opt} alt={alt_text} />
            </div>
        )
    })

    return (
        <div className="optionsBar">{option}</div>
    )
}