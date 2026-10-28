import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#211621] text-white">

      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">

        <div className="grid gap-16 lg:grid-cols-[1.4fr_0.6fr_0.6fr_0.8fr]">

          <div>

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center border border-champagne/70">
                <span className="font-serif text-xl text-champagne">
                  H
                </span>
              </div>

              <div>
                <p className="text-sm font-medium tracking-[0.3em]">
                  HAVEN
                </p>

                <p className="mt-1 text-[9px] tracking-[0.35em] text-white/40">
                  HOTEL & RESIDENCES
                </p>
              </div>

            </div>

            <h2 className="mt-10 max-w-md font-serif text-4xl leading-tight sm:text-5xl">
              Your next escape
              <br />
              <span className="italic text-champagne">
                starts here.
              </span>
            </h2>

            <Link
              to="/rooms"
              className="group mt-8 inline-flex items-center gap-3 border-b border-champagne pb-3 text-[11px] font-medium tracking-[0.2em] text-champagne"
            >
              EXPLORE ROOMS

              <ArrowUpRight
                size={16}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>

          </div>

          <div>

            <p className="text-[10px] font-medium tracking-[0.25em] text-champagne">
              EXPLORE
            </p>

            <div className="mt-7 space-y-4">

              <Link
                to="/rooms"
                className="block text-sm text-white/60 transition hover:text-white"
              >
                Rooms & Suites
              </Link>

              <a
                href="#experiences"
                className="block text-sm text-white/60 transition hover:text-white"
              >
                Experiences
              </a>

              <a
                href="#about"
                className="block text-sm text-white/60 transition hover:text-white"
              >
                Our Story
              </a>

            </div>

          </div>

          <div>

            <p className="text-[10px] font-medium tracking-[0.25em] text-champagne">
              CONTACT
            </p>

            <div className="mt-7 space-y-4 text-sm text-white/60">

              <p>
                hello@havenhotel.com
              </p>

              <p>
                +91 98765 43210
              </p>

              <p className="max-w-xs leading-6">
                Coimbatore,
                <br />
                Tamil Nadu, India
              </p>

            </div>

          </div>


          <div>

            <p className="text-[10px] font-medium tracking-[0.25em] text-champagne">
              FOLLOW
            </p>

            <div className="mt-7 space-y-4">

              <a
                href="#"
                className="group flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
              >
                Instagram

                <ArrowUpRight
                  size={13}
                  className="opacity-0 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-100"
                />
              </a>

              <a
                href="#"
                className="group flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
              >
                Facebook

                <ArrowUpRight
                  size={13}
                  className="opacity-0 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-100"
                />
              </a>

            </div>

          </div>

        </div>


        <div className="my-16 h-px bg-white/10" />

        <div className="flex flex-col gap-5 text-[10px] tracking-[0.15em] text-white/35 sm:flex-row sm:items-center sm:justify-between">

          <p>
            © 2026 HAVEN HOTEL & RESIDENCES
          </p>

          <div className="flex gap-7">

            <a
              href="#"
              className="transition hover:text-white"
            >
              PRIVACY
            </a>

            <a
              href="#"
              className="transition hover:text-white"
            >
              TERMS
            </a>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;