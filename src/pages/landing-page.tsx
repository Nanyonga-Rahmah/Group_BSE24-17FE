import Footer from "@/components/Footer";
import Header, { IStatus } from "@/components/Header";
import Hero from "@/components/Hero";
import Post from "@/components/Posts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function LandingPage({ status }: IStatus) {
  return (
    <div>
      <div className=" px-20 bg-gradient-45 md:min-h-[70vh] max-w-[100vw] ">
        <div className="py-7">
          <Header status={status} />
        </div>
        <Hero />
      </div>
      <main>
        <Tabs defaultValue="all" className="mt-10">
          <TabsList className=" w-full ">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
            <TabsTrigger value="technology">Technology</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
            <TabsTrigger value="business">Business</TabsTrigger>
            <TabsTrigger value="health">Health</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <Post />
          </TabsContent>
          <TabsContent value="marketing">
            <Post />
          </TabsContent>
          <TabsContent value="social">
            <Post />
          </TabsContent>
          <TabsContent value="technology">
            <Post />
          </TabsContent>
          <TabsContent value="health">
            <Post />
          </TabsContent>
          <TabsContent value="business">
            <Post />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;
