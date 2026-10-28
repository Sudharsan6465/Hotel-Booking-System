import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const rooms = [
  {
    type: "DELUXE ROOM",
    title: "The Quiet Retreat",
    description:
      "Warm materials, generous space and a calm atmosphere designed for unhurried mornings.",
    price: "₹4,500",
    size: "350 SQ FT",
    guests: "2 GUESTS",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85",
  },
  {
    type: "SUITE",
    title: "The Haven Suite",
    description:
      "A spacious retreat combining refined interiors with everything you need for a longer stay.",
    price: "₹6,500",
    size: "500 SQ FT",
    guests: "3 GUESTS",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=85",
  },
];

function FeaturedRooms() {
  return (
    <section className="bg-ivory py-28 lg:py-40">

      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        <div className="mb-20 grid gap-8 lg:grid-cols-[0.8fr_2fr]">

          <div>
            <p className="text-xs font-medium tracking-[0.3em] text-champagne">
              01 — STAYS
            </p>
          </div>

          <div>
            <h2 className="max-w-3xl font-serif text-5xl leading-[1.05] text-aubergine sm:text-6xl lg:text-7xl">
              Spaces designed
              <br />
              <span className="italic">for slowing down.</span>
            </h2>

            <p className="mt-8 max-w-xl text-base leading-7 text-muted">
              Every room at Haven is thoughtfully designed around
              comfort, calm and the small details that make a stay
              memorable.
            </p>
          </div>

        </div>

        <div className="grid items-end gap-10 lg:grid-cols-[1.6fr_0.8fr]">

          <div className="group relative overflow-hidden">

            <img
              src={rooms[0].image}
              alt={rooms[0].title}
              className="h-[520px] w-full object-cover transition duration-700 group-hover:scale-[1.03] lg:h-[650px]"
            />

            <div className="absolute left-6 top-6 bg-white px-4 py-2">
              <span className="text-[10px] font-medium tracking-[0.2em] text-aubergine">
                {rooms[0].type}
              </span>
            </div>

          </div>


          <div className="pb-6 lg:pb-12">

            <p className="mb-4 text-xs tracking-[0.2em] text-muted">
              01
            </p>

            <h3 className="font-serif text-4xl text-aubergine lg:text-5xl">
              {rooms[0].title}
            </h3>

            <p className="mt-6 text-sm leading-7 text-muted">
              {rooms[0].description}
            </p>

            <div className="mt-8 flex gap-8 border-y border-border py-5">

              <div>
                <p className="text-[10px] tracking-[0.15em] text-muted">
                  SIZE
                </p>

                <p className="mt-2 text-xs font-medium text-ink">
                  {rooms[0].size}
                </p>
              </div>

              <div>
                <p className="text-[10px] tracking-[0.15em] text-muted">
                  CAPACITY
                </p>

                <p className="mt-2 text-xs font-medium text-ink">
                  {rooms[0].guests}
                </p>
              </div>

            </div>

            <div className="mt-8 flex items-center justify-between">

              <div>
                <p className="text-[10px] tracking-[0.15em] text-muted">
                  FROM
                </p>

                <p className="mt-1 font-serif text-2xl text-aubergine">
                  {rooms[0].price}
                  <span className="ml-1 font-sans text-xs text-muted">
                    / night
                  </span>
                </p>
              </div>

              <Link
                to="/rooms"
                className="group flex items-center gap-3 border-b border-aubergine pb-2 text-xs font-medium tracking-[0.15em] text-aubergine"
              >
                VIEW ROOM

                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>

            </div>

          </div>

        </div>

        <div className="mt-28 grid items-start gap-10 lg:mt-40 lg:grid-cols-[0.8fr_1.6fr]">

          <div className="order-2 pb-6 lg:order-1 lg:pt-20">

            <p className="mb-4 text-xs tracking-[0.2em] text-muted">
              02
            </p>

            <h3 className="font-serif text-4xl text-aubergine lg:text-5xl">
              {rooms[1].title}
            </h3>

            <p className="mt-6 text-sm leading-7 text-muted">
              {rooms[1].description}
            </p>

            <div className="mt-8 flex gap-8 border-y border-border py-5">

              <div>
                <p className="text-[10px] tracking-[0.15em] text-muted">
                  SIZE
                </p>

                <p className="mt-2 text-xs font-medium">
                  {rooms[1].size}
                </p>
              </div>

              <div>
                <p className="text-[10px] tracking-[0.15em] text-muted">
                  CAPACITY
                </p>

                <p className="mt-2 text-xs font-medium">
                  {rooms[1].guests}
                </p>
              </div>

            </div>

            <div className="mt-8 flex items-center justify-between">

              <div>
                <p className="text-[10px] tracking-[0.15em] text-muted">
                  FROM
                </p>

                <p className="mt-1 font-serif text-2xl text-aubergine">
                  {rooms[1].price}
                  <span className="ml-1 font-sans text-xs text-muted">
                    / night
                  </span>
                </p>
              </div>

              <Link
                to="/rooms"
                className="group flex items-center gap-3 border-b border-aubergine pb-2 text-xs font-medium tracking-[0.15em] text-aubergine"
              >
                VIEW ROOM

                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>

            </div>

          </div>


          <div className="group order-1 overflow-hidden lg:order-2">

            <img
              src={rooms[1].image}
              alt={rooms[1].title}
              className="h-[520px] w-full object-cover transition duration-700 group-hover:scale-[1.03] lg:h-[650px]"
            />

          </div>

        </div>

      </div>

    </section>
  );
}

export default FeaturedRooms;