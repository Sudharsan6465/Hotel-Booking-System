import { ArrowDown, Search } from "lucide-react";

function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=85')",
        }}
      />

      <div className="absolute inset-0 bg-[#1b111d]/55" />

      <div className="absolute inset-0 bg-aubergine/20" />

      <div className="relative z-10 flex min-h-screen items-center">

        <div className="mx-auto w-full max-w-7xl px-6 pb-28 pt-32 lg:px-10">

          <div className="max-w-3xl">

            <p className="mb-6 text-xs font-medium tracking-[0.35em] text-champagne">
              A BOUTIQUE HOTEL EXPERIENCE
            </p>

            <h1 className="font-serif text-6xl leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-8xl">
              Stay somewhere
              <br />
              <span className="italic text-champagne">
                unforgettable.
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-base leading-7 text-white/75 sm:text-lg">
              Thoughtfully designed spaces, quiet moments and
              experiences created around the way you want to travel.
            </p>

          </div>

          <div className="absolute bottom-10 left-6 hidden items-center gap-4 lg:flex">

            <div className="h-px w-12 bg-champagne" />

            <span className="text-[10px] tracking-[0.3em] text-white/60">
              DISCOVER
            </span>

            <ArrowDown
              size={14}
              className="text-champagne"
            />

          </div>

        </div>

      </div>

<div className="absolute bottom-0 left-0 z-20 w-full">
  <div className="mx-auto max-w-6xl px-6 lg:px-10">
    <div className="grid bg-white shadow-2xl md:grid-cols-[1fr_1fr_0.8fr_auto]">

      <div className="border-b border-border px-6 py-5 md:border-b-0 md:border-r">
        <p className="mb-2 text-[10px] font-medium tracking-[0.2em] text-muted">
          CHECK IN
        </p>

        <p className="text-sm font-medium text-ink">
          Select date
        </p>
      </div>

      <div className="border-b border-border px-6 py-5 md:border-b-0 md:border-r">
        <p className="mb-2 text-[10px] font-medium tracking-[0.2em] text-muted">
          CHECK OUT
        </p>

        <p className="text-sm font-medium text-ink">
          Select date
        </p>
      </div>

      <div className="border-b border-border px-6 py-5 md:border-b-0 md:border-r">
        <p className="mb-2 text-[10px] font-medium tracking-[0.2em] text-muted">
          GUESTS
        </p>

        <p className="text-sm font-medium text-ink">
          2 Guests
        </p>
      </div>

      <button className="group flex items-center justify-center gap-3 bg-aubergine px-8 py-5 text-xs font-medium tracking-[0.18em] text-champagne transition hover:bg-[#3b2541]">
        SEARCH

        <Search
          size={15}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </button>

    </div>
  </div>
</div>

    </section>
  );
}

export default Hero;