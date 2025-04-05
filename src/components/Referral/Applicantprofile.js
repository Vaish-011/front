import { useState, useEffect } from "react";
import { Camera, Edit3 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import '../User/editprofile.css';
import axios from "axios";

export default function Applicantprofile() {
    const navigate = useNavigate();
    const { applicant_id } = useParams();
    const [profile, setProfile] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const BASE_URL = "http://localhost:5000";

    useEffect(() => {
        if (!applicant_id) return;

        const fetchProfileData = async () => {
            try {
                const profileRes = await axios.get(`${BASE_URL}/api/user/get_profile/${applicant_id}`);
                const licensesRes = await axios.get(`${BASE_URL}/api/user/get_licenses/${applicant_id}`);
                const skillsRes = await axios.get(`${BASE_URL}/api/user/get_skills/${applicant_id}`);
                const interestRes = await axios.get(`${BASE_URL}/api/user/get_interests/${applicant_id}`);
                const EducationRes = await axios.get(`${BASE_URL}/api/user/get_education/${applicant_id}`);
                const ExperienceRes = await axios.get(`${BASE_URL}/api/user/get_experiences/${applicant_id}`);

                setProfile({
                    ...profileRes.data,
                    licenses: licensesRes.data,
                    skills: skillsRes.data,
                    interests: interestRes.data,
                    education: EducationRes.data,
                    experiences: ExperienceRes.data,
                });
                setLoading(false);
            } catch (err) {
                console.error("Error fetching profile data:", err);
                setError(err);
                setLoading(false);
            }
        };

        const fetchProfilePhoto = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/user/get-profile-photo/${applicant_id}`);
                if (response.data.profile_photo) {
                    setProfileImage(`${BASE_URL}/${response.data.profile_photo}`);
                }
            } catch (err) {
                console.error("Error fetching profile photo:", err);
            }
        };

        fetchProfileData();
        fetchProfilePhoto();
    }, [applicant_id]);

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (!file || !applicant_id) return;

        const formData = new FormData();
        formData.append("profile_photo", file);

        try {
            const response = await axios.put(`${BASE_URL}/api/user/update-profile-photo/${applicant_id}`, formData);

            if (response.status === 200) {
                setProfile((prev) => ({ ...prev, profileImage: response.data.profile_photo }));
                setProfileImage(`${BASE_URL}/${response.data.profile_photo}`);
            } else {
                console.error("Failed to update profile image");
            }
        } catch (err) {
            console.error("Error updating profile image:", err);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading profile.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                    <div className="relative">
                        <img src="https://via.placeholder.com/850x250" alt="Cover" className="w-full h-36 object-cover" />
                        <div className="relative flex flex-col items-center -mt-12">
                            <img
                                src={profileImage || "https://via.placeholder.com/150"}
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
                        <h2 className="text-2xl text-white font-bold ">{profile?.name || "Loading..."}</h2>
                        <p className="text-blue-400">{profile?.summary || ""}</p>
                        <p className="text-sm text-gray-400">{profile?.email || ""}</p>
                        <p className="text-sm text-gray-400">{profile?.phone || ""}</p>
                        <button onClick={() => navigate('/leaderboard')} className="mt-4 bg-green-600 px-4 py-2 rounded-lg hover:bg-green-500 transition flex items-center mx-auto">🏆 Leaderboard</button>
                        <button onClick={() => navigate('/my_connections')} className="mt-4 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500 transition flex items-center mx-auto">My Connections</button>
                        <button onClick={() => navigate('/editprofile')} className="mt-4 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500 transition flex items-center mx-auto"><Edit3 className="w-5 h-5 mr-2" /> Edit Profile</button>
                    </div>
                </div>
                <div className="md:col-span-2 space-y-6 scrollable-section">
                    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                        <h3 className="text-xl font-semibold text-blue-400 mb-3">Activity</h3>
                    </div>
                    {profile?.licenses && (
                        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-semibold text-blue-400 mb-3">Licenses & Certifications</h3>
                            {profile.licenses?.length > 0 ? (
                                <ul className="text-gray-300">
                                    {profile.licenses.map((license, index) => (
                                        <li key={index} className="mb-1">{license?.title} - {license?.issuing_organization}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500">No licenses available.</p>
                            )}
                        </div>
                    )}
                    {profile?.education && (
                        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-semibold text-blue-400 mb-3">Education</h3>
                            {profile.education?.length > 0 ? (
                                <ul className="text-gray-300">
                                    {profile.education.map((educations, index) => (
                                        <li key={index} className="mb-1">{educations?.institution} - {educations?.degree}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500">No Education available.</p>
                            )}
                        </div>
                    )}
                    {profile?.experiences && (
                        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-semibold text-blue-400 mb-3">Experience</h3>
                            {profile.experiences?.length > 0 ? (
                                <ul className="text-gray-300">
                                    {profile.experiences.map((experience, index) => (
                                        <li key={index} className="mb-1">{experience?.job_title} - {experience?.company}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500">No Experience available.</p>
                            )}
                        </div>
                    )}
                    {profile?.skills && (
                        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-semibold text-blue-400 mb-3">Skills</h3>
                            {profile.skills?.length > 0 ? (
                                <ul className="text-gray-300">
                                    {profile.skills.map((skill, index) => (
                                        <li key={index} className="mb-1">{skill?.skill_name}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500">No skills available.</p>
                            )}
                        </div>
                    )}
                    {profile?.interests && (
                        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-semibold text-blue-400 mb-3">Interests</h3>
                            {profile.interests?.length > 0 ? (
                                <ul className="text-gray-300">
                                    {profile.interests.map((interest, index) => (
                                        <li key={index} className="mb-1">{interest?.interest_name}</li>
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