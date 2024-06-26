"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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

export default function AddTodo() {
  const { todoList, setTodoList } = useTodo();
  const [vail, setVail] = useState(false);
  const [btnTheme, setButton] = useState(
    "h-10 w-full rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", content: "" },
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
    const newTodoList = [
      ...todoList,
      {
        id: Date.now(),
        title: values.title,
        content: values.content,
        completed: false,
      },
    ];
    setTodoList(newTodoList);
    localStorage.setItem("todoList", JSON.stringify(newTodoList));
    form.reset({ title: "", content: "" });
  };

  return (
    <div className="w-full mb-4">
      <Dialog>
        <DialogTrigger className="w-full h-10 rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
          ADD TODO
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
                    <FormDescription>This is your Todo content</FormDescription>
                  </FormItem>
                )}
              />
              <DialogClose type="submit" disabled={!vail} className={btnTheme}>
                ADD
              </DialogClose>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
