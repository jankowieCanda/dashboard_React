import { Header_Title } from "./Header_Title";
import { Logo } from "../Logo";
import './Header.scss'

export const Header = () => {

    return (
        <header className="header">
            <Logo/>
            <Header_Title />
        </header>
    );
};