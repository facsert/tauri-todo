import List from "@/components/List";
import Summary from "@/components/Summary";
import AddTodo from "@/components/AddTodo";

export default function HomePage() {
  return (
    <div className="w-full h-full">
      <div className="w-full h-1/5">
        <Summary />
      </div>
      <div className="flex flex-col w-full h-3/4">
        <AddTodo />
        <List />
      </div>
    </div>
  )
}