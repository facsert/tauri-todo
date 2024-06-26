"use client";
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PenLine } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { useTodo } from "@/lib/data";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "todo title must be at least 2 characters.",
  }),
  content: z.string().min(2, {
    message: "todo content must be at least 2 characters.",
  }),
});

export default function EditTodo({ editId }: { editId: number }) {
  const { todoList, setTodoList } = useTodo();
  const [vail, setVail] = useState(false);
  const [btnTheme, setButton] = useState(
    "h-10 w-full rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
  );
  const editTodo = todoList.find((t) => t.id === editId) ?? {
    id: Date.now(),
    title: "",
    content: "",
    completed: false,
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: editTodo.title, content: editTodo.content },
  });

  useEffect(() => {
    setVail(form.formState.isValid);
    setButton(
      form.formState.isValid
        ? "h-10 w-full rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
        : "h-10 w-full rounded-md bg-secondary text-secondary-foreground"
    );
  }, [form.formState.isValid]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setTodoList([
      ...todoList.filter((t) => t.id !== editId),
      {
        id: editId,
        title: values.title,
        content: values.content,
        completed: editTodo.completed,
      },
    ]);
    localStorage.setItem("todoList", JSON.stringify(todoList));
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger className="mt-1 bg-transparent hover:text-accent-foreground">
          <PenLine className="mr-2 h-6 w-6" />
        </DialogTrigger>
        <DialogContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Write todo here" {...field} />
                    </FormControl>
                    <FormDescription>This is your Todo title</FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Write todo here" {...field} />
                    </FormControl>
                    <FormDescription>This is your Todo title</FormDescription>
                  </FormItem>
                )}
              />
              <DialogClose type="submit" disabled={!vail} className={btnTheme}>
                OK
              </DialogClose>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
