// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";

// import { LoginForm } from "./forms/LoginForm";
// import { SignUpDialog } from "./SignUp";

// export function LoginDialog() {
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button className="h-10 w-[104px] rounded-[60px] text-black">
//           Login
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle className="font-bold text-xl text-center">
//             Login to access your account{" "}
//           </DialogTitle>
//         </DialogHeader>
//         <LoginForm />

//         <div className="flex justify-center">
//           <span>No Account?</span>
//           <span className="underline" >
//             Create One
//           </span>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { LoginForm } from "./forms/LoginForm";
import { SignupForm } from "./forms/SignUpForm";

export function LoginDialog() {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-10 w-[104px] rounded-[60px] text-black">
          Login
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] w-[89%] rounded-md my-3">
        <DialogHeader>
          <DialogTitle className="font-bold text-xl text-center">
            {isLogin
              ? "Login to access your account"
              : "Create an Account to Begin Writing"}
          </DialogTitle>
        </DialogHeader>

        {isLogin ? <LoginForm /> : <SignupForm />}

        <div className="flex justify-center">
          {isLogin ? (
            <>
              <span>No Account?</span>
              <span
                className="underline ml-1 cursor-pointer"
                onClick={handleToggle}
              >
                Create One
              </span>
            </>
          ) : (
            <div className="my-4">
              <span>Have account?</span>
              <span
                className="underline ml-1 cursor-pointer"
                onClick={handleToggle}
              >
                Login
              </span>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
