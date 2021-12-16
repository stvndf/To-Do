import { useState } from "react";
import Navigation from "./Navigation";
import styles from "../styles/Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCheckDouble } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <div id={styles["branding-and-menu-icon"]}>
        <div id={styles.branding}>
          <FontAwesomeIcon
            icon={faCheckDouble}
            size="3x"
            id={styles["logo-icon"]}
          />
          <h1 id={styles.title}>To-Do List</h1>
        </div>
        <button id={styles["icon-menu"]} onClick={handleMenuToggle}>
          <FontAwesomeIcon icon={faBars} size="2x" id="icon-menu" />
        </button>
      </div>

      <Navigation isMenuOpen={isMenuOpen} />
    </header>
  );
};
