"use client";

import { useState, useEffect } from "react";
import { getUsers, logoutUser } from "@/services/auth.api";
import { useRouter } from "next/navigation";

const UsersPage = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [hasNext, setHasNext] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const fetchUsers = async (pageNumber) => {
    try {
      setLoading(true);
      const response = await getUsers({ page: pageNumber, limit });
      const usersList = response.data?.data?.users || [];
      console.log(response);
      setUsers(usersList);
      setHasNext(usersList.length === limit);
      //   console.log(response);
      //   console.log("Users fetched from API: ", response.data.users);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch users");
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      router.push("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50 py-6 md:py-12 px-3 md:px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-4 md:p-8 mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
            <div className="flex items-center space-x-3 md:space-x-4 min-w-0">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-linear-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shrink-0">
                <svg
                  className="w-6 h-6 md:w-8 md:h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div className="min-w-0">
                <h1 className="text-xl md:text-3xl font-bold text-gray-900 truncate">
                  Welcome to the Community!
                </h1>
                <p className="text-sm md:text-base text-gray-600 mt-1">
                  Connect with amazing people
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center space-x-1 md:space-x-2 bg-linear-to-r from-red-500 to-red-600 text-white px-3 md:px-6 py-2 md:py-3 rounded-lg font-medium text-sm md:text-base hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl whitespace-nowrap"
            >
              <svg
                className="w-4 h-4 md:w-5 md:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-8 md:p-12">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-4 md:p-8">
            <div className="bg-red-50 border border-red-200 text-red-700 px-3 md:px-4 py-2 md:py-3 rounded-lg flex items-start md:items-center gap-2 text-sm md:text-base">
              <svg
                className="w-5 h-5 shrink-0 mt-0.5 md:mt-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Users List */}
        {!loading && !error && users.length > 0 && (
          <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-4 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center">
              <svg
                className="w-5 h-5 md:w-6 md:h-6 mr-2 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              Community Members
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {users.map((user, index) => (
                <div
                  key={index}
                  className="bg-linear-to-br from-gray-50 to-white rounded-lg p-3 md:p-4 border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all duration-200"
                >
                  <div className="flex items-center space-x-2 md:space-x-3 min-w-0">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-linear-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm md:text-lg flex-shrink-0">
                      {user.username?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm md:text-base font-semibold text-gray-900 truncate">
                        @{user.username}
                      </p>
                      <p className="text-xs md:text-sm text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-6 md:mt-8 flex items-center justify-center gap-2 md:gap-4 flex-wrap">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 md:px-4 py-2 rounded-lg border border-gray-300 text-sm md:text-base text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <span className="text-sm md:text-base text-gray-600 font-medium">
                Page {page}
              </span>
              <button
                type="button"
                onClick={() => setPage((p) => p + 1)}
                disabled={!hasNext}
                className="px-3 md:px-4 py-2 rounded-lg border border-gray-300 text-sm md:text-base text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && users.length === 0 && (
          <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-8 md:p-12 text-center">
            <svg
              className="mx-auto h-10 md:h-12 w-10 md:w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h3 className="mt-2 text-base md:text-lg font-medium text-gray-900">
              No users found
            </h3>
            <p className="mt-1 text-xs md:text-sm text-gray-500">
              Be the first to join the community!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersPage;
