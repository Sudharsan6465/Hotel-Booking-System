import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Edit3,
  LogOut,
  Menu,
  Plus,
  Search,
  Trash2,
  Users,
  X,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

import {
  getAllRooms,
  addRoom,
  updateRoom,
  deleteRoom,
} from "../../api/roomApi";


function AdminRooms() {

  const navigate = useNavigate();

  const { user, logout } = useAuth();


  const [rooms, setRooms] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [typeFilter, setTypeFilter] = useState("ALL");

  const [availabilityFilter, setAvailabilityFilter] =
    useState("ALL");


  const [showModal, setShowModal] = useState(false);

  const [editingRoom, setEditingRoom] = useState(null);


  const [formData, setFormData] = useState({
    roomNumber: "",
    roomType: "STANDARD",
    pricePerNight: "",
    roomSize: "",
    capacity: "",
    floor: "",
    description: "",
    available: true,
  });


  const [saving, setSaving] = useState(false);

  const [deletingId, setDeletingId] = useState(null);

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);


  const loadRooms = async () => {

    try {

      setLoading(true);

      setError("");

      const data = await getAllRooms();

      setRooms(data || []);

    } catch (err) {

      console.error("ROOM LOAD ERROR:", err);

      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Unable to load rooms."
      );

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {

    loadRooms();

  }, []);


  const statistics = useMemo(() => {

    const total = rooms.length;

    const available = rooms.filter(
      (room) => room.available === true
    ).length;

    const unavailable = rooms.filter(
      (room) => room.available === false
    ).length;

    const suites = rooms.filter(
      (room) => room.roomType === "SUITE"
    ).length;

    return {
      total,
      available,
      unavailable,
      suites,
    };

  }, [rooms]);


  const filteredRooms = useMemo(() => {

    const searchValue =
      search.trim().toLowerCase();


    return rooms.filter((room) => {

      const matchesSearch =
        !searchValue ||

        String(room.roomNumber || "")
          .toLowerCase()
          .includes(searchValue) ||

        String(room.roomType || "")
          .toLowerCase()
          .includes(searchValue) ||

        String(room.description || "")
          .toLowerCase()
          .includes(searchValue);


      const matchesType =
        typeFilter === "ALL" ||
        room.roomType === typeFilter;


      const matchesAvailability =
        availabilityFilter === "ALL" ||

        (
          availabilityFilter === "AVAILABLE" &&
          room.available === true
        ) ||

        (
          availabilityFilter === "UNAVAILABLE" &&
          room.available === false
        );


      return (
        matchesSearch &&
        matchesType &&
        matchesAvailability
      );

    });

  }, [
    rooms,
    search,
    typeFilter,
    availabilityFilter,
  ]);


  const openAddModal = () => {

    setEditingRoom(null);

    setFormData({
      roomNumber: "",
      roomType: "STANDARD",
      pricePerNight: "",
      roomSize: "",
      capacity: "",
      floor: "",
      description: "",
      available: true,
    });

    setError("");

    setShowModal(true);
  };


  const openEditModal = (room) => {

    setEditingRoom(room);

    setFormData({
      roomNumber: room.roomNumber || "",
      roomType: room.roomType || "STANDARD",
      pricePerNight: room.pricePerNight ?? "",
      roomSize: room.roomSize || "",
      capacity: room.capacity ?? "",
      floor: room.floor ?? "",
      description: room.description || "",
      available: room.available ?? true,
    });

    setError("");

    setShowModal(true);
  };


  const closeModal = () => {

    if (saving) {
      return;
    }

    setShowModal(false);

    setEditingRoom(null);
  };


  const handleChange = (e) => {

    const {
      name,
      value,
      type,
      checked,
    } = e.target;


    setFormData((previous) => ({
      ...previous,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");


    if (!formData.roomNumber.trim()) {

      setError("Room number is required.");

      return;
    }


    if (!formData.pricePerNight) {

      setError("Price per night is required.");

      return;
    }


    if (Number(formData.pricePerNight) < 0) {

      setError("Price cannot be negative.");

      return;
    }


    if (!formData.capacity) {

      setError("Capacity is required.");

      return;
    }


    if (Number(formData.capacity) < 1) {

      setError("Capacity must be at least 1.");

      return;
    }


    if (!formData.floor && formData.floor !== 0) {

      setError("Floor is required.");

      return;
    }


    try {

      setSaving(true);


      const payload = {

        roomNumber:
          formData.roomNumber.trim(),

        roomType:
          formData.roomType,

        pricePerNight:
          Number(formData.pricePerNight),

        roomSize:
          formData.roomSize.trim(),

        capacity:
          Number(formData.capacity),

        floor:
          Number(formData.floor),

        description:
          formData.description.trim(),

        available:
          Boolean(formData.available),

      };


      let savedRoom;


      if (editingRoom) {

        savedRoom = await updateRoom(
          editingRoom.roomId,
          payload
        );


        setRooms((currentRooms) =>
          currentRooms.map((room) =>
            room.roomId === editingRoom.roomId
              ? savedRoom
              : room
          )
        );
      }


      else {

        savedRoom = await addRoom(payload);


        setRooms((currentRooms) => [
          savedRoom,
          ...currentRooms,
        ]);
      }


      setShowModal(false);

      setEditingRoom(null);

    } catch (err) {

      console.error("ROOM SAVE ERROR:", err);

      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Unable to save room."
      );

    } finally {

      setSaving(false);
    }
  };


  const handleDelete = async (room) => {

    const confirmed = window.confirm(
      `Delete room ${room.roomNumber}?`
    );


    if (!confirmed) {
      return;
    }


    try {

      setDeletingId(room.roomId);

      setError("");

      await deleteRoom(room.roomId);


      setRooms((currentRooms) =>
        currentRooms.filter(
          (item) =>
            item.roomId !== room.roomId
        )
      );

    } catch (err) {

      console.error("ROOM DELETE ERROR:", err);

      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Unable to delete room."
      );

    } finally {

      setDeletingId(null);
    }
  };


  const handleLogout = () => {

    logout();

    navigate("/login");
  };


  const formatPrice = (price) => {

    return Number(price || 0).toLocaleString(
      "en-IN",
      {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }
    );
  };


  const roomTypeLabel = (type) => {

    switch (type) {

      case "STANDARD":
        return "Standard";

      case "DELUXE":
        return "Deluxe";

      case "SUITE":
        return "Suite";

      case "FAMILY":
        return "Family";

      default:
        return type;

    }
  };


  return (

    <div className="admin-page">


      <aside
        className={`admin-sidebar ${
          mobileMenuOpen
            ? "admin-sidebar-open"
            : ""
        }`}
      >


        <Link
          to="/admin"
          className="admin-brand"
          onClick={() =>
            setMobileMenuOpen(false)
          }
        >

          <div className="admin-logo">
            H
          </div>


          <div>

            <div className="admin-brand-name">
              HAVEN
            </div>

            <div className="admin-brand-subtitle">
              HOTEL & RESIDENCES
            </div>

          </div>

        </Link>


        <div className="admin-panel-label">
          ADMINISTRATION
        </div>


        <nav className="admin-navigation">

          <Link
            to="/admin"
            className="admin-nav-item"
          >

            <CalendarDays size={18} />

            <span>
              Dashboard
            </span>

          </Link>


          <Link
            to="/admin/bookings"
            className="admin-nav-item"
          >

            <Clock3 size={18} />

            <span>
              Bookings
            </span>

          </Link>


          <Link
            to="/admin/rooms"
            className="admin-nav-item active"
          >

            <CalendarDays size={18} />

            <span>
              Rooms
            </span>

          </Link>


          <Link
            to="/admin/users"
            className="admin-nav-item"
          >

            <Users size={18} />

            <span>
              Users
            </span>

          </Link>

        </nav>


        <div className="admin-sidebar-bottom">

          <div className="admin-user">

            <div className="admin-user-avatar">

              {user?.userName
                ?.charAt(0)
                ?.toUpperCase() || "A"}

            </div>


            <div>

              <strong>
                {user?.userName ||
                  "Administrator"}
              </strong>

              <span>
                Administrator
              </span>

            </div>

          </div>


          <button
            className="admin-logout"
            onClick={handleLogout}
          >

            <LogOut size={17} />

            <span>
              Sign out
            </span>

          </button>

        </div>

      </aside>


      {mobileMenuOpen && (

        <div
          className="admin-mobile-overlay"
          onClick={() =>
            setMobileMenuOpen(false)
          }
        />

      )}


      <main className="admin-main">


        <header className="admin-topbar">

          <button
            className="admin-mobile-menu"
            onClick={() =>
              setMobileMenuOpen(true)
            }
          >

            <Menu size={21} />

          </button>


          <div>

            <span className="admin-eyebrow">
              HAVEN / ROOMS
            </span>


            <h1>
              Room
              <em> management.</em>
            </h1>

          </div>


          <div className="admin-topbar-right">

            <span className="admin-role">
              ADMIN
            </span>


            <button
              onClick={handleLogout}
              className="topbar-logout"
            >

              <LogOut size={16} />

            </button>

          </div>

        </header>


        <section className="admin-intro">

          <div>

            <span>
              ACCOMMODATION
            </span>


            <h2>

              Every room,

              <br />

              <em>
                thoughtfully managed.
              </em>

            </h2>

          </div>


          <div className="flex flex-col items-start gap-4">

            <p className="max-w-md">

              Manage Haven's rooms,
              pricing, availability and
              guest capacity from one place.

            </p>


            <button
              onClick={openAddModal}
              className="group flex items-center gap-3 bg-aubergine px-6 py-4 text-[10px] tracking-[0.18em] text-champagne transition hover:bg-[#3b2541]"
            >

              <Plus size={16} />

              ADD NEW ROOM

              <ArrowUpRight
                size={14}
                className="transition group-hover:-translate-y-1 group-hover:translate-x-1"
              />

            </button>

          </div>

        </section>


        {error && (

          <div className="admin-error">

            <span>
              {error}
            </span>


            <button
              onClick={() => setError("")}
            >

              <X size={14} />

            </button>

          </div>

        )}


        <section className="grid grid-cols-2 gap-px border border-border bg-border md:grid-cols-4">

          <button
            onClick={() => {
              setTypeFilter("ALL");
              setAvailabilityFilter("ALL");
            }}
            className="bg-ivory p-6 text-left transition hover:bg-white"
          >

            <span className="text-[9px] tracking-[0.18em] text-muted">
              TOTAL ROOMS
            </span>


            <strong className="mt-3 block font-serif text-4xl">
              {statistics.total}
            </strong>

          </button>


          <button
            onClick={() =>
              setAvailabilityFilter("AVAILABLE")
            }
            className="bg-ivory p-6 text-left transition hover:bg-white"
          >

            <span className="text-[9px] tracking-[0.18em] text-muted">
              AVAILABLE
            </span>


            <strong className="mt-3 block font-serif text-4xl">
              {statistics.available}
            </strong>

          </button>


          <button
            onClick={() =>
              setAvailabilityFilter("UNAVAILABLE")
            }
            className="bg-ivory p-6 text-left transition hover:bg-white"
          >

            <span className="text-[9px] tracking-[0.18em] text-muted">
              UNAVAILABLE
            </span>


            <strong className="mt-3 block font-serif text-4xl">
              {statistics.unavailable}
            </strong>

          </button>


          <button
            onClick={() => {
              setTypeFilter("SUITE");
              setAvailabilityFilter("ALL");
            }}
            className="bg-ivory p-6 text-left transition hover:bg-white"
          >

            <span className="text-[9px] tracking-[0.18em] text-muted">
              SUITES
            </span>


            <strong className="mt-3 block font-serif text-4xl">
              {statistics.suites}
            </strong>

          </button>

        </section>


        <section className="mt-8 flex flex-col gap-4 border border-border bg-white p-5 lg:flex-row lg:items-center lg:justify-between">


          <div className="relative w-full lg:max-w-md">

            <Search
              size={17}
              className="absolute left-0 top-1/2 -translate-y-1/2 text-muted"
            />


            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search room, type or description..."
              className="w-full border-0 border-b border-border bg-transparent py-3 pl-8 pr-3 text-sm text-ink outline-none transition focus:border-aubergine"
            />

          </div>


          <div className="flex flex-col gap-3 sm:flex-row">


            <div className="flex items-center gap-3">

              <span className="text-[9px] tracking-[0.16em] text-muted">
                TYPE
              </span>


              <select
                value={typeFilter}
                onChange={(e) =>
                  setTypeFilter(e.target.value)
                }
                className="border border-border bg-ivory px-4 py-3 text-xs text-aubergine outline-none"
              >

                <option value="ALL">
                  All types
                </option>

                <option value="STANDARD">
                  Standard
                </option>

                <option value="DELUXE">
                  Deluxe
                </option>

                <option value="SUITE">
                  Suite
                </option>

                <option value="FAMILY">
                  Family
                </option>

              </select>

            </div>


            <div className="flex items-center gap-3">

              <span className="text-[9px] tracking-[0.16em] text-muted">
                STATUS
              </span>


              <select
                value={availabilityFilter}
                onChange={(e) =>
                  setAvailabilityFilter(e.target.value)
                }
                className="border border-border bg-ivory px-4 py-3 text-xs text-aubergine outline-none"
              >

                <option value="ALL">
                  All rooms
                </option>

                <option value="AVAILABLE">
                  Available
                </option>

                <option value="UNAVAILABLE">
                  Unavailable
                </option>

              </select>

            </div>

          </div>

        </section>


        <div className="mb-5 mt-8 flex items-center justify-between">

          <p className="text-[9px] tracking-[0.2em] text-muted">

            SHOWING{" "}
            {filteredRooms.length}
            {" "}OF{" "}
            {rooms.length}
            {" "}ROOMS

          </p>


          {(typeFilter !== "ALL" ||
            availabilityFilter !== "ALL") && (

            <button
              onClick={() => {
                setTypeFilter("ALL");
                setAvailabilityFilter("ALL");
              }}
              className="flex items-center gap-2 text-[9px] tracking-[0.15em] text-aubergine underline underline-offset-4"
            >

              CLEAR FILTERS

              <X size={13} />

            </button>

          )}

        </div>


        {loading && (

          <div className="admin-loading">
            Loading rooms...
          </div>

        )}


        {!loading &&
          filteredRooms.length === 0 && (

            <div className="admin-empty">

              <Search
                size={30}
                className="mx-auto text-muted"
                strokeWidth={1.2}
              />


              <h3 className="mt-5 font-serif text-3xl">
                No rooms found.
              </h3>


              <p className="mt-3 text-sm text-muted">
                Try changing your search or filters.
              </p>

            </div>

          )}


        {!loading &&
          filteredRooms.length > 0 && (

            <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

              {filteredRooms.map((room) => (

                <article
                  key={room.roomId}
                  className="group overflow-hidden border border-border bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >


                  <div className="relative h-56 overflow-hidden bg-aubergine">

                    {room.imageUrls?.length > 0 ? (

                      <img
                        src={room.imageUrls[0]}
                        alt={`Room ${room.roomNumber}`}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.style.display =
                            "none";
                        }}
                      />

                    ) : (

                      <div className="flex h-full items-center justify-center">

                        <div className="text-center text-white/60">

                          <div className="mx-auto flex h-14 w-14 items-center justify-center border border-champagne/60">

                            <span className="font-serif text-2xl text-champagne">
                              H
                            </span>

                          </div>


                          <p className="mt-4 text-[9px] tracking-[0.25em]">
                            HAVEN
                          </p>

                        </div>

                      </div>

                    )}


                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />


                    <div className="absolute bottom-5 left-5">

                      <span className="text-[9px] tracking-[0.25em] text-champagne">
                        ROOM
                      </span>


                      <h3 className="mt-1 font-serif text-3xl text-white">
                        {room.roomNumber}
                      </h3>

                    </div>


                    <div className="absolute right-5 top-5">

                      <span
                        className={`inline-flex items-center gap-2 px-3 py-2 text-[8px] tracking-[0.15em] ${
                          room.available
                            ? "bg-white text-green-700"
                            : "bg-black/60 text-white"
                        }`}
                      >

                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            room.available
                              ? "bg-green-600"
                              : "bg-red-400"
                          }`}
                        />

                        {room.available
                          ? "AVAILABLE"
                          : "UNAVAILABLE"}

                      </span>

                    </div>

                  </div>


                  <div className="p-7">


                    <div className="flex items-center justify-between">

                      <p className="text-[9px] tracking-[0.22em] text-champagne">

                        {roomTypeLabel(
                          room.roomType
                        )}

                      </p>


                      <p className="font-serif text-xl text-aubergine">

                        {formatPrice(
                          room.pricePerNight
                        )}

                        <span className="ml-1 font-sans text-[9px] text-muted">
                          / NIGHT
                        </span>

                      </p>

                    </div>


                    <p className="mt-5 min-h-[48px] text-sm leading-6 text-muted">

                      {room.description ||
                        "A thoughtfully designed Haven room created for a comfortable and memorable stay."}

                    </p>


                    <div className="mt-6 grid grid-cols-3 border-y border-border py-5">


                      <div>

                        <p className="text-[8px] tracking-[0.15em] text-muted">
                          CAPACITY
                        </p>


                        <div className="mt-2 flex items-center gap-2">

                          <Users size={14} />

                          <span className="text-sm">
                            {room.capacity}
                          </span>

                        </div>

                      </div>


                      <div>

                        <p className="text-[8px] tracking-[0.15em] text-muted">
                          SIZE
                        </p>


                        <p className="mt-2 text-sm">
                          {room.roomSize || "—"}
                        </p>

                      </div>


                      <div>

                        <p className="text-[8px] tracking-[0.15em] text-muted">
                          FLOOR
                        </p>


                        <p className="mt-2 text-sm">
                          {room.floor}
                        </p>

                      </div>

                    </div>


                    {room.amenities?.length > 0 && (

                      <div className="mt-5 flex flex-wrap gap-2">

                        {room.amenities
                          .slice(0, 3)
                          .map((amenity) => (

                            <span
                              key={amenity}
                              className="border border-border px-3 py-1.5 text-[8px] tracking-[0.1em] text-muted"
                            >

                              {amenity}

                            </span>

                          ))}

                      </div>

                    )}


                    <div className="mt-7 flex gap-3">


                      <button
                        onClick={() =>
                          openEditModal(room)
                        }
                        className="flex flex-1 items-center justify-center gap-2 border border-aubergine px-4 py-3 text-[9px] tracking-[0.16em] text-aubergine transition hover:bg-aubergine hover:text-champagne"
                      >

                        <Edit3 size={14} />
                        EDIT

                      </button>


                      <button
                        disabled={
                          deletingId ===
                          room.roomId
                        }
                        onClick={() =>
                          handleDelete(room)
                        }
                        className="flex items-center justify-center border border-red-200 px-4 py-3 text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                      >

                        {deletingId === room.roomId ? (

                          <span className="text-xs">
                            ...
                          </span>

                        ) : (

                          <Trash2 size={15} />

                        )}

                      </button>

                    </div>

                  </div>

                </article>

              ))}

            </section>

          )}


        <footer className="mt-24 border-t border-border pt-8 pb-10">

          <div className="flex flex-col justify-between gap-4 sm:flex-row">

            <p className="text-[9px] tracking-[0.3em] text-muted">
              HAVEN HOTEL & RESIDENCES
            </p>


            <p className="text-xs text-muted">
              Room Management
            </p>

          </div>

        </footer>

      </main>


      {showModal && (

        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 px-4 py-8">

          <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto bg-ivory shadow-2xl">


            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-ivory px-8 py-6">

              <div>

                <p className="text-[9px] tracking-[0.25em] text-champagne">

                  {editingRoom
                    ? "ROOM MANAGEMENT"
                    : "NEW ROOM"}

                </p>


                <h2 className="mt-2 font-serif text-3xl text-aubergine">

                  {editingRoom
                    ? `Edit ${editingRoom.roomNumber}`
                    : "Add a new room"}

                </h2>

              </div>


              <button
                type="button"
                onClick={closeModal}
                className="flex h-10 w-10 items-center justify-center border border-border text-muted transition hover:border-aubergine hover:text-aubergine"
              >

                <X size={18} />

              </button>

            </div>


            <form
              onSubmit={handleSubmit}
              className="p-8"
            >

              {error && (

                <div className="mb-7 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">

                  {error}

                </div>

              )}


              <div className="grid gap-7 md:grid-cols-2">


                <div>

                  <label className="text-[9px] font-medium tracking-[0.18em] text-muted">
                    ROOM NUMBER *
                  </label>


                  <input
                    type="text"
                    name="roomNumber"
                    value={formData.roomNumber}
                    onChange={handleChange}
                    required
                    placeholder="A101"
                    className="mt-3 w-full border-0 border-b border-border bg-transparent px-0 py-3 text-sm text-ink outline-none transition focus:border-aubergine"
                  />

                </div>


                <div>

                  <label className="text-[9px] font-medium tracking-[0.18em] text-muted">
                    ROOM TYPE *
                  </label>


                  <select
                    name="roomType"
                    value={formData.roomType}
                    onChange={handleChange}
                    required
                    className="mt-3 w-full border-0 border-b border-border bg-transparent px-0 py-3 text-sm text-ink outline-none focus:border-aubergine"
                  >

                    <option value="STANDARD">
                      Standard
                    </option>

                    <option value="DELUXE">
                      Deluxe
                    </option>

                    <option value="SUITE">
                      Suite
                    </option>

                    <option value="FAMILY">
                      Family
                    </option>

                  </select>

                </div>


                <div>

                  <label className="text-[9px] font-medium tracking-[0.18em] text-muted">
                    PRICE PER NIGHT *
                  </label>


                  <input
                    type="number"
                    name="pricePerNight"
                    value={formData.pricePerNight}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    placeholder="2500"
                    className="mt-3 w-full border-0 border-b border-border bg-transparent px-0 py-3 text-sm text-ink outline-none focus:border-aubergine"
                  />

                </div>


                <div>

                  <label className="text-[9px] font-medium tracking-[0.18em] text-muted">
                    ROOM SIZE
                  </label>


                  <input
                    type="text"
                    name="roomSize"
                    value={formData.roomSize}
                    onChange={handleChange}
                    placeholder="350 sq.ft"
                    className="mt-3 w-full border-0 border-b border-border bg-transparent px-0 py-3 text-sm text-ink outline-none focus:border-aubergine"
                  />

                </div>


                <div>

                  <label className="text-[9px] font-medium tracking-[0.18em] text-muted">
                    GUEST CAPACITY *
                  </label>


                  <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    required
                    min="1"
                    placeholder="2"
                    className="mt-3 w-full border-0 border-b border-border bg-transparent px-0 py-3 text-sm text-ink outline-none focus:border-aubergine"
                  />

                </div>


                <div>

                  <label className="text-[9px] font-medium tracking-[0.18em] text-muted">
                    FLOOR *
                  </label>


                  <input
                    type="number"
                    name="floor"
                    value={formData.floor}
                    onChange={handleChange}
                    required
                    min="0"
                    placeholder="1"
                    className="mt-3 w-full border-0 border-b border-border bg-transparent px-0 py-3 text-sm text-ink outline-none focus:border-aubergine"
                  />

                </div>

              </div>


              <div className="mt-7">

                <label className="text-[9px] font-medium tracking-[0.18em] text-muted">
                  DESCRIPTION
                </label>


                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Describe the room..."
                  className="mt-3 w-full resize-none border border-border bg-white px-4 py-4 text-sm text-ink outline-none transition focus:border-aubergine"
                />

              </div>


              <label className="mt-7 flex cursor-pointer items-center gap-4 border border-border bg-white p-5">

                <input
                  type="checkbox"
                  name="available"
                  checked={formData.available}
                  onChange={handleChange}
                  className="h-4 w-4 accent-[#43243f]"
                />


                <div>

                  <p className="text-[10px] font-medium tracking-[0.15em] text-aubergine">
                    ROOM AVAILABLE
                  </p>


                  <p className="mt-1 text-xs text-muted">
                    Guests can book this room
                  </p>

                </div>

              </label>


              <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="border border-border px-7 py-4 text-[10px] tracking-[0.18em] text-muted transition hover:border-aubergine hover:text-aubergine disabled:opacity-50"
                >

                  CANCEL

                </button>


                <button
                  type="submit"
                  disabled={saving}
                  className="group flex items-center justify-center gap-3 bg-aubergine px-7 py-4 text-[10px] tracking-[0.18em] text-champagne transition hover:bg-[#3b2541] disabled:cursor-not-allowed disabled:opacity-50"
                >

                  {saving
                    ? "SAVING..."
                    : editingRoom
                    ? "UPDATE ROOM"
                    : "ADD ROOM"}


                  {!saving && (

                    <ArrowUpRight
                      size={15}
                      className="transition group-hover:-translate-y-1 group-hover:translate-x-1"
                    />

                  )}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}


export default AdminRooms;