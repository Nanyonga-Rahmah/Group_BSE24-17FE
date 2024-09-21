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

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z
    .string()
    .min(2, { message: "Email must be at least 2 characters." })
    .email("Please enter a valid email."),
  info: z.string().min(2, { message: "Info must be at least 2 characters." }),
});

export function AboutForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      info: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[30vw] p-4   space-y-6"
      >
        <div className="flex flex-col space-y-2">
          <h3>Photo</h3>
          <p className="font-normal text-muted text-[12px]">
            Upload an image (jpg, png) that represents your article
            (1120x386px).
          </p>

          <div className="flex items-center gap-3">
            <img
              src="/images/avatar.png"
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
            <Button variant="outline" className="text-blue-500" type="button">
              Update
            </Button>
          </div>
        </div>

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium text-sm">Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your username"
                  className="h-10 px-4 rounded-[10px] border border-gray-300 focus-visible:ring-0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium text-sm">Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="h-10 px-4 rounded-[10px] border border-gray-300 focus-visible:ring-0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="info"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium text-sm">
                Profile Info
              </FormLabel>
              <FormDescription className="text-muted">
                A short bio about you
              </FormDescription>
              <FormControl>
                <Input
                  placeholder="A short bio about you"
                  className="h-[53px] px-4 rounded-[10px] border border-gray-300 focus-visible:ring-0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full h-12 bg-yellow-400 text-black rounded-[10px] hover:bg-yellow-500 transition-all"
        >
          Update
        </Button>
      </form>
    </Form>
  );
}
