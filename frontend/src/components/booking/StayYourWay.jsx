import { ArrowUpRight, Check } from "lucide-react";
import { Link } from "react-router-dom";

const highlights = [
  {
    number: "01",
    title: "Thoughtful spaces",
    description:
      "Rooms designed around comfort, calm and everything you need to settle in.",
  },
  {
    number: "02",
    title: "Personal service",
    description:
      "A considered experience from arrival to the moment you leave.",
  },
  {
    number: "03",
    title: "Effortless booking",
    description:
      "Choose your room, select your dates and reserve your stay in just a few steps.",
  },
];

function StayYourWay() {
  return (
    <section className="bg-ivory py-32 lg:py-44">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        
        <div className="mb-16 flex items-center gap-5">
          <span className="text-[11px] font-medium tracking-[0.32em] text-champagne">
            04 — A STAY, YOUR WAY
          </span>

          <span className="h-px w-16 bg-aubergine/30" />
        </div>

        <div className="overflow-hidden bg-aubergine">

          <div className="grid lg:grid-cols-[1.15fr_0.85fr]">

            <div className="px-8 py-16 sm:px-12 lg:px-20 lg:py-24">

              <p className="text-[11px] font-medium tracking-[0.24em] text-champagne">
                YOUR STAY
              </p>

              <h2 className="mt-7 max-w-2xl font-serif text-5xl leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-[5rem]">
                Your time here
                <br />
                should feel
                <br />
                <span className="italic text-champagne">
                  entirely your own.
                </span>
              </h2>

              <p className="mt-9 max-w-xl text-[15px] leading-8 text-white/65 sm:text-base">
                Whether you're here for a quiet weekend, a longer
                escape or an important occasion, choose a stay
                that fits the way you want to travel.
              </p>
              <Link
                to="/rooms"
                className="
                  group
                  mt-10
                  inline-flex
                  items-center
                  gap-3
                  bg-champagne
                  px-7
                  py-4
                  text-[11px]
                  font-medium
                  tracking-[0.2em]
                  text-aubergine
                  transition
                  duration-300
                  hover:bg-white
                "
              >
                FIND YOUR ROOM

                <ArrowUpRight
                  size={16}
                  strokeWidth={1.5}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                    group-hover:-translate-y-1
                  "
                />
              </Link>

            </div>
            <div className="border-t border-white/10 lg:border-l lg:border-t-0">

              {highlights.map((item) => (
                <div
                  key={item.number}
                  className="
                    border-b
                    border-white/10
                    px-8
                    py-10
                    sm:px-12
                    lg:px-14
                    lg:py-12
                  "
                >

                  <div className="flex items-start gap-6">

                    <span className="pt-1 text-[11px] font-medium tracking-[0.18em] text-champagne">
                      {item.number}
                    </span>

                    <div>

                      <h3 className="font-serif text-2xl text-white sm:text-3xl">
                        {item.title}
                      </h3>

                      <p className="mt-4 max-w-sm text-[14px] leading-7 text-white/55">
                        {item.description}
                      </p>

                    </div>

                  </div>

                </div>
              ))}

              <div className="flex items-center gap-3 px-8 py-8 sm:px-12 lg:px-14">

                <div className="flex h-6 w-6 items-center justify-center rounded-full border border-champagne/60">
                  <Check
                    size={12}
                    className="text-champagne"
                  />
                </div>

                <p className="text-[10px] tracking-[0.16em] text-white/50">
                  SECURE RESERVATION · EASY CANCELLATION
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default StayYourWay;