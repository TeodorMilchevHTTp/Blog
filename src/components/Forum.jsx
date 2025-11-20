import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaPlus, FaArrowLeft } from "react-icons/fa"; // Add FaArrowLeft for the back icon
import { motion } from "framer-motion"; // Import Framer Motion
import ReactMarkdown from "react-markdown"; // Import Markdown rendering library

const Forum = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // To check if the user is logged in
  const [posts, setPosts] = useState([]); // Store the posts
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "",
    rating: "",
  }); // For creating new post
  const [editingPost, setEditingPost] = useState(null); // For editing a post
  const [viewingPost, setViewingPost] = useState(null); // For viewing a post in modal

  // States to handle the dropdown visibility
  const [isRatingDropdownVisible, setIsRatingDropdownVisible] = useState(false);

  // Categories to choose from
  const categories = ["Games", "YouTube", "Coding", "Food", "Tips", "Journal"];

  // Rating options
  const ratingOptions = [
    { value: "Amazing! 🎮🚀", emoji: "🎮🚀" },
    { value: "Epic! 😎🔥", emoji: "😎🔥" },
    { value: "Great! 👍💥", emoji: "👍💥" },
    { value: "Good. 👌💡", emoji: "👌💡" },
    { value: "Okay. 🤔", emoji: "🤔" },
    { value: "Meh. 😕", emoji: "😕" },
    { value: "Bad. 👎💣", emoji: "👎💣" },
  ];

  // Fetch the user and posts when the component mounts
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));

    // Fetch posts from backend API
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts");
        if (response.ok) {
          const postsData = await response.json();
          setPosts(postsData); // Set the posts state with data from the backend
        } else {
          console.error("Failed to fetch posts from backend");
        }
      } catch (err) {
        console.error("Error fetching posts from backend:", err);
      }
    };

    fetchPosts();
  }, []);

  const handlePostChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreatePost = async () => {
    if (
      newPost.title &&
      newPost.content &&
      newPost.category &&
      newPost.rating
    ) {
      const postData = {
        title: newPost.title,
        content: newPost.content,
        category: newPost.category,
        rating: newPost.rating, // Include rating
      };

      try {
        const response = await fetch("/api/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        });

        if (response.ok) {
          const createdPost = await response.json();
          console.log("Post created:", createdPost);
          setPosts((prevPosts) => [...prevPosts, createdPost]);
          setNewPost({ title: "", content: "", category: "", rating: "" }); // Clear form
        } else {
          console.error("Error creating post:", response.statusText);
        }
      } catch (err) {
        console.error("Error:", err);
      }
    }
  };

  const handleEditPost = (postId) => {
    const postToEdit = posts.find((post) => post._id === postId);
    setEditingPost(postToEdit);
    setNewPost({
      title: postToEdit.title,
      content: postToEdit.content,
      category: postToEdit.category,
      rating: postToEdit.rating, // Populate rating for editing
    });
  };

  const handleSaveEdit = async () => {
    const updatedPostData = {
      title: newPost.title,
      content: newPost.content,
      category: newPost.category,
      rating: newPost.rating,
    };

    try {
      const response = await fetch(`/api/posts/${editingPost._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPostData),
      });

      if (response.ok) {
        const updatedPost = await response.json();
        console.log("Post updated:", updatedPost);
        const updatedPosts = posts.map((post) =>
          post._id === editingPost._id ? updatedPost : post
        );
        setPosts(updatedPosts);
        setEditingPost(null);
        setNewPost({ title: "", content: "", category: "", rating: "" });
      } else {
        console.error("Error updating post:", response.statusText);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const deletedPost = await response.json();
        console.log("Deleted post:", deletedPost);
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post._id !== postId)
        );
      } else {
        console.error("Error deleting post:", response.statusText);
      }
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  const handleOpenPostModal = (post) => {
    setViewingPost(post);
  };

  const handleClosePostModal = () => {
    setViewingPost(null);
  };

  const handleCategorySelect = (category) => {
    setNewPost((prev) => ({
      ...prev,
      category,
    }));
  };

  // Toggle rating dropdown visibility
  const toggleRatingDropdown = () => {
    setIsRatingDropdownVisible(!isRatingDropdownVisible);
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#05060a] via-[#06070c] to-[#07101a] text-slate-100 antialiased px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <header className="flex items-center justify-between gap-6 mb-10">
          {/* BACK BUTTON */}
          <motion.button
            onClick={handleBack}
            className="text-cyan-300 flex items-center gap-2 hover:text-cyan-500 transition"
          >
            <FaArrowLeft />
            Back
          </motion.button>

          <div className="flex-1 text-center">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-200 to-white drop-shadow-[0_8px_32px_rgba(0,255,255,0.06)]">
              Forum
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              All kinds of thingsi find interesting
            </p>
          </div>
        </header>

        {/* MAIN GRID */}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column: Create or Edit Post */}
          {user && user.role === "admin" && (
            <motion.aside
              className="lg:col-span-1 flex flex-col gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="rounded-2xl bg-gradient-to-br from-black/50 to-white/2 border border-cyan-600/10 p-6 shadow-lg backdrop-blur-md">
                <h2 className="text-lg font-semibold text-white">
                  {editingPost ? "Edit Post" : "Create New Post"}
                </h2>
                <div className="mt-5 space-y-3">
                  <input
                    type="text"
                    name="title"
                    value={newPost.title}
                    onChange={handlePostChange}
                    placeholder="Title"
                    className="w-full p-3 rounded-md bg-black/50 border border-cyan-500/20 text-cyan-100"
                  />

                  {/* Textarea with enhanced styling */}
                  <textarea
                    name="content"
                    value={newPost.content}
                    onChange={handlePostChange}
                    placeholder="Write your post content here, e.g., Markdown syntax!"
                    className="w-full p-4 rounded-md bg-black/50 border border-cyan-500/20 text-cyan-100 font-mono"
                    rows="6"
                  ></textarea>

                  <div className="mt-2 p-3 text-xs text-slate-400 bg-black/60 rounded-md">
                    <strong>Markdown Styling Guide:</strong>
                    <ul className="mt-2 list-disc pl-5">
                      <li>
                        <strong># Heading 1</strong> for main titles
                      </li>
                      <li>
                        <strong>## Heading 2</strong> for subheadings
                      </li>
                      <li>
                        <code>**bold**</code> for bold text
                      </li>
                      <li>
                        <code>*italic*</code> for italic text
                      </li>
                      <li>
                        <code>`code block`</code> for inline code
                      </li>
                      <li>```code block``` for multi-line code</li>
                    </ul>
                  </div>

                  {/* Categories - Clickable Buttons */}
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center gap-2">
                        {/* Category Button */}
                        <button
                          onClick={() => handleCategorySelect(category)}
                          className={`w-4 h-4 rounded-lg flex items-center justify-center border-2 border-cyan-500 text-white text-sm transition-all duration-200 ease-in-out ${
                            newPost.category === category
                              ? "bg-cyan-500 border-cyan-700 shadow-lg"
                              : "bg-black/50 hover:bg-cyan-500 hover:border-cyan-600"
                          }`}
                        >
                          {/* Checkmark icon */}
                          {newPost.category === category && <span>✔</span>}
                        </button>

                        {/* Category Name */}
                        <span className="text-sm text-white">{category}</span>
                      </div>
                    ))}
                  </div>

                  {/* Rating Dropdown */}
                  <div className="mt-4">
                    <button
                      onClick={toggleRatingDropdown}
                      className="w-full p-2 bg-black/50 text-white border rounded-md text-sm"
                    >
                      Select Rating: {newPost.rating || "Choose Rating"}
                    </button>
                    {isRatingDropdownVisible && (
                      <div className="mt-2 bg-black/60 p-3 rounded-md border border-cyan-500">
                        {ratingOptions.map((rating) => (
                          <button
                            key={rating.value}
                            onClick={() => {
                              setNewPost((prev) => ({
                                ...prev,
                                rating: rating.value,
                              }));
                              setIsRatingDropdownVisible(false); // Close dropdown after selection
                            }}
                            className="w-full text-left p-2 text-cyan-200 hover:bg-cyan-500 rounded-md"
                          >
                            {rating.value}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <motion.button
                    onClick={editingPost ? handleSaveEdit : handleCreatePost}
                    className={`w-full px-4 py-2 rounded-md bg-gradient-to-r from-cyan-600 to-blue-600 text-black font-medium hover:scale-[1.02] transition-transform ${
                      isRatingDropdownVisible ? "mt-5" : ""
                    }`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    {editingPost ? "Save Changes" : "Create Post"}
                  </motion.button>
                </div>
              </div>
            </motion.aside>
          )}

          {/* Right column: Display Posts */}
          <section className="lg:col-span-2 space-y-6">
            <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-[#021019] to-[#061024] border border-cyan-700/20 p-6 shadow-[0_12px_40px_rgba(0,255,255,0.05)]">
              <h2 className="text-2xl font-bold text-white">Latest Posts</h2>
              <div className="mt-6 space-y-4">
                {posts.length === 0 ? (
                  <p className="text-slate-400">No posts yet!</p>
                ) : (
                  posts.map((post) => (
                    <motion.div
                      key={post._id}
                      className="rounded-xl bg-gradient-to-r from-black/40 to-black/20 p-4 hover:bg-black/50 transition"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h3
                        className="text-lg font-semibold text-cyan-300 cursor-pointer"
                        onClick={() => handleOpenPostModal(post)}
                      >
                        {post.title}
                      </h3>
                      <div className="text-sm text-slate-400 mt-1">
                        {post.category}
                      </div>

                      <div className="mt-4 flex items-center gap-4">
                        {user && user.role === "admin" && (
                          <>
                            <button
                              onClick={() => handleEditPost(post._id)}
                              className="text-cyan-300 hover:text-cyan-500 transition"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDeletePost(post._id)}
                              className="text-red-500 hover:text-red-700 transition"
                            >
                              <FaTrashAlt />
                            </button>
                          </>
                        )}
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Post Modal */}
      {viewingPost && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={handleClosePostModal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="relative w-full max-w-2xl rounded-2xl bg-gradient-to-br from-black/70 to-[#041022] border border-cyan-700/20 p-6 shadow-2xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={handleClosePostModal}
              className="absolute top-4 right-4 text-slate-300"
            >
              ✕
            </button>

            <h2 className="text-3xl font-bold text-cyan-300">
              {viewingPost.title}
            </h2>

            {/* Show rating in modal */}
            <div className="mt-2 text-slate-400">{viewingPost.rating}</div>

            <div className="border-b border-slate-400 pb-4 mb-4" />

            {/* Render the content using ReactMarkdown */}
            <div className="text-slate-400 space-y-4">
              <ReactMarkdown>{viewingPost.content}</ReactMarkdown>
            </div>
            <div className="mt-6 flex justify-end">
              <p className="text-xs text-slate-500">
                Created on:{" "}
                {new Date(viewingPost.createdAt).toLocaleDateString()}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Forum;

