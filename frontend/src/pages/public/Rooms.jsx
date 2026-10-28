import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getAllRooms } from "../../api/roomApi";

function Rooms() {

    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchRooms = async () => {

            try {

                const data = await getAllRooms();

                setRooms(data);

            } catch (err) {

                console.error("ROOM FETCH ERROR:", err);

                setError(
                    err.response?.data?.message ||
                    "Unable to load rooms."
                );

            } finally {

                setLoading(false);

            }
        };

        fetchRooms();

    }, []);

    return (
        <main className="min-h-screen bg-ivory">
            <section className="bg-aubergine px-6 py-24 text-white lg:px-10 lg:py-32">

                <div className="mx-auto max-w-7xl">

                    <p className="text-[11px] tracking-[0.3em] text-champagne">
                        HAVEN — STAYS
                    </p>

                    <h1 className="mt-6 max-w-3xl font-serif text-6xl leading-[0.95] sm:text-7xl lg:text-[7rem]">
                        Spaces designed
                        <br />
                        <span className="italic text-champagne">
                            for slowing down.
                        </span>
                    </h1>

                    <p className="mt-8 max-w-xl text-sm leading-7 text-white/60 sm:text-base">
                        Discover rooms and suites thoughtfully designed
                        for quiet mornings, restful nights and memorable stays.
                    </p>

                </div>

            </section>
            <section className="px-6 py-24 lg:px-10 lg:py-32">

                <div className="mx-auto max-w-7xl">
                    {loading && (
                        <div className="py-20 text-center">

                            <p className="text-sm tracking-[0.2em] text-muted">
                                LOADING ROOMS...
                            </p>

                        </div>
                    )}
                    {!loading && error && (
                        <div className="border border-red-200 bg-red-50 p-6 text-sm text-red-700">
                            {error}
                        </div>
                    )}
                    {!loading && !error && rooms.length === 0 && (
                        <div className="py-20 text-center">

                            <p className="font-serif text-3xl text-aubergine">
                                No rooms available
                            </p>

                            <p className="mt-3 text-sm text-muted">
                                Please check again later.
                            </p>

                        </div>
                    )}

                    {!loading && !error && rooms.length > 0 && (

                        <div className="grid gap-16 md:grid-cols-2">

                            {rooms.map((room) => (

                                <article
                                    key={room.roomId}
                                    className="group"
                                >
                                    <div className="relative h-[420px] overflow-hidden bg-[#e8e1d8]">

                                        <img
                                            src={
                                                room.imageUrl ||
                                                "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85"
                                            }
                                            alt={room.roomNumber}
                                            className="
                                                h-full
                                                w-full
                                                object-cover
                                                transition-transform
                                                duration-700
                                                group-hover:scale-[1.03]
                                            "
                                        />
                                        <div className="absolute left-5 top-5 bg-ivory px-4 py-2">

                                            <span className="text-[9px] font-medium tracking-[0.2em] text-aubergine">
                                                {room.available
                                                    ? "AVAILABLE"
                                                    : "UNAVAILABLE"}
                                            </span>

                                        </div>

                                    </div>
                                    <div className="mt-7">

                                        <div className="flex items-start justify-between gap-5">

                                            <div>

                                                <p className="text-[10px] tracking-[0.22em] text-champagne">
                                                    ROOM {room.roomNumber}
                                                </p>

                                                <h2 className="mt-3 font-serif text-4xl text-aubergine">
                                                    {room.roomType}
                                                </h2>

                                            </div>

                                            <div className="text-right">

                                                <p className="text-[10px] tracking-[0.15em] text-muted">
                                                    FROM
                                                </p>

                                                <p className="mt-1 font-serif text-2xl text-aubergine">
                                                    ₹{room.pricePerNight}
                                                </p>

                                                <p className="text-[10px] text-muted">
                                                    / NIGHT
                                                </p>

                                            </div>

                                        </div>

                                            <p className="mt-6 max-w-xl text-sm leading-7 text-muted">
                                                {room.description}
                                            </p>
                                                                     
                                            <div className="mt-6 flex flex-wrap gap-10 border-y border-border py-5">
                                                                                            
                                                <div>
                                                    <p className="text-[9px] tracking-[0.18em] text-muted">
                                                        CAPACITY
                                                    </p>
                                                                                            
                                                    <p className="mt-2 text-sm text-ink">
                                                        {room.capacity} Guests
                                                    </p>
                                                </div>
                                                                                            
                                                                                            
                                                <div>
                                                    <p className="text-[9px] tracking-[0.18em] text-muted">
                                                        ROOM SIZE
                                                    </p>
                                                                                            
                                                    <p className="mt-2 text-sm text-ink">
                                                        {room.roomSize}
                                                    </p>
                                                </div>
                                                                                            
                                                                                            
                                                <div>
                                                    <p className="text-[9px] tracking-[0.18em] text-muted">
                                                        FLOOR
                                                    </p>
                                                                                            
                                                    <p className="mt-2 text-sm text-ink">
                                                        {room.floor}
                                                    </p>
                                                </div>
                                                                                            
                                            </div>
                                                      
                                        <Link
                                            to={`/rooms/${room.roomId}`}
                                            className="
                                                group/link
                                                mt-6
                                                inline-flex
                                                items-center
                                                gap-3
                                                border-b
                                                border-aubergine
                                                pb-2
                                                text-[10px]
                                                font-medium
                                                tracking-[0.2em]
                                                text-aubergine
                                            "
                                        >
                                            VIEW ROOM

                                            <ArrowUpRight
                                                size={15}
                                                strokeWidth={1.5}
                                                className="
                                                    transition-transform
                                                    duration-300
                                                    group-hover/link:-translate-y-1
                                                    group-hover/link:translate-x-1
                                                "
                                            />

                                        </Link>

                                    </div>

                                </article>

                            ))}

                        </div>

                    )}

                </div>

            </section>

        </main>
    );
}

export default Rooms;