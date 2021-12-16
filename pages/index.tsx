import AddTask from "../components/AddTask"
import Tasks from "../components/Tasks"
import styles from "../styles/Home.module.css"

export default function Home() {
  return (
    <main id={styles.main}>
      <h1 className="class-heading">All Tasks</h1>
      <Tasks />
      <AddTask />
    </main>
  )
}
