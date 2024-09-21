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

import { Lock, Mail, User } from "lucide-react";

import { useNavigate } from "react-router-dom";

const FormSchema = z
  .object({
    currentpassword: z.string().min(2, {
      message: "Field is required.",
    }),

    newpassword: z.string().min(2, { message: "Field is required" }),
    confirmPassword: z.string().min(2, { message: "Field is required" }),
  })
  .refine((data) => data.newpassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export function ChangePasswordForm() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      currentpassword: "",

      newpassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {};

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[30vw] p-4   space-y-6"
      >
        <FormField
          control={form.control}
          name="currentpassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="*******"
                  className=" focus-visible:ring-0 focus-visible:ring-offset-0  "
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="newpassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="******"
                  className=" focus-visible:ring-0 focus-visible:ring-offset-0  "
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="********"
                  className="  focus-visible:ring-0 focus-visible:ring-offset-0  "
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full text-black">
          SignUp
        </Button>
      </form>
    </Form>
  );
}
