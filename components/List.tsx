"use client"
import { 
    Command,
    CommandShortcut,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label"

import { Trash2  } from 'lucide-react';
import { useTodo } from "@/lib/data";

import EditTodo from "@/components/EditTodo"
import { useEffect } from "react";

export default function List() {
    const { todoList, setTodoList} = useTodo();
    useEffect(() => {
        const list = localStorage.getItem("todoList")
        setTodoList(list ? JSON.parse(list) : [])
    }, [setTodoList])

    const switchComplete = (id: number) => {
        const newTodoList = todoList.map((todo) => todo.id === id? {...todo, completed: !todo.completed}: todo )
        setTodoList(newTodoList)
        localStorage.setItem("todoList", JSON.stringify(newTodoList))
    }
    const DeleteTodo = (id: number) => { 
        const newTodoList = todoList.filter((todo) => todo.id !== id)
        setTodoList(newTodoList)
        localStorage.setItem("todoList", JSON.stringify(newTodoList))
    }
    if (todoList.length === 0) {
        return (
            <Command>
                <div className="border ">
                    <CommandInput placeholder="Search todo" />
                </div>
                <CommandList>
                    <CommandEmpty>No Todo found</CommandEmpty>
                    <CommandGroup heading="TodoList">
                        <CommandItem></CommandItem>
                        <p className="w-full bg-transparent text-center">No Todo</p>
                    </CommandGroup>
                </CommandList>
            </Command>
        );
    }

    return (
        <Command>
            <div className="border ">
                <CommandInput placeholder="Search todo" />
            </div>
            <CommandList>
                <CommandEmpty>No Todo found</CommandEmpty>
                <CommandGroup heading="TodoList">
                    {todoList.map(todo => {
                        return (
                            <CommandItem key={todo.id} className="h-[50px] mt-4 border">
                            <Checkbox className="mr-2" checked={todo.completed} key={todo.id} onCheckedChange={() => {switchComplete(todo.id)}} />  
                            <Label className={todo.completed? "line-through": ""}>
                                {todo.title}
                            </Label>
                            <CommandShortcut className="h-full flex flex-row items-center gap-0">
                                <EditTodo editId={todo.id} />
                                <Button variant="ghost" onClick={() => DeleteTodo(todo.id)}>
                                    <Trash2 className="h-6 w-6" />
                                </Button>
                            </CommandShortcut>
                        </CommandItem>
                        )
                    })}
                </CommandGroup>
            </CommandList>
        </Command>
    );
}