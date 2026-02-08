import React from "react";

const Modal = ({ children, isOpen, onClose, title, hideHeader }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-start w-full h-full bg-black/40 px-4 py-6">
      {/* Modal Content */}
      <div className="relative flex flex-col bg-white shadow-xl rounded-2xl overflow-hidden w-full max-w-md max-h-[90vh] border border-slate-200 animate-in fade-in duration-200">
        {/* Modal Header */}
        {!hideHeader && (
          <div className="flex items-center justify-between p-4 border-b border-slate-200">
            <h3 className="text-lg md:text-xl font-semibold text-slate-900">
              {title}
            </h3>
            <button
              type="button"
              className="text-slate-400 bg-transparent hover:bg-slate-100 hover:text-slate-700 rounded-full text-sm w-8 h-8 flex justify-center items-center"
              onClick={onClose}
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1l12 12M13 1L1 13"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Modal Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
