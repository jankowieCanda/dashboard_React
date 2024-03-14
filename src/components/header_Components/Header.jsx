import { Header_Title } from "./Header_Title";
import { SearchBar } from "../SearchBar";
import { LogoBar } from "./LogoBar";
import './Header.scss'

export const Header = () => {

    return (
        <header className="header">
            <LogoBar/>
            <Header_Title />
            <SearchBar />
        </header>
    );
};