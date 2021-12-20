import AddTask from "../components/AddTask"
import Tasks from "../components/Tasks"

export default function Home() {
  return (
    <main className="flex flex-col w-full h-screen bg-background">
      <Tasks />
      <AddTask />
    </main>
  )
}
