import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  ArrowUpRight,
  CalendarDays,
  Clock3,
  LogOut,
  Menu,
  Search,
  Trash2,
  Users,
  X,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

import {
  getAllUsers,
  deleteUser,
} from "../../api/userApi";


function AdminUsers() {

  const navigate = useNavigate();

  const { user, logout } = useAuth();


  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [roleFilter, setRoleFilter] = useState("ALL");

  const [deletingId, setDeletingId] = useState(null);

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);


  const loadUsers = async () => {

    try {

      setLoading(true);

      setError("");

      const data = await getAllUsers();

      setUsers(data || []);

    } catch (err) {

      console.error("USER LOAD ERROR:", err);

      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Unable to load users."
      );

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {

    loadUsers();

  }, []);


  const statistics = useMemo(() => {

    const total = users.length;

    const customers = users.filter(
      (item) => item.role === "CUSTOMER"
    ).length;

    const admins = users.filter(
      (item) => item.role === "ADMIN"
    ).length;

    return {
      total,
      customers,
      admins,
    };

  }, [users]);


  const filteredUsers = useMemo(() => {

    const searchValue =
      search.trim().toLowerCase();


    return users.filter((item) => {

      const matchesSearch =
        !searchValue ||

        String(item.userName || "")
          .toLowerCase()
          .includes(searchValue) ||

        String(item.email || "")
          .toLowerCase()
          .includes(searchValue) ||

        String(item.phoneNumber || "")
          .toLowerCase()
          .includes(searchValue);


      const matchesRole =
        roleFilter === "ALL" ||
        item.role === roleFilter;


      return (
        matchesSearch &&
        matchesRole
      );

    });

  }, [
    users,
    search,
    roleFilter,
  ]);


  const handleDelete = async (selectedUser) => {

    if (
      Number(selectedUser.id) ===
      Number(user?.userId)
    ) {

      setError(
        "You cannot delete your own admin account."
      );

      return;
    }


    const confirmed =
      window.confirm(
        `Delete ${selectedUser.userName}?`
      );


    if (!confirmed) {
      return;
    }


    try {

      setDeletingId(selectedUser.id);

      setError("");


      await deleteUser(
        selectedUser.id
      );


      setUsers((currentUsers) =>
        currentUsers.filter(
          (item) =>
            item.id !== selectedUser.id
        )
      );

    } catch (err) {

      console.error(
        "USER DELETE ERROR:",
        err
      );

      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Unable to delete user."
      );

    } finally {

      setDeletingId(null);

    }

  };


  const handleLogout = () => {

    logout();

    navigate("/login");

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
            className="admin-nav-item"
          >

            <CalendarDays size={18} />

            <span>
              Rooms
            </span>

          </Link>


          <Link
            to="/admin/users"
            className="admin-nav-item active"
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
              HAVEN / USERS
            </span>


            <h1>
              User
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
              GUEST DIRECTORY
            </span>


            <h2>

              Know your

              <br />

              <em>
                guests better.
              </em>

            </h2>

          </div>


          <div>

            <p className="max-w-md">

              View and manage everyone
              registered with Haven from
              one central dashboard.

            </p>

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


        <section className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-3">

          <button
            onClick={() =>
              setRoleFilter("ALL")
            }
            className="bg-ivory p-7 text-left transition hover:bg-white"
          >

            <span className="text-[9px] tracking-[0.18em] text-muted">
              TOTAL USERS
            </span>


            <strong className="mt-3 block font-serif text-4xl text-aubergine">
              {statistics.total}
            </strong>

          </button>


          <button
            onClick={() =>
              setRoleFilter("CUSTOMER")
            }
            className="bg-ivory p-7 text-left transition hover:bg-white"
          >

            <span className="text-[9px] tracking-[0.18em] text-muted">
              CUSTOMERS
            </span>


            <strong className="mt-3 block font-serif text-4xl text-aubergine">
              {statistics.customers}
            </strong>

          </button>


          <button
            onClick={() =>
              setRoleFilter("ADMIN")
            }
            className="bg-ivory p-7 text-left transition hover:bg-white"
          >

            <span className="text-[9px] tracking-[0.18em] text-muted">
              ADMINISTRATORS
            </span>


            <strong className="mt-3 block font-serif text-4xl text-aubergine">
              {statistics.admins}
            </strong>

          </button>

        </section>


        <section className="mt-8 flex flex-col gap-4 border border-border bg-white p-5 lg:flex-row lg:items-center lg:justify-between">

          <div className="relative w-full lg:max-w-lg">

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
              placeholder="Search by name, email or phone..."
              className="w-full border-0 border-b border-border bg-transparent py-3 pl-8 pr-3 text-sm text-ink outline-none transition focus:border-aubergine"
            />

          </div>


          <div className="flex items-center gap-3">

            <span className="text-[9px] tracking-[0.16em] text-muted">
              ROLE
            </span>


            <select
              value={roleFilter}
              onChange={(e) =>
                setRoleFilter(e.target.value)
              }
              className="border border-border bg-ivory px-5 py-3 text-xs text-aubergine outline-none"
            >

              <option value="ALL">
                All users
              </option>

              <option value="CUSTOMER">
                Customers
              </option>

              <option value="ADMIN">
                Administrators
              </option>

            </select>

          </div>

        </section>


        <div className="mb-5 mt-8 flex items-center justify-between">

          <p className="text-[9px] tracking-[0.2em] text-muted">

            SHOWING{" "}
            {filteredUsers.length}
            {" "}OF{" "}
            {users.length}
            {" "}USERS

          </p>


          {(
            roleFilter !== "ALL" ||
            search
          ) && (

            <button
              onClick={() => {

                setRoleFilter("ALL");

                setSearch("");

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

            Loading users...

          </div>

        )}


        {!loading &&
          filteredUsers.length === 0 && (

            <div className="admin-empty">

              <Users
                size={34}
                className="mx-auto text-muted"
                strokeWidth={1.2}
              />


              <h3 className="mt-5 font-serif text-3xl">

                No users found.

              </h3>


              <p className="mt-3 text-sm text-muted">

                Try changing your search or role filter.

              </p>

            </div>

          )}


        {!loading &&
          filteredUsers.length > 0 && (

            <div className="overflow-hidden border border-border bg-white">

              <div className="overflow-x-auto">

                <table className="w-full min-w-[850px]">

                  <thead>

                    <tr className="border-b border-border bg-ivory">

                      <th className="px-6 py-5 text-left text-[9px] tracking-[0.18em] text-muted">
                        USER
                      </th>

                      <th className="px-6 py-5 text-left text-[9px] tracking-[0.18em] text-muted">
                        EMAIL
                      </th>

                      <th className="px-6 py-5 text-left text-[9px] tracking-[0.18em] text-muted">
                        PHONE
                      </th>

                      <th className="px-6 py-5 text-left text-[9px] tracking-[0.18em] text-muted">
                        ROLE
                      </th>

                      <th className="px-6 py-5 text-right text-[9px] tracking-[0.18em] text-muted">
                        ACTION
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {filteredUsers.map(
                      (item, index) => (

                        <tr
                          key={item.id}
                          className={`border-b border-border transition hover:bg-ivory/60 ${
                            index ===
                            filteredUsers.length - 1
                              ? "border-b-0"
                              : ""
                          }`}
                        >

                          <td className="px-6 py-6">

                            <div className="flex items-center gap-4">

                              <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-aubergine font-serif text-lg text-champagne">

                                {item.userName
                                  ?.charAt(0)
                                  ?.toUpperCase() ||
                                  "U"}

                              </div>


                              <div>

                                <p className="font-medium text-aubergine">

                                  {item.userName}

                                </p>


                                <p className="mt-1 text-[10px] text-muted">

                                  USER #{item.id}

                                </p>

                              </div>

                            </div>

                          </td>


                          <td className="px-6 py-6">

                            <span className="text-sm text-ink">

                              {item.email}

                            </span>

                          </td>


                          <td className="px-6 py-6">

                            <span className="text-sm text-muted">

                              {item.phoneNumber ||
                                "Not provided"}

                            </span>

                          </td>


                          <td className="px-6 py-6">

                            {item.role ===
                            "ADMIN" ? (

                              <span className="inline-flex items-center gap-2 bg-aubergine px-3 py-2 text-[8px] tracking-[0.15em] text-champagne">

                                <span className="h-1.5 w-1.5 rounded-full bg-champagne" />

                                ADMIN

                              </span>

                            ) : (

                              <span className="inline-flex items-center gap-2 border border-green-200 bg-green-50 px-3 py-2 text-[8px] tracking-[0.15em] text-green-700">

                                <span className="h-1.5 w-1.5 rounded-full bg-green-600" />

                                CUSTOMER

                              </span>

                            )}

                          </td>


                          <td className="px-6 py-6 text-right">

                            {Number(item.id) ===
                            Number(user?.userId) ? (

                              <span className="text-[9px] tracking-[0.12em] text-muted">

                                CURRENT ACCOUNT

                              </span>

                            ) : (

                              <button
                                disabled={
                                  deletingId ===
                                  item.id
                                }
                                onClick={() =>
                                  handleDelete(item)
                                }
                                className="inline-flex items-center justify-center border border-red-200 px-4 py-3 text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                              >

                                {deletingId ===
                                item.id ? (

                                  <span className="text-xs">
                                    ...
                                  </span>

                                ) : (

                                  <Trash2
                                    size={15}
                                  />

                                )}

                              </button>

                            )}

                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>

            </div>

          )}


        <footer className="mt-24 border-t border-border pt-8 pb-10">

          <div className="flex flex-col justify-between gap-4 sm:flex-row">

            <p className="text-[9px] tracking-[0.3em] text-muted">

              HAVEN HOTEL & RESIDENCES

            </p>


            <p className="text-xs text-muted">

              User Management

            </p>

          </div>

        </footer>

      </main>

    </div>

  );

}


export default AdminUsers;