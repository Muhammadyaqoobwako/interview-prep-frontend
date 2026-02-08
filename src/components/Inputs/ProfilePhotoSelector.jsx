import React, { useRef, useState, useEffect } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);

      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      if (setPreview) {
        setPreview(objectUrl);
      }
    }
  };

  const handleRemoveImage = () => {
    setImage(null);

    if (setPreview) {
      setPreview(null);
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex flex-col items-center">
      {/* Hidden Input */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={inputRef}
        className="hidden"
      />

      {/* If no image selected */}
      {!image && !(preview || previewUrl) && (
        <div className="w-24 h-24 flex items-center justify-center bg-slate-100 rounded-full relative cursor-pointer border border-slate-300 shadow-sm">
          <LuUser className="text-4xl text-slate-500" />
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-teal-700 text-white rounded-full absolute -bottom-1 -right-1 shadow-sm hover:bg-teal-800 transition-colors"
            onClick={onChooseFile}
          >
            <LuUpload size={18} />
          </button>
        </div>
      )}

      {/* If image selected */}
      {(image || preview || previewUrl) && (
        <div className="relative">
          <img
            src={preview || previewUrl}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border border-slate-300 shadow-sm"
          />
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-rose-600 hover:bg-rose-700 text-white rounded-full absolute -bottom-1 -right-1 shadow-sm transition-colors"
            onClick={handleRemoveImage}
          >
            <LuTrash size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
