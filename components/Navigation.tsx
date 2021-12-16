import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import styles from "../styles/Navigation.module.css";
import customLists from "../data/customlists.js";

interface Props {
  isMenuOpen: boolean;
}

export default function Navigation({ isMenuOpen }: Props) {
  return (
    <div className={`${styles.menu} ${!isMenuOpen ? styles["hide-menu"] : ""}`}>
      <div className={styles.row}>
        <FontAwesomeIcon icon={faStar} className={styles["sub-icon"]} />
        <p>All Tasks</p>
      </div>

      <div className={styles.row}>
        <FontAwesomeIcon
          icon={faEllipsisVertical}
          className={styles["sub-icon"]}
          id={styles["list-icon"]}
        />
        <p>Custom Lists</p>
      </div>

      <nav id={styles["nav-lists"]}>
        <ul>
          {customLists.map((list) => (
            <li key={list.id} className={[styles["list-item"]].join(" ")}>
              {list.name}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
