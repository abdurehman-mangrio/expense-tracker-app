// src/pages/Profile.jsx
import { auth, db } from '../firebase';
import { updateProfile } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';

const presetAvatars = [
  'https://api.dicebear.com/6.x/avataaars/svg?seed=Tom',
  'https://api.dicebear.com/6.x/avataaars/svg?seed=Jane',
  'https://api.dicebear.com/6.x/bottts/svg?seed=Bot',
  'https://api.dicebear.com/6.x/personas/svg?seed=Nova',
  'https://api.dicebear.com/6.x/shapes/svg?seed=Zoe',
];

const Profile = () => {
  const user = auth.currentUser;
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('');
  const [bio, setBio] = useState('');
  const [theme, setTheme] = useState('light');
  const [fileToUpload, setFileToUpload] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      setName(user.displayName || '');
      setPhoto(user.photoURL || '');

      const ref = doc(db, 'users', user.uid);
      getDoc(ref).then((docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setBio(data.bio || '');
          setTheme(data.theme || 'light');
          document.documentElement.classList.toggle('dark', data.theme === 'dark');
        }
      });
    }
  }, [user, navigate]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileToUpload(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result); // for preview only
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async () => {
    try {
      let finalPhotoURL = photo;

      // Upload if user picked image from device
      if (fileToUpload) {
        const storage = getStorage();
        const imageRef = storageRef(storage, `avatars/${user.uid}`);
        await uploadBytes(imageRef, fileToUpload);
        finalPhotoURL = await getDownloadURL(imageRef);
      }

      // Update Firebase Auth profile
      await updateProfile(user, {
        displayName: name,
        photoURL: finalPhotoURL,
      });

      // Save additional data to Firestore
      await setDoc(doc(db, 'users', user.uid), { bio, theme }, { merge: true });

      toast.success('Profile updated!');
    } catch (error) {
      console.error(error);
      toast.error('Update failed');
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 p-6 rounded shadow max-w-xl mx-auto mt-10 space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-semibold text-center text-blue-600 dark:text-white">
        Your Profile
      </h2>

      <div className="flex flex-col items-center gap-4">
        <img
          src={photo || 'https://ui-avatars.com/api/?name=User'}
          className="w-24 h-24 rounded-full object-cover border"
          alt="Avatar"
        />

        <label className="text-sm text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">
          Choose from device
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>

        <div className="flex flex-wrap justify-center gap-2 mt-2">
          {presetAvatars.map((url) => (
            <img
              key={url}
              src={url}
              alt="preset avatar"
              className={`w-12 h-12 rounded-full cursor-pointer border hover:ring-2 ${
                photo === url ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => {
                setPhoto(url);
                setFileToUpload(null); // Clear file upload if avatar selected
              }}
            />
          ))}
        </div>

        <input
          type="text"
          className="px-4 py-2 border rounded w-full dark:bg-gray-700 dark:text-white"
          placeholder="Display Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          className="px-4 py-2 border rounded w-full dark:bg-gray-700 dark:text-white"
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <button
          onClick={toggleTheme}
          className="text-sm px-4 py-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded"
        >
          Toggle Theme ({theme})
        </button>

        <button
          onClick={handleUpdate}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Update Profile
        </button>
      </div>
    </motion.div>
  );
};

export default Profile;
