import React, { useCallback, useEffect } from "react";
import { LuX } from "react-icons/lu";

const Drawer = ({
  isOpen = false,
  onClose,
  onClodse,
  title,
  children,
  width = "420px",
  position = "right",
  className = "",
}) => {
  const handleClose = useCallback(() => {
    const closeFn = onClose || onClodse;
    if (closeFn) closeFn();
  }, [onClose, onClodse]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") handleClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleClose]);

  const sideClasses =
    position === "left"
      ? "left-0 -translate-x-full"
      : "right-0 translate-x-full";

  const sideOpenClasses =
    position === "left" ? "translate-x-0" : "translate-x-0";

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-200 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClose}
        aria-hidden="true"
      />

      <aside
        className={`fixed top-0 z-50 h-full bg-white shadow-xl transition-transform duration-300 ease-out ${
          isOpen ? sideOpenClasses : sideClasses
        } ${className}`}
        style={{
          width:
            typeof window !== "undefined" && window.innerWidth < 640
              ? "100%"
              : width,
        }}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-4 sm:px-6 py-4">
          <h3 className="text-base sm:text-lg font-semibold text-slate-900">
            {title || ""}
          </h3>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-full p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            aria-label="Close"
          >
            <LuX className="text-xl" />
          </button>
        </div>

        <div className="h-[calc(100%-57px)] overflow-y-auto p-4 sm:p-6">
          {children}
        </div>
      </aside>
    </>
  );
};

export default Drawer;
