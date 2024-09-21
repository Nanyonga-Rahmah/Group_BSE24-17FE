import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail } from "lucide-react";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "username must be at least 2 characters.",
  }),
  password: z
    .string()
    .min(2, { message: "password must be at least 2 characters." }),
});

export function LoginForm() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    console.log(values);
    localStorage.setItem("IsLoggedIn", "true");
    setTimeout(() => {
      navigate("/");
      window.location.reload();
    }, 2000);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium text-base">Email</FormLabel>

              <FormControl>
                <div className="flex items-center border rounded-[10px] px-2">
                  <span>
                    <Mail className="h-4 w-4" />
                  </span>
                  <Input
                    type="username"
                    placeholder="Enter your email"
                    className="h-10 border-none focus:ring-0 focus-visible:ring-offset-0 "
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="my-4">
              <FormLabel className="font-medium text-base ">Password</FormLabel>
              <FormControl>
                <div className=" border flex items-center pr-4 rounded-[10px] px-2 ">
                  <span>
                    <Lock className="h-4 w-4" />
                  </span>
                  <Input
                    type="password"
                    placeholder="password"
                    className="border-none focus-visible:ring-0 focus-visible:ring-offset-0  "
                    {...field}
                  />
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end  ">
          <Link to="/forgot-password " className="text-sm">
            Forgot Password
          </Link>
        </div>
        <Button
          type="submit"
          className="w-full font-normal text-base text-black"
        >
          Login
        </Button>
      </form>
    </Form>
  );
}
