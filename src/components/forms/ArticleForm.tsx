import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { useMemo, useRef, useState } from "react";
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
import { CreateBlog } from "@/lib/routes";
import { toast } from "sonner";
import JoditEditor from "jodit-react";

export const options = [
  "bold",
  "italic",
  "|",
  "ul",
  "ol",
  "image",
  "|",
  "font",
  "fontsize",
  "|",
  "outdent",
  "indent",
  "align",
  "|",
  "hr",
  "|",
  "fullsize",
  "brush",
  "|",
  "table",
  "link",
  "|",
  "undo",
  "redo",
];

const FormSchema = z.object({
  title: z.string().min(1, { message: "Field is required" }),
  body: z.string().min(1, { message: "Field is required" }),
  coverImage: z.any(),
  category: z.string().min(1, { message: "Field is required" }),
  tags: z.string().min(1, { message: "Field is required" }),
  sumary: z.string().min(1, { message: "Field is required" }),
  author: z.string().min(1, { message: "Field is required" }),
});

export function ArticleForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const editor = useRef(null);
  const author = localStorage.getItem("authorId") || "66f4832e698a50dde97f5896";
  console.log(author);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      coverImage: null,
      category: "",
      sumary: "",
      tags: "",
      body: "",
      author: author,
    },
  });

  const config = useMemo(
    () => ({
      readonly: false,
      buttons: options,
      buttonsMD: options,
      buttonsSM: options,
      buttonsXS: options,
      statusbar: false,
      toolbarAdaptive: false,
      toolbarSticky: true,
      allowEmptyTags: false,
    }),
    []
  );

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("summary", values.sumary);
    formData.append("body", values.body);
    formData.append("category", values.category);
    formData.append("tags", values.tags);
    formData.append("author", values.author);

    if (values.coverImage && values.coverImage[0]) {
      formData.append("coverImage", values.coverImage[0]);
    }
    // Log form data to console
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const response = await fetch(CreateBlog, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (response.status === 201) {
        toast("Blog created successfully!", {
          className:
            "border border-primary text-center text-base flex justify-center rounded-lg mb-2",
        });
        form.reset();
      } else {
        const error = await response.json();
        throw new Error(error.message || "Failed to create blog");
      }
    } catch (error) {
      toast(`Failed to create blog: ${(error as Error).message}`, {
        className:
          "border border-error text-center text-base flex justify-center rounded-lg mb-2",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="md:w-[40vw] space-y-4 "
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
                <Input
                  type="text"
                  placeholder="Enter title"
                  className="h-9 "
                  {...field}
                />
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
                <Input
                  type="text"
                  placeholder="Enter summary"
                  className="h-9 "
                  {...field}
                />
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
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Choose Category *</FormLabel>
              <FormDescription className="font-normal text-muted text-[12px]">
                Select the category that best fits your article.
              </FormDescription>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Agriculture">Agriculture</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
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
                Add relevant tags that describe your article (up to 5 tags).
              </FormDescription>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tags" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Health">Health</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Blogging">Blogging</SelectItem>
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
              <FormLabel>Upload Cover Image*</FormLabel>
              <FormDescription className="font-normal text-muted text-[12px]">
                Upload a cover image (jpg, png) that represents your article
                (1120x386px).
              </FormDescription>
              <FormControl>
                <Input
                  type="file"
                  className="h-9"
                  onChange={(e) => field.onChange(e.target.files)} // Store selected file in field
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="font-semibold text-[15px] border border-primary text-black w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Publishing..." : "Publish Article"}
        </Button>
      </form>
    </Form>
  );
}
