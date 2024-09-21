import { SubscribeForm } from "./forms/SubscribeForm";

function Hero() {
  return (
    <div className="flex gap-10 my-[9vh] px-5 items-center ">
      <div className="w-[60vw]  ">
        <h3 className="text-primary font-normal text-xl">
          WELCOME TO GOODBLOGGER
        </h3>
        <p className="font-bold text-3xl text-white leading-[54px]">
          Your go-to platform for sharing insights, stories, and knowledge with
          the world.
        </p>
      </div>
      <div className="px-10">
        <p className="text-white text-[18px] font-medium leading-6">
          Subscribe to our news letter: Stay updated with the latest blog posts
          and news by subscribing to our newsletter.
        </p>
        <div className="mt-8">
          <SubscribeForm />
        </div>
      </div>
    </div>
  );
}

export default Hero;
