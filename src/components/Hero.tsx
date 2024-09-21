import { SubscribeForm } from "./forms/SubscribeForm";

function Hero() {
  return (
    <div className="flex flex-col md:flex-row max-w-[100vw] overflow-x-hidden md:gap-10 my-[9vh] md:px-5 items-center ">
      <div className="md:w-[60vw] my-4 md:my-0  ">
        <h3 className="text-primary text-base my-2 md:my-0 font-normal md:text-xl">
          WELCOME TO GOODBLOGGER
        </h3>
        <p className="font-bold text-xl md:text-[40px] md:my-2 text-white md:leading-[54px] font-[Raleway]">
          Your go-to platform for sharing insights, stories, and knowledge with
          the world.
        </p>
      </div>
      <div className="md:px-10">
        <p className="text-white text-[18px] ">
          <span className="font-medium leading-6">Subscribe to our news letter:</span>{" "}
          <span className="font-normal">
            Stay updated with the latest blog posts and news by subscribing to
            our newsletter.
          </span>
        </p>
        <div className="mt-8">
          <SubscribeForm />
        </div>
      </div>
    </div>
  );
}

export default Hero;
