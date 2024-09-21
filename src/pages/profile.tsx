import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header, { IStatus } from "@/components/Header";
import { AboutForm } from "@/components/forms/AboutForm";
import { ChangePasswordForm } from "@/components/forms/ChangePasswordForm";

function Profile({ status }: IStatus) {
  return (
    <div>
      <div className=" p-4 bg-gradient-45 md:min-h-[40vh] max-w-[100vw] ">
        <div className="md:py-7">
          <Header status={status} />
        </div>
        <div className=" flex justify-center items-center  mt-20  ">
          <h3 className="font-bold text-3xl text-white font-[rales]">Profile</h3>
        </div>
      </div>
      <main className="flex justify-center my-6">
        <Tabs defaultValue="about" className="mt-10">
          <TabsList className=" w-full ">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="about">
            <AboutForm />
          </TabsContent>
          <TabsContent value="password">
            <ChangePasswordForm />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default Profile;
