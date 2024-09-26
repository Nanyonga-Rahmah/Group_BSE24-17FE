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

// Validation schema using Zod
const FormSchema = z.object({
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z
    .string()
    .min(2, { message: "Password must be at least 2 characters." }),
});

export function LoginForm() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      const response = await fetch("http://localhost:4040/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values), // Send the form values (username and password)
      });

      const data = await response.json();

      if (response.ok) {
        // Store authentication state
        localStorage.setItem("IsLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify(data.user)); // Store user data if needed

        // Redirect to home or dashboard page after successful login
        navigate("/");
        window.location.reload();
      } else {
        // Handle login failure
        console.error("Login failed:", data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium text-base">Email</FormLabel>

              <FormControl>
                <div className="flex items-center border rounded-[10px] px-2">
                  <span>
                    <Mail className="h-4 w-4" />
                  </span>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="h-10 border-none focus:ring-0 focus-visible:ring-offset-0"
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
              <FormLabel className="font-medium text-base">Password</FormLabel>
              <FormControl>
                <div className="border flex items-center pr-4 rounded-[10px] px-2">
                  <span>
                    <Lock className="h-4 w-4" />
                  </span>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-sm">
            Forgot Password?
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
