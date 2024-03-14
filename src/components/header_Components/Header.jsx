import { Header_Title } from "./Header_Title";
import { SearchBar } from "../SearchBar";
import { Logo } from "../Logo";
import './Header.scss'

export const Header = () => {

    return (
        <header className="header">
            <Logo/>
            <Header_Title />
            <SearchBar />
        </header>
    );
};