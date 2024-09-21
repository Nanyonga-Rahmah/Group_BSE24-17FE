import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RichTextEditor } from "../RichTextEditor";

const FormSchema = z.object({
  title: z.string().min(1, { message: "Field is required" }),
  description: z.string().min(1, { message: "Field is required" }),

  image: z.string().min(1, { message: "Field is required" }),

  category: z.string().min(1, { message: "Field is required " }),

  tags: z.string().min(1, { message: "Field is required " }),

  sumary: z.string().min(1, { message: "Field is required " }),
});

export function ArticleForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",

      image: "",

      category: "",

      sumary: "",
      tags: "",

      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    console.log("values submitted", values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[40vw] space-y-4 "
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Article Title *</FormLabel>
              <FormDescription className="font-normal text-muted text-[12px]">
                A compelling title that captures the essence of your article
                between 5-10 characters
              </FormDescription>
              <FormControl>
                <Input type="text" placeholder="" className="h-9 " {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sumary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brief Summary*</FormLabel>
              <FormDescription className="font-normal text-muted text-[12px]">
                100 Characters
              </FormDescription>
              <FormControl>
                <Input type="text" placeholder="" className="h-9 " {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Article Body *</FormLabel>
              <FormDescription className="font-normal text-muted text-[12px]">
                Main body of your article
              </FormDescription>
              <FormControl>
                <RichTextEditor />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Choose Category *</FormLabel>
              <FormDescription className="font-normal text-muted text-[12px]">
                Select the category that best fits your article.
              </FormDescription>
              <FormControl>
                <Select>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Education</SelectItem>
                    <SelectItem value="dark">Business</SelectItem>
                    <SelectItem value="system">Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Article Tags*</FormLabel>
              <FormDescription className="font-normal text-muted text-[12px]">
                Add relevant tags that describe your article upto 5 tags
              </FormDescription>
              <FormControl>
                <Select>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Health</SelectItem>
                    <SelectItem value="dark">Technology</SelectItem>
                    <SelectItem value="system">Blogging</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload Cover Image*</FormLabel>
              <FormDescription className="font-normal text-muted text-[12px]">
                Upload an image (jpg, png) that represents your article
                (1120x386px).
              </FormDescription>
              <FormControl>
                <Input type="file" placeholder="" className="h-9 " {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className=" font-semibold  text-[15px] border border-primary text-black w-full  "
        >
          Publish Article
        </Button>
      </form>
    </Form>
  );
}
