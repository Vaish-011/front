import { useState, useEffect } from "react";
import { Camera, Edit3 } from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const BASE_URL = "http://localhost:5000"; 

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const userId = user?.id;

  useEffect(() => {
    if (!userId) return;

    const fetchProfileData = async () => {
      try {
        const profileRes = await fetch(`${BASE_URL}/api/user/get_profile/${userId}`);
        const profileData = await profileRes.json();

        const licensesRes = await fetch(`${BASE_URL}/api/user/get_licenses/${userId}`);
        const licensesData = await licensesRes.json();

        const skillsRes = await fetch(`${BASE_URL}/api/user/get_skills/${userId}`);
        const skillsData = await skillsRes.json();

        const interestsRes = await fetch(`${BASE_URL}/api/user/get_interests/${userId}`);
        const interestsData = await interestsRes.json();

        setProfile({
          ...profileData,
          licenses: licensesData,
          skills: skillsData,
          interests: interestsData,
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [userId]);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file || !userId) return;

    const formData = new FormData();
    formData.append("profile_photo", file);
    formData.append("user_id", userId);

    try {
      const response = await fetch(`${BASE_URL}/api/user/update_profile_photo`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setProfile((prev) => ({ ...prev, profileImage: data.profile_photo }));
      } else {
        console.error("Failed to update profile image");
      }
    } catch (error) {
      console.error("Error updating profile image:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Profile Card */}
        <div className="md:col-span-1 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="relative">
            <img src="https://via.placeholder.com/850x250" alt="Cover" className="w-full h-36 object-cover" />
            <div className="relative flex flex-col items-center -mt-12">
              <img
                src={profile?.profileImage ? `${BASE_URL}${profile.profileImage}` : "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-gray-900"
              />

              <label className="mt-1 flex items-center bg-blue-600 px-3 py-2 rounded-lg cursor-pointer hover:bg-blue-500 transition">
                <Camera className="text-white w-5 h-5" />
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>
            </div>
          </div>
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold">{profile?.name || "Loading..."}</h2>
            <p className="text-blue-400">{profile?.summary || ""}</p>
            <p className="text-sm text-gray-400">{profile?.email || ""}</p>
            <p className="text-sm text-gray-400">{profile?.phone || ""}</p>
            <button
              onClick={() => navigate('/editprofile')}
              className="mt-4 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500 transition flex items-center mx-auto"
            >
              <Edit3 className="w-5 h-5 mr-2" /> Edit Profile
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-2 space-y-6 overflow-y-auto max-h-[700px]">

          {/* Activity Section */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-blue-400 mb-3">Activity</h3>
          </div>

          {/* Licenses & Certifications */}
          {profile?.licenses && (
            <div className="bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-blue-400 mb-3">Licenses & Certifications</h3>
              {profile.licenses.length > 0 ? (
                <ul className="text-gray-300">
                  {profile.licenses.map((license, index) => (
                    <li key={index} className="mb-1">{license.title} - {license.issuing_organization}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No licenses available.</p>
              )}
            </div>
          )}

          {/* Skills */}
          {profile?.skills && (
            <div className="bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-blue-400 mb-3">Skills</h3>
              {profile.skills.length > 0 ? (
                <ul className="text-gray-300">
                  {profile.skills.map((skill, index) => (
                    <li key={index} className="mb-1">{skill.skill_name}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No skills available.</p>
              )}
            </div>
          )}

          {/* Interests */}
          {profile?.interests && (
            <div className="bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-blue-400 mb-3">Interests</h3>
              {profile.interests.length > 0 ? (
                <ul className="text-gray-300">
                  {profile.interests.map((interest, index) => (
                    <li key={index} className="mb-1">{interest.interest_name}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No interests available.</p>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
