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
import { useRef, useState, useEffect } from "react";
import { ProfileUpdate } from "@/lib/routes";

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
  const [profilePic, setProfilePic] = useState("/images/avatar.png");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      info: "",
    },
  });

  // Load user data from local storage when the component mounts
  useEffect(() => {
    const userData = localStorage.getItem("user"); // Assuming the user data is stored with key "user"
    if (userData) {
      const user = JSON.parse(userData);
      form.reset({
        username: user.username,
        email: user.email,
        info: "", // Add additional user info if available
      });
      setProfilePic(user.profilePicture || "/images/avatar.png"); // Set profile picture if exists
    }
  }, [form]);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setProfilePic(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      // Prepare the form data
      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("info", values.info);

      // Append the profile picture if available
      const fileInput = fileInputRef.current;
      if (fileInput && fileInput.files?.[0]) {
        formData.append("profilePicture", fileInput.files[0]);
      }

      // Send a POST request to the API
      const response = await fetch(ProfileUpdate, {
        method: "PUT",
        body: formData,
        credentials: "include", // Include credentials for authentication
      });

      // Handle the response
      const data = await response.json();
      if (response.ok) {
        console.log("Profile updated successfully:", data);
        // You can show a success message or redirect
      } else {
        console.error("Profile update failed:", data);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="md:w-[30vw] p-4 space-y-6"
      >
        <div className="flex flex-col space-y-2">
          <h3>Photo</h3>
          <p className="font-normal text-muted text-[12px]">
            Upload an image (jpg, png) that represents your article
            (1120x386px).
          </p>

          <div className="flex items-center gap-3">
            <img
              src={profilePic}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
            <Button
              variant="outline"
              className="text-blue-500"
              type="button"
              onClick={handleButtonClick}
            >
              Update
            </Button>

            <input
              type="file"
              accept="image/png, image/jpeg"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
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
