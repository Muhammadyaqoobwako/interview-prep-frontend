import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/userContext";
import { getInitials } from "../../utils/helper";
import Modal from "../Modal";
import Input from "../Inputs/Input";
import ProfilePhotoSelector from "../Inputs/ProfilePhotoSelector";
import uploadImage from "../../utils/uploadImages";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const ProfileInfoCard = () => {
  const { user, clearUser, updateUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const handleLogout = () => {
    localStorage.clear();
    if (typeof clearUser === "function") clearUser();
    navigate("/");
  };

  const profileImageUrl =
    user?.profileImageUrl || user?.profileImageurl || null;

  const handleOpenEdit = () => {
    setName(user?.name || "");
    setEmail(user?.email || "");
    setImageFile(null);
    setPreview(profileImageUrl || null);
    setError("");
    setIsEditOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditOpen(false);
    setImageFile(null);
    setError("");
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Name and email are required");
      return;
    }

    try {
      setIsSaving(true);
      setError("");

      let imageUrl = preview || profileImageUrl || null;
      if (!preview && !imageFile) {
        imageUrl = null;
      }
      if (imageFile) {
        const uploadResult = await uploadImage(imageFile);
        imageUrl = uploadResult?.imageUrl || uploadResult?.url || imageUrl;
      }

      const response = await axiosInstance.put(API_PATHS.AUTH.UPDATE_PROFILE, {
        name: name.trim(),
        email: email.trim(),
        profileImageurl: imageUrl,
      });

      updateUser(response.data);
      handleCloseEdit();
    } catch (err) {
      setError(
        err?.response?.data?.message || "Failed to update profile. Try again.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    user && (
      <>
        <div className="flex items-center">
          {profileImageUrl ? (
            <img
              src={profileImageUrl}
              alt={user?.name || "Profile"}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full mr-2 sm:mr-3 object-cover border border-slate-300 shadow-sm"
            />
          ) : (
            <div className="w-10 h-10 sm:w-11 sm:h-11 bg-slate-900 rounded-full mr-2 sm:mr-3 flex items-center justify-center text-xs sm:text-sm font-bold text-white border border-slate-300 shadow-sm">
              {getInitials(user?.name)}
            </div>
          )}

          <div>
            <div className="text-sm sm:text-[15px] text-slate-900 font-bold leading-tight">
              {user?.name || ""}
            </div>

            <div className="flex items-center gap-3">
              <button
                className="text-teal-700 text-xs sm:text-sm font-semibold cursor-pointer hover:text-teal-800 transition-colors"
                onClick={handleOpenEdit}
              >
                Edit profile
              </button>
              <button
                className="text-slate-500 text-xs sm:text-sm font-semibold cursor-pointer hover:text-rose-600 transition-colors"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <Modal
          isOpen={isEditOpen}
          onClose={handleCloseEdit}
          title="Edit Profile"
        >
          <form onSubmit={handleSaveProfile} className="space-y-5">
            <div className="flex justify-center pt-1 pb-2">
              <ProfilePhotoSelector
                image={imageFile}
                setImage={setImageFile}
                preview={preview}
                setPreview={setPreview}
              />
            </div>

            <Input
              value={name}
              onChange={({ target }) => setName(target.value)}
              label="Full Name"
              placeholder="Your name"
              type="text"
              name="profile-name"
            />

            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email"
              placeholder="name@company.com"
              type="email"
              name="profile-email"
            />

            {error && (
              <div className="bg-rose-50 text-rose-700 text-sm p-3 rounded-xl border border-rose-200 flex items-start gap-2">
                <span className="text-rose-500 text-lg flex-shrink-0">⚠</span>
                <p>{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-teal-700 text-white font-semibold py-3 transition-all hover:bg-teal-800 disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save changes"}
            </button>
          </form>
        </Modal>
      </>
    )
  );
};

export default ProfileInfoCard;
