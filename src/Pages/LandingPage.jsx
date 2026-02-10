import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { APP_FEATURES } from "../utils/data";
import { LuSparkles } from "react-icons/lu";
import HERO_IMG from "../assets/hero_img.png";
import Modal from "../components/Modal";
import Login from "../Pages/Auth/Login";
import Signup from "../Pages/Auth/SignUp";
import ProfileInfoCard from "../components/Cards/profileInfoCard";
import { useContext } from "react";
import { UserContext } from "../Context/userContext";

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("Login");

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <>
      {/* Hero Section */}
      <div className="w-full min-h-screen bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-[100px] md:pb-[200px] relative z-10 mb-20 md:mb-56">
          {/* Header */}
          <header className="flex justify-between items-center mb-12 sm:mb-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-700 flex items-center justify-center shadow-sm">
                <LuSparkles className="text-white text-xl" />
              </div>
              <div className="text-xl font-bold text-slate-900">
                Interview Prep AI
              </div>
            </div>
            {user ? (
              <ProfileInfoCard />
            ) : (
              <button
                className="bg-teal-700 text-sm font-semibold text-white px-6 py-2.5 rounded-lg hover:bg-teal-800 transition-colors"
                onClick={() => setOpenAuthModal(true)}
              >
                Login / Signup
              </button>
            )}
          </header>

          {/* Hero Content */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 pr-4 mb-8 md:mb-0">
              <div className="flex items-center justify-start mb-4">
                <div className="flex items-center gap-2 text-[13px] text-teal-700 font-semibold bg-teal-50 px-4 py-2 rounded-full border border-teal-200">
                  <LuSparkles className="text-teal-700" /> AI Powered Platform
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl text-slate-900 font-bold mb-6 leading-tight">
                Ace Interviews with <br className="hidden sm:block" />
                <span className="text-teal-700 font-bold">AI-Powered</span>{" "}
                Precision
              </h1>
            </div>

            <div className="w-full md:w-1/2">
              <p className="text-sm sm:text-base md:text-lg text-slate-700 mr-0 md:mr-20 mb-8 leading-relaxed">
                Get role-specific questions, expand answers when you need them,
                dive deeper into concepts, and organize everything your way.
                From preparation to mastery — your ultimate interview toolkit
                powered by advanced AI.
              </p>

              <button
                className="bg-teal-700 text-base font-semibold text-white px-7 py-3 rounded-lg hover:bg-teal-800 transition-colors"
                onClick={handleCTA}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="w-full min-h-full relative z-10">
        <section className="flex items-center justify-center -mt-10 md:-mt-36 px-4">
          <img
            src={HERO_IMG}
            alt="Hero"
            className="w-full max-w-[88vw] rounded-lg"
          />
        </section>
      </div>

      {/* Features Section */}
      <div className="w-full min-h-full bg-slate-50 mt-10 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 relative z-10">
          <section className="mt-5">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                Features That Make You{" "}
                <span className="text-teal-700">Shine</span>
              </h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                Everything you need to master your interview preparation journey
              </p>
            </div>

            <div className="flex flex-col gap-8">
              {/* First 3 Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                {APP_FEATURES.slice(0, 3).map((feature) => (
                  <div
                    key={feature.id}
                    className="card p-7 transition-all duration-300 hover:shadow-md"
                  >
                    <div className="w-12 h-12 rounded-xl bg-teal-700 flex items-center justify-center mb-4">
                      <LuSparkles className="text-white text-xl" />
                    </div>
                    <h3 className="text-lg font-bold mb-3 text-slate-900">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Last 2 Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {APP_FEATURES.slice(3).map((feature) => (
                  <div
                    key={feature.id}
                    className="card p-7 transition-all duration-300 hover:shadow-md"
                  >
                    <div className="w-12 h-12 rounded-xl bg-teal-700 flex items-center justify-center mb-4">
                      <LuSparkles className="text-white text-xl" />
                    </div>
                    <h3 className="text-lg font-bold mb-3 text-slate-900">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <div className="text-sm bg-slate-900 text-white text-center py-8 mt-10">
        <div className="container mx-auto">
          <p className="text-base font-medium mb-2">Made with ❤️ by Yaqoob</p>
          <p className="text-slate-400 text-xs">
            © 2026 Interview Prep AI. All rights reserved.
          </p>
        </div>
      </div>

      {/* Auth Modal */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("Login");
        }}
        hideHeader
      >
        <div>
          {currentPage === "Login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "Signup" && (
            <Signup setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Modal>
    </>
  );
};

export default LandingPage;
