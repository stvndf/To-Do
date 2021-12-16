import styles from "../styles/AddTask.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function AddTask() {
  return (
    <div className={styles.container}>
      <form>
        <input type="text" placeholder="New Task" />
        <button type="submit">
          <FontAwesomeIcon className={styles["input-icon"]} icon={faPlus} size="2x" />
        </button>
      </form>
    </div>
  )
}
