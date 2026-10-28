import { ArrowUpRight } from "lucide-react";

function Experiences() {
  return (
    <section
      id="experiences"
      className="bg-aubergine py-28 lg:py-40"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        <div className="mb-16 flex items-center gap-4">
          <span className="text-xs font-medium tracking-[0.3em] text-champagne">
            02 — EXPERIENCES
          </span>

          <span className="h-px w-16 bg-champagne/50" />
        </div>

        <div className="relative">

          <div className="overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1800&q=85"
              alt="Luxury hotel swimming pool"
              className="h-[500px] w-full object-cover transition duration-1000 hover:scale-[1.02] lg:h-[720px]"
            />
          </div>
          <div className="absolute left-6 top-6">
            <p className="text-[10px] tracking-[0.25em] text-white/70">
              HAVEN · EXPERIENCE 01
            </p>
          </div>
          <div className="relative -mt-24 ml-auto w-[90%] bg-ivory px-7 py-10 sm:w-[75%] sm:px-12 lg:-mt-48 lg:w-[52%] lg:px-16 lg:py-16">

            <p className="text-xs font-medium tracking-[0.2em] text-champagne">
              MORE THAN A ROOM
            </p>

            <h2 className="mt-5 font-serif text-5xl leading-[1.02] text-aubergine sm:text-6xl">
              Moments worth
              <br />
              <span className="italic">
                remembering.
              </span>
            </h2>

            <p className="mt-7 max-w-md text-sm leading-7 text-muted">
              From slow mornings by the pool to intimate evenings
              around the table, Haven is designed to give you space
              to experience the stay beyond the room.
            </p>

            <div className="mt-10 border-t border-border">

              <div className="flex items-center justify-between border-b border-border py-5">
                <div>
                  <p className="text-[10px] tracking-[0.2em] text-muted">
                    01
                  </p>

                  <p className="mt-1 text-sm font-medium text-ink">
                    Wellness & Relaxation
                  </p>
                </div>

                <ArrowUpRight
                  size={17}
                  className="text-aubergine"
                />
              </div>

              <div className="flex items-center justify-between border-b border-border py-5">
                <div>
                  <p className="text-[10px] tracking-[0.2em] text-muted">
                    02
                  </p>

                  <p className="mt-1 text-sm font-medium text-ink">
                    Dining & Gatherings
                  </p>
                </div>

                <ArrowUpRight
                  size={17}
                  className="text-aubergine"
                />
              </div>

              <div className="flex items-center justify-between border-b border-border py-5">
                <div>
                  <p className="text-[10px] tracking-[0.2em] text-muted">
                    03
                  </p>

                  <p className="mt-1 text-sm font-medium text-ink">
                    Poolside Moments
                  </p>
                </div>

                <ArrowUpRight
                  size={17}
                  className="text-aubergine"
                />
              </div>

            </div>

            <button className="group mt-10 flex items-center gap-3 border-b border-aubergine pb-2 text-xs font-medium tracking-[0.18em] text-aubergine">
              DISCOVER HAVEN

              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </button>

          </div>
        </div>

      </div>
    </section>
  );
}

export default Experiences;