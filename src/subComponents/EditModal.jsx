import React, { useState, useRef, useEffect } from "react";

const EditModal = ({ game, onClose, reviewTemplate, onSave }) => {
  const [newThoughts, setNewThoughts] = useState(game.review || reviewTemplate);
  const textareaRef = useRef();

  useEffect(() => {
    setNewThoughts(game.review || reviewTemplate);
  }, [game]);

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Get the cursor position using the textarea ref
    const textarea = textareaRef.current;
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageMarkdown = `![${file.name}](${event.target.result})\n`;
        setNewThoughts((prev) => {
          return (
            prev.substring(0, startPos) + imageMarkdown + prev.substring(endPos)
          );
        });

        // Move the cursor right after the inserted image
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd =
            startPos + imageMarkdown.length;
          textarea.focus();
        }, 0);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSave = async () => {
    const user = localStorage.getItem("user");
    const res = await fetch(`/games/${game._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "x-user": user },
      body: JSON.stringify({ review: newThoughts }),
    });
    const updatedGame = await res.json();
    onSave(updatedGame);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 backdrop-blur-md">
      <div className="bg-gradient-to-br from-black/70 to-[#021019] border border-cyan-700 rounded-2xl p-6 max-w-lg w-full shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-cyan-300">
          Edit Thoughts: {game.title}
        </h2>
        <textarea
          id="review-textarea"
          ref={textareaRef}
          rows={15}
          value={newThoughts}
          onChange={(e) => setNewThoughts(e.target.value)}
          placeholder={reviewTemplate}
          className="w-full p-3 rounded border border-cyan-600 bg-black/60 text-cyan-200 placeholder-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 font-mono whitespace-pre-wrap"
        />
        <p className="text-xs text-cyan-400 mt-2 mb-4">
          Use markdown style bullet points, headers, and paste image URLs in the
          last section.
        </p>
        <div>
          <label
            htmlFor="image-upload"
            className="inline-block cursor-pointer rounded-md bg-cyan-600 px-4 py-2 font-semibold text-black hover:bg-cyan-700 transition"
          >
            Upload Image(s)
          </label>
          <input
            type="file"
            id="image-upload"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
        <div className="flex justify-end mt-6 space-x-3">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-cyan-600 hover:bg-cyan-700 text-black font-semibold rounded transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
