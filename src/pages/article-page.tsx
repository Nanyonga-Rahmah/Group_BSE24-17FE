import Footer from "@/components/Footer";
import Header, { IStatus } from "@/components/Header";
import { latestPost } from "@/components/LatestPost";
import { Badge } from "@/components/ui/badge";

function ArticlePage({ status }: IStatus) {
  return (
    <div>
      <div className=" px-20 bg-gradient-45 md:min-h-[40vh] max-w-[100vw] ">
        <div className="py-7">
          <Header status={status} />
        </div>
        <div className="px-16 ">
          <div className="flex gap-3 my-2 ">
            {latestPost.tags.map((tag, index) => (
              <Badge
                key={index}
                variant={"outline"}
                className="rounded-[10px] py-1 text-black border-black px-2"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <div>
            <h3 className="font-bold text-[30px] leading-[54px] text-white">
              {latestPost.title}
            </h3>
          </div>
          <div className="flex gap-3 items-center">
            <div className="w-[3%]">
              <img src={latestPost.imgUrl} alt={latestPost.postedBy} />
            </div>
            <div className="flex flex-col text-white my-4">
              <p>{latestPost.postedBy}</p>
              <p className="">{latestPost.date}</p>
            </div>
          </div>
        </div>
      </div>
      <main className="px-32">
        <div className="h-[40vh]  my-9 overflow-hidden rounded-2xl ">
          <img
            src={latestPost.aboutPostUrl}
            alt="Latest"
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <p>
            As we step into 2024, the technology landscape is evolving at an
            unprecedented pace. This year promises to bring forth a wave of
            innovations that will not only enhance our daily lives but also
            redefine entire industries. From artificial intelligence to
            sustainable tech, here are some key innovations to keep an eye on
            this year.
          </p>
          <div className="flex flex-col gap-2 mt-3 mb-20">
            <h3>1. Artificial Intelligence in Everyday Life</h3>
            <p className="text-muted">
              Artificial intelligence continues to be a driving force in
              technological advancement. In 2024, we expect to see AI systems
              become even more integrated into our daily routines. Smart
              assistants will evolve, providing personalized recommendations for
              everything from shopping to health management. Companies are
              increasingly leveraging AI for customer service, using chatbots
              that can understand and respond to complex queries, thereby
              enhancing user experience.
            </p>
            <h3>2. 5G and Beyond</h3>
            <p className="text-muted">
              With the rollout of 5G networks accelerating, 2024 will mark a
              significant leap in connectivity. The high-speed internet provided
              by 5G will facilitate advancements in various fields, such as
              telemedicine, autonomous vehicles, and smart cities. Expect to see
              more reliable and faster connections that allow for seamless
              streaming and real-time data sharing, paving the way for
              innovations in augmented and virtual reality.
            </p>
            <h3>3. Blockchain Beyond Cryptocurrency</h3>
            <p className="text-muted">
              Blockchain technology is set to expand beyond its association with
              cryptocurrencies. In 2024, we&apos;ll see more businesses adopting
              blockchain for supply chain transparency, secure transactions, and
              smart contracts. This innovation will enhance trust and efficiency
              in various industries, including finance, healthcare, and
              logistics.
            </p>
            <div className="font-normal text-base">
              <h3>4.The Rise of Quantum Computing</h3>
              <p className="text-muted">
                Quantum computing is no longer a concept confined to research
                labs. In 2024, several companies are expected to unveil quantum
                computers that can solve complex problems beyond the
                capabilities of traditional computers. This breakthrough will
                have far-reaching implications for fields such as cryptography,
                drug discovery, and materials science.
              </p>
            </div>
            <div className="font-normal text-base">
              <h3> Conclusion </h3>
              <p className="text-muted">
                The innovations on the horizon for 2024 hold incredible
                potential to reshape our world. As these technologies develop,
                they will offer new solutions to longstanding challenges and
                enhance our ability to connect, create, and thrive in an
                ever-changing environment. Staying informed about these trends
                will empower us to harness their benefits effectively.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ArticlePage;
