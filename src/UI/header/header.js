import Button from "../../components/button/button";
import Input from "../../components/input/input";
import NaviTextIcon from "../../components/title-nav-like/title-nav-like";

import styles from "./header.module.css";

const navText = { "Add Recipe": "plus", Bookmarks: "bookmark" };

const navTextMarkup = [];

for (const title of Object.keys(navText)) {
  navTextMarkup.push(<NaviTextIcon title={title} svgName={navText[title]} />);
}

const Header = () => {
  return (
    <header className={styles.container}>
      <h1>LOGO HERE</h1>

      <div>
        <Input placeholder="Search over 1,000,000 recipees..." type="text" />
        <Button title="Search" style={styles["button-search"]} />
      </div>

      <div> {navTextMarkup.length && navTextMarkup} </div>
    </header>
  );
};

export default Header;
