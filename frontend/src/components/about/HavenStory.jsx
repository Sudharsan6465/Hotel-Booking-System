import { ArrowUpRight } from "lucide-react";

function HavenStory() {
  return (
    <section
      id="about"
      className="bg-ivory py-32 lg:py-44"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        <div className="mb-20 flex items-center gap-5">
          <span className="text-[11px] font-medium tracking-[0.32em] text-champagne">
            03 — THE HAVEN STORY
          </span>

          <span className="h-px w-16 bg-aubergine/30" />
        </div>


        <div className="grid gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">

          <div className="group overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=90"
              alt="Elegant Haven hotel interior"
              className="
                h-[520px]
                w-full
                object-cover
                transition-transform
                duration-1000
                group-hover:scale-[1.025]
                lg:h-[700px]
              "
            />
          </div>


          <div className="lg:pl-10">

            <p className="text-[11px] font-medium tracking-[0.24em] text-champagne">
              OUR PHILOSOPHY
            </p>

            <h2
              className="
                mt-6
                font-serif
                text-5xl
                leading-[1.02]
                tracking-tight
                text-aubergine
                sm:text-6xl
                lg:text-[4.5rem]
              "
            >
              A place
              <br />
              to <span className="italic">pause.</span>
              <br />
              A place
              <br />
              to <span className="italic">belong.</span>
            </h2>

            <p
              className="
                mt-9
                max-w-lg
                text-[15px]
                leading-8
                text-muted
                sm:text-base
              "
            >
              Haven was created around a simple idea: a hotel
              should give you more than somewhere to sleep.
              It should give you space to slow down, reconnect
              and experience the destination at your own pace.
            </p>

            <p
              className="
                mt-5
                max-w-lg
                text-[15px]
                leading-8
                text-muted
                sm:text-base
              "
            >
              Every detail, from the rooms to the shared spaces,
              is thoughtfully considered to make your stay feel
              effortless.
            </p>

            <button
              className="
                group
                mt-10
                flex
                items-center
                gap-3
                border-b
                border-aubergine
                pb-3
                text-[11px]
                font-medium
                tracking-[0.22em]
                text-aubergine
              "
            >
              OUR STORY

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
            </button>

          </div>
        </div>

        <div
          className="
            mt-28
            grid
            border-y
            border-border
            sm:grid-cols-3
            lg:mt-40
          "
        >
          <div className="border-b border-border py-10 sm:border-b-0 sm:border-r sm:px-10 lg:px-16">

            <p className="font-serif text-5xl text-aubergine lg:text-6xl">
              2026
            </p>

            <p className="mt-3 text-[10px] font-medium tracking-[0.22em] text-muted">
              ESTABLISHED
            </p>

          </div>

          <div className="border-b border-border py-10 sm:border-b-0 sm:border-r sm:px-10 lg:px-16">

            <p className="font-serif text-5xl text-aubergine lg:text-6xl">
              24
            </p>

            <p className="mt-3 text-[10px] font-medium tracking-[0.22em] text-muted">
              ROOMS & SUITES
            </p>

          </div>

          <div className="py-10 sm:px-10 lg:px-16">

            <p className="font-serif text-5xl text-aubergine lg:text-6xl">
              04
            </p>

            <p className="mt-3 text-[10px] font-medium tracking-[0.22em] text-muted">
              SIGNATURE EXPERIENCES
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}

export default HavenStory;