import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
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

import { IActionProps } from "../Actions";
import JoditEditor from "jodit-react";
import { useMemo, useRef, useState } from "react";
import { options } from "./ArticleForm";
import { DeleteArticle } from "@/lib/routes";

const FormSchema = z.object({
  title: z.string().min(1, { message: "Field is required" }),
  body: z.string().min(1, { message: "Field is required" }),
  coverImage: z.any(),
  category: z.array(z.string()).min(1, { message: "Field is required " }),
  tags: z.array(z.string()).min(1, { message: "At least one tag is required" }),
  summary: z.string().min(1, { message: "Field is required " }),
});

export function ArticleForm({ post }: IActionProps) {
  const editor = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: post?.title,
      coverImage: post?.coverImage,
      category: post?.tags,
      summary: post?.description,
      tags: post?.tags,
      body: post?.body || "",
    },
  });

  const config = useMemo(
    () => ({
      readonly: false,
      buttons: options,
      statusbar: false,
      toolbarSticky: true,
    }),
    []
  );

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setIsLoading(true);
    const blogId = post?._id; // Assuming the post has an `_id` field

    try {
      // Create FormData to handle file upload
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("summary", values.summary);
      formData.append("body", values.body);
      formData.append("category", values.category.join(","));
      formData.append("tags", values.tags.join(","));
      formData.append("coverImage", values.coverImage[0]);

      // Send a PUT request to update the blog
      const response = await fetch(`${DeleteArticle}/${blogId}`, {
        method: "PUT",
        body: formData,
        credentials: "include",
      });

      if (response.ok) {
        const updatedBlog = await response.json();
        console.log("Blog updated successfully", updatedBlog);
        // Handle success (e.g., redirect or show a success message)
      } else {
        const errorData = await response.json();
        console.error("Error updating blog:", errorData);
        // Handle error (e.g., show error message)
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="md:w-[40vw] space-y-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Article Title *</FormLabel>
              <FormDescription className="font-normal text-muted text-[12px]">
                A compelling title that captures the essence of your article.
              </FormDescription>
              <FormControl>
                <Input type="text" placeholder="" className="h-9" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brief Summary*</FormLabel>
              <FormDescription className="font-normal text-muted text-[12px]">
                100 Characters
              </FormDescription>
              <FormControl>
                <Input type="text" placeholder="" className="h-9" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem className="col-span-1">
          <FormLabel>Article Body *</FormLabel>
          <FormDescription className="font-normal text-muted text-[12px]">
            Main body of your article.
          </FormDescription>
          <FormControl>
            <Controller
              control={form.control}
              name="body"
              render={({ field }) => (
                <JoditEditor
                  ref={editor}
                  value={field.value}
                  config={config}
                  onBlur={(newContent) => field.onChange(newContent)}
                  onChange={(htmlString) => field.onChange(htmlString)}
                  className="w-full h-[70%] mt-10 bg-white"
                />
              )}
            />
          </FormControl>
          <FormMessage />
        </FormItem>

        <FormField
          control={form.control}
          name="category"
          render={() => (
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
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
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
          render={() => (
            <FormItem>
              <FormLabel>Article Tags*</FormLabel>
              <FormDescription className="font-normal text-muted text-[12px]">
                Add relevant tags that describe your article (up to 5 tags).
              </FormDescription>
              <FormControl>
                <Select>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="health">Health</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="blogging">Blogging</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="coverImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload Cover coverImage*</FormLabel>
              <FormDescription className="font-normal text-muted text-[12px]">
                Upload a coverImage (jpg, png) that represents your article.
              </FormDescription>
              <FormControl>
                <Input
                  type="file"
                  placeholder=""
                  className="h-9"
                  onChange={(e) => field.onChange(e.target.files)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="font-semibold text-[15px] border border-primary text-black w-full"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </Form>
  );
}
