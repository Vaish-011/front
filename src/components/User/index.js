import { useState } from "react";
import { Camera, Edit3 } from "lucide-react";
import { FaPlus, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    firstName: "Muskan",
    lastName: "Tomar",
    additionalName: "",
    headline: "Software Developer | ML Enthusiast | Cloud Practitioner",
    currentPosition: "Software Developer Intern at XYZ Corp",
    industry: "Information Technology",
    education: "ABC University",
    location: {
      country: "India",
      region: "Karnataka",
      city: "Bangalore"
    },
    contactInfo: "muskan@example.com",
    website: "https://muskanportfolio.com",
    licenses: ["AWS Certified Developer", "Google Cloud Associate"],
    skills: ["JavaScript", "React", "Machine Learning", "Cloud Computing"],
    interests: ["AI Ethics", "Open Source Development", "Tech Startups"],
    experience: [
        { role: "Software Developer Intern", company: "XYZ Corp", duration: "Jan 2024 - Present" },
        { role: "Open Source Contributor", company: "GitHub", duration: "2023 - Present" }
      ],
      educationDetails: [
        { degree: "B.Tech in Computer Science", institution: "ABC University", year: "2023 - 2027" },
        { degree: "High School Diploma", institution: "XYZ School", year: "2021 - 2023" }
      ]
  });
  
  const [posts, setPosts] = useState([
    { id: 1, content: "Excited to start a new project on AI-driven solutions!", date: "2 days ago" },
    { id: 2, content: "Just published an article on web development trends for 2025!", date: "1 week ago" },
  ]);
  
  const [comments, setComments] = useState([
    { id: 1, content: "Great insights on AI!", date: "3 days ago" },
    { id: 2, content: "Loved your article on web development!", date: "5 days ago" },
  ]);

  const [images, setImages] = useState([
    { id: 1, src: "https://via.placeholder.com/150", description: "AI Project Screenshot" },
    { id: 2, src: "https://via.placeholder.com/150", description: "Cloud Certification" },
  ]);

  const [profileImage, setProfileImage] = useState(null);
  const [newPost, setNewPost] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editableProfile, setEditableProfile] = useState({ ...profile });
  const [activeTab, setActiveTab] = useState("posts");
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handlePostSubmit = () => {
    if (newPost.trim()) {
      setPosts([{ id: posts.length + 1, content: newPost, date: "Just now" }, ...posts]);
      setNewPost("");
    }
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
    if (isEditing) setProfile(editableProfile);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="relative">
            <img src="https://via.placeholder.com/850x250" alt="Cover" className="w-full h-36 object-cover" />
            <div className="relative flex flex-col items-center -mt-12">
              <img src={profileImage || "https://via.placeholder.com/150"} alt="Profile" className="w-24 h-24 rounded-full border-4 border-gray-900" />
              <label className="mt-1 flex items-center bg-blue-600 px-3 py-2 rounded-lg cursor-pointer hover:bg-blue-500 transition">
                <Camera className="text-white w-5 h-5" />
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>
            </div>
          </div>
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold">{profile.firstName} {profile.lastName}</h2>
            <p className="text-blue-400">{profile.headline}</p>
            <p className="text-sm text-gray-400">{profile.currentPosition}</p>
            <p className="text-sm text-gray-400">{profile.industry}</p>
            <p className="text-sm text-gray-400">{profile.education}</p>
            <p className="text-sm text-gray-400">{profile.location.city}, {profile.location.region}, {profile.location.country}</p>
            <p className="text-sm text-gray-400">{profile.contactInfo}</p>
            <p className="text-sm text-blue-400">{profile.website}</p>
            <button onClick={() => navigate('/my_connections') } className="text-blue-400 underline">
            28 connections
            </button>

            <button onClick={handleEdit} className="mt-4 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500 transition flex items-center mx-auto">
              <Edit3 className="w-5 h-5 mr-2" /> {isEditing ? "Save" : "Edit Profile"}
            </button>
          </div>
        </div>
        
        <div className="md:col-span-2 space-y-6 overflow-y-auto max-h-[700px]">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-blue-400 mb-3">Suggested for You</h3>
            <div className="flex gap-2">
            <FaPlus className="cursor-pointer text-green-400" />
            <FaEdit className="cursor-pointer text-blue-400" />
          </div>
            <p className="text-gray-300">Discover professionals, articles, and events that match your interests and expertise.</p>
          </div>
          
          
        <div className="md:col-span-2 space-y-6 overflow-y-auto max-h-[700px]">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-blue-400 mb-3">Activity</h3>
            <div className="flex space-x-4">
              <button className={`p-2 rounded-lg ${activeTab === "posts" ? "bg-blue-600" : "bg-gray-700"} transition`} onClick={() => setActiveTab("posts")}>Posts</button>
              <button className={`p-2 rounded-lg ${activeTab === "comments" ? "bg-blue-600" : "bg-gray-700"} transition`} onClick={() => setActiveTab("comments")}>Comments</button>
              <button className={`p-2 rounded-lg ${activeTab === "images" ? "bg-blue-600" : "bg-gray-700"} transition`} onClick={() => setActiveTab("images")}>Images</button>
            </div>

            <div className="mt-4">
              {activeTab === "posts" && (
                <ul>
                  {posts.map((post) => (
                    <li key={post.id} className="mb-2 bg-gray-700 p-3 rounded-lg">{post.content} <span className="text-sm text-gray-400">({post.date})</span></li>
                  ))}
                </ul>
              )}

              {activeTab === "comments" && (
                <ul>
                  {comments.map((comment) => (
                    <li key={comment.id} className="mb-2 bg-gray-700 p-3 rounded-lg">{comment.content} <span className="text-sm text-gray-400">({comment.date})</span></li>
                  ))}
                </ul>
              )}

              {activeTab === "images" && (
                <div className="grid grid-cols-2 gap-4">
                  {images.map((image) => (
                    <div key={image.id} className="bg-gray-700 p-3 rounded-lg">
                      <img src={image.src} alt={image.description} className="w-full h-auto rounded" />
                      <p className="text-sm text-gray-400 mt-2">{image.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          </div>

          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-blue-400 mb-3">Licenses & Certifications</h3>
            <ul className="text-gray-300">
              {profile.licenses.map((license, index) => (
                <li key={index} className="mb-1">{license}</li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2 space-y-6 overflow-y-auto max-h-[700px]">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-blue-400 mb-3">Experience</h3>
            <div className="flex gap-2">
            <FaPlus className="cursor-pointer text-green-400" />
            <FaEdit className="cursor-pointer text-blue-400" />
          </div>
            <ul className="text-gray-300">
              {profile.experience.map((exp, index) => (
                <li key={index} className="mb-1">{exp.role} at {exp.company} ({exp.duration})</li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-blue-400 mb-3">Education</h3>
            <div className="flex gap-2">
            <FaPlus className="cursor-pointer text-green-400" />
            <FaEdit className="cursor-pointer text-blue-400" />
          </div>
            <ul className="text-gray-300">
              {profile.educationDetails.map((edu, index) => (
                <li key={index} className="mb-1">{edu.degree}, {edu.institution} ({edu.year})</li>
              ))}
            </ul>
          </div>
        </div>
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-blue-400 mb-3">Skills</h3>
            <div className="flex gap-2">
            <FaPlus className="cursor-pointer text-green-400" />
            <FaEdit className="cursor-pointer text-blue-400" />
          </div>
            <ul className="text-gray-300">
              {profile.skills.map((skill, index) => (
                <li key={index} className="mb-1">{skill}</li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-blue-400 mb-3">Interests</h3>
            <div className="flex gap-2">
            <FaPlus className="cursor-pointer text-green-400" />
            <FaEdit className="cursor-pointer text-blue-400" />
          </div>
            <ul className="text-gray-300">
              {profile.interests.map((interest, index) => (
                <li key={index} className="mb-1">{interest}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}