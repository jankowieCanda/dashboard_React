

export const SearchBar = () => {

    return (
        <>
            <div className="searchBar">
                <form action="#" method="get" className="searchBar__form">
                    <button className="searchBar__form_btn btn">
                        <img src="..\src\assets\searchBtnIcon.png" alt="Search Button" className="searchBar__form_btn-icon icon" />
                    </button>
                    <input className="searchBar__form_input" type="text" placeholder="Buscar todas las imágenes..." />
                    <select name="form_select" id="form_select" className="searchBar__form_select"></select>
                </form>
            </div>
        </>
    );
};