import { zodResolver } from "@hookform/resolvers/zod";
import { useForm,Controller } from "react-hook-form";
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
import { useMemo, useRef } from "react";
import { options } from "./ArticleForm";
const FormSchema = z.object({
  title: z.string().min(1, { message: "Field is required" }),
  body: z.string().min(1, { message: "Field is required" }),

  image: z.string().min(1, { message: "Field is required" }),

  category: z.array(z.string()).min(1, { message: "Field is required " }),

  tags: z.array(z.string()).min(1, { message: "At least one tag is required" }),

  sumary: z.string().min(1, { message: "Field is required " }),
});

export function ArticleForm({ post }: IActionProps) {
  const editor = useRef(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: post?.title,

      image: post?.aboutPostUrl,

      category: post?.tags,

      sumary: post?.description,
      tags: post?.tags,

      body: "",
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

  function onSubmit(values: z.infer<typeof FormSchema>) {
    console.log("values submitted", values);
  }

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

        
            <FormItem className="col-span-1">
              <FormLabel>Article Body *</FormLabel>
              <FormDescription className="font-normal text-muted text-[12px]">
                Main body of your article
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
          render={() => (
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
          Save Changes
        </Button>
      </form>
    </Form>
  );
}
