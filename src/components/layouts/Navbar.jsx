import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context/userContext";
import ProfileInfoCard from "../Cards/profileInfoCard";
import { LuSparkles } from "react-icons/lu";

const Navbar = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="h-20 bg-white border-b border-slate-200 shadow-sm py-2.5 px-4 sm:px-6 lg:px-8 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between gap-3 sm:gap-5">
        <Link to="/dashboard" className="group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-700 flex items-center justify-center shadow-sm transition-all group-hover:scale-110">
              <LuSparkles className="text-white text-xl" />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-2xl font-bold text-slate-900 leading-5">
              PrepAI
            </h2>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <ProfileInfoCard />
          ) : (
            <Link to="/" className="btn-primary">
              Login / Signup
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
