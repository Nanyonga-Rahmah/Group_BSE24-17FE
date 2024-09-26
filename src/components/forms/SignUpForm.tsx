import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Lock, Mail, User } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

const FormSchema = z
  .object({
    username: z.string().min(2, {
      message: "Field is required.",
    }),
    profilePicture: z.any(),
    email: z.string().email().min(2, { message: "Field is required." }),

    password: z.string().min(2, { message: "Field is required" }),
    confirmPassword: z.string().min(2, { message: "Field is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export function SignupForm() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      confirmPassword: "",
      password: "",
      profilePicture: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const formData = new FormData();
    formData.append("username", values.username);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("confirmPassword", values.confirmPassword);

    // Append file only if it exists
    if (selectedFile) {
      formData.append("profilePicture", selectedFile);
    }

    try {
      const response = await fetch("http://localhost:4040/register", {
        method: "POST",
        body: formData, // Send the form data with the file
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful registration (e.g., redirect, show message)
        console.log("User registered:", data);
        navigate("/");
      } else {
        console.error("Registration error:", data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-6 "
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex border rounded-[10px] items-center px-2">
                  <span>
                    <User className="h-4 w-4" />
                  </span>
                  <Input
                    type="text"
                    placeholder="Username"
                    className="border-none h-10"
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center border rounded-[10px] px-2">
                  <span>
                    <Mail className="h-4 w-4" />
                  </span>
                  <Input
                    type="email"
                    placeholder="Email"
                    className="h-10 border-none focus:ring-0 "
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
            <FormItem>
              <FormControl>
                <div className=" border flex items-center pr-4 rounded-[10px] px-2 ">
                  <span>
                    <Lock className="h-4 w-4" />
                  </span>
                  <Input
                    type="password"
                    placeholder="Password"
                    className="border-none focus-visible:ring-0 focus-visible:ring-offset-0  "
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
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex border items-center px-2 rounded-[10px]">
                  <span>
                    <Lock className="h-4 w-4" />
                  </span>
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    className="border-none focus-visible:ring-0 focus-visible:ring-offset-0  "
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
          name="profilePicture"
          render={({}) => (
            <FormItem>
              <FormControl>
                <div className="flex border rounded-[10px]">
                  <Input
                    type="file"
                    accept="image/*"
                    className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setSelectedFile(e.target.files[0]);
                      }
                    }}
                  />
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="col-span-2 text-black">
          SignUp
        </Button>
      </form>
    </Form>
  );
}
