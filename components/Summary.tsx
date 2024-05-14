"use client"

import { useTodo } from "@/lib/data"

export default function Summary() {
    const { todoList } = useTodo();
    const completed = todoList.filter((todo) => todo.completed).length;
    return (
        <div className="flex flex-row justify-center items-center w-full h-full">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                {`TodoList: ${completed} / ${todoList.length}`}
            </h1>
        </div>
    )
}