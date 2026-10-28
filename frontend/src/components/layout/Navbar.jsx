import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    ArrowUpRight,
    ChevronDown,
    Menu,
    X,
    User,
    CalendarDays,
    LogOut
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

function Navbar() {

    const navigate = useNavigate();

    const {
        user,
        isAuthenticated,
        logout
    } = useAuth();

    const [profileOpen, setProfileOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogout = () => {

        logout();

        setProfileOpen(false);
        setMobileOpen(false);

        navigate("/login");

    };

    const closeMobileMenu = () => {
        setMobileOpen(false);
    };


    return (
        <header className="absolute left-0 top-0 z-50 w-full">

            <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">


                <Link
                    to="/"
                    className="group flex items-center gap-3"
                    onClick={closeMobileMenu}
                >

                    <div className="flex h-10 w-10 items-center justify-center border border-champagne/70 transition group-hover:border-champagne">

                        <span className="font-serif text-lg text-champagne">
                            H
                        </span>

                    </div>


                    <div className="leading-none">

                        <p className="text-sm font-medium tracking-[0.28em] text-white">
                            HAVEN
                        </p>

                        <p className="mt-1 text-[9px] tracking-[0.35em] text-white/60">
                            HOTEL & RESIDENCES
                        </p>

                    </div>

                </Link>


                <div className="hidden items-center gap-10 md:flex">

                    <Link
                        to="/rooms"
                        className="text-sm tracking-wide text-white/80 transition hover:text-champagne"
                    >
                        Stays
                    </Link>


                    <a
                        href="#experiences"
                        className="text-sm tracking-wide text-white/80 transition hover:text-champagne"
                    >
                        Experiences
                    </a>


                    <a
                        href="#about"
                        className="text-sm tracking-wide text-white/80 transition hover:text-champagne"
                    >
                        About
                    </a>

                </div>


                <div className="hidden items-center gap-6 md:flex">


                    {!isAuthenticated ? (

                        <>
                            <Link
                                to="/login"
                                className="text-sm tracking-wide text-white/80 transition hover:text-champagne"
                            >
                                Sign in
                            </Link>


                            <Link
                                to="/rooms"
                                className="
                                    group
                                    flex
                                    items-center
                                    gap-2
                                    border
                                    border-champagne
                                    bg-champagne
                                    px-5
                                    py-3
                                    text-xs
                                    font-medium
                                    tracking-[0.15em]
                                    text-aubergine
                                    transition
                                    hover:bg-transparent
                                    hover:text-champagne
                                "
                            >

                                RESERVE

                                <ArrowUpRight
                                    size={14}
                                    className="
                                        transition-transform
                                        duration-300
                                        group-hover:translate-x-1
                                        group-hover:-translate-y-1
                                    "
                                />

                            </Link>
                        </>

                    ) : (
                        <div className="relative">


                            <button
                                onClick={() =>
                                    setProfileOpen(
                                        !profileOpen
                                    )
                                }
                                className="
                                    flex
                                    items-center
                                    gap-3
                                    text-white
                                    transition
                                    hover:text-champagne
                                "
                            >

                                <div className="flex h-9 w-9 items-center justify-center border border-champagne/60">

                                    <User
                                        size={16}
                                        strokeWidth={1.5}
                                    />

                                </div>


                                <span className="text-sm tracking-wide">

                                    {user?.userName || "Guest"}

                                </span>


                                <ChevronDown
                                    size={15}
                                    className={`
                                        transition-transform
                                        duration-300
                                        ${
                                            profileOpen
                                                ? "rotate-180"
                                                : ""
                                        }
                                    `}
                                />

                            </button>

                            {profileOpen && (

                                <div
                                    className="
                                        absolute
                                        right-0
                                        top-14
                                        w-64
                                        border
                                        border-white/10
                                        bg-aubergine
                                        p-2
                                        shadow-2xl
                                    "
                                >
                                    <div className="border-b border-white/10 px-4 py-4">

                                        <p className="text-[9px] tracking-[0.2em] text-champagne">
                                            WELCOME
                                        </p>

                                        <p className="mt-2 text-sm text-white">
                                            {user?.userName}
                                        </p>

                                        <p className="mt-1 text-[11px] text-white/40">
                                            {user?.email}
                                        </p>

                                    </div>

                                    <Link
                                        to="/account"
                                        onClick={() =>
                                            setProfileOpen(false)
                                        }
                                        className="
                                            flex
                                            items-center
                                            gap-3
                                            px-4
                                            py-4
                                            text-sm
                                            text-white/80
                                            transition
                                            hover:bg-white/5
                                            hover:text-champagne
                                        "
                                    >

                                        <User
                                            size={16}
                                            strokeWidth={1.5}
                                        />

                                        My Account

                                    </Link>

                                    <Link
                                        to="/my-bookings"
                                        onClick={() =>
                                            setProfileOpen(false)
                                        }
                                        className="
                                            flex
                                            items-center
                                            gap-3
                                            px-4
                                            py-4
                                            text-sm
                                            text-white/80
                                            transition
                                            hover:bg-white/5
                                            hover:text-champagne
                                        "
                                    >

                                        <CalendarDays
                                            size={16}
                                            strokeWidth={1.5}
                                        />

                                        My Bookings

                                    </Link>

                                    <button
                                        onClick={handleLogout}
                                        className="
                                            flex
                                            w-full
                                            items-center
                                            gap-3
                                            border-t
                                            border-white/10
                                            px-4
                                            py-4
                                            text-left
                                            text-sm
                                            text-white/60
                                            transition
                                            hover:text-red-300
                                        "
                                    >

                                        <LogOut
                                            size={16}
                                            strokeWidth={1.5}
                                        />

                                        Logout

                                    </button>

                                </div>

                            )}

                        </div>

                    )}

                </div>

                <button
                    onClick={() =>
                        setMobileOpen(!mobileOpen)
                    }
                    className="text-white md:hidden"
                    aria-label={
                        mobileOpen
                            ? "Close menu"
                            : "Open menu"
                    }
                >

                    {mobileOpen ? (
                        <X size={25} />
                    ) : (
                        <Menu size={25} />
                    )}

                </button>

            </nav>

            {mobileOpen && (

                <div className="border-t border-white/10 bg-aubergine md:hidden">

                    <div className="px-6 py-6">


                        <Link
                            to="/rooms"
                            onClick={closeMobileMenu}
                            className="
                                block
                                border-b
                                border-white/10
                                py-5
                                text-sm
                                tracking-wide
                                text-white
                            "
                        >
                            Stays
                        </Link>

                        <a
                            href="#experiences"
                            onClick={closeMobileMenu}
                            className="
                                block
                                border-b
                                border-white/10
                                py-5
                                text-sm
                                tracking-wide
                                text-white
                            "
                        >
                            Experiences
                        </a>

                        <a
                            href="#about"
                            onClick={closeMobileMenu}
                            className="
                                block
                                border-b
                                border-white/10
                                py-5
                                text-sm
                                tracking-wide
                                text-white
                            "
                        >
                            About
                        </a>


                        {!isAuthenticated ? (

                            <>

                                <Link
                                    to="/login"
                                    onClick={closeMobileMenu}
                                    className="
                                        block
                                        border-b
                                        border-white/10
                                        py-5
                                        text-sm
                                        tracking-wide
                                        text-champagne
                                    "
                                >
                                    Sign in
                                </Link>

                                <Link
                                    to="/rooms"
                                    onClick={closeMobileMenu}
                                    className="
                                        mt-6
                                        flex
                                        items-center
                                        justify-center
                                        gap-2
                                        bg-champagne
                                        px-5
                                        py-4
                                        text-xs
                                        font-medium
                                        tracking-[0.15em]
                                        text-aubergine
                                    "
                                >

                                    RESERVE

                                    <ArrowUpRight
                                        size={14}
                                    />

                                </Link>
                            </>

                        ) : (

                            <>

                                <div className="border-b border-white/10 py-5">

                                    <p className="text-[9px] tracking-[0.2em] text-champagne">
                                        SIGNED IN AS
                                    </p>

                                    <p className="mt-2 text-sm text-white">
                                        {user?.userName}
                                    </p>

                                    <p className="mt-1 text-[11px] text-white/40">
                                        {user?.email}
                                    </p>

                                </div>

                                <Link
                                    to="/account"
                                    onClick={closeMobileMenu}
                                    className="
                                        flex
                                        items-center
                                        gap-3
                                        border-b
                                        border-white/10
                                        py-5
                                        text-sm
                                        text-white
                                    "
                                >

                                    <User size={17} />

                                    My Account

                                </Link>

                                <Link
                                    to="/my-bookings"
                                    onClick={closeMobileMenu}
                                    className="
                                        flex
                                        items-center
                                        gap-3
                                        border-b
                                        border-white/10
                                        py-5
                                        text-sm
                                        text-white
                                    "
                                >

                                    <CalendarDays size={17} />

                                    My Bookings

                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="
                                        flex
                                        w-full
                                        items-center
                                        gap-3
                                        py-5
                                        text-left
                                        text-sm
                                        text-red-300
                                    "
                                >

                                    <LogOut size={17} />

                                    Logout

                                </button>

                            </>

                        )}

                    </div>

                </div>

            )}

        </header>
    );
}

export default Navbar;