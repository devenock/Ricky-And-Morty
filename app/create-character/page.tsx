"use client";

import { useState, useEffect } from "react";

export default function CreateCharacterPage() {
  const [name, setName] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [species, setSpecies] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [characters, setCharacters] = useState<any[]>([]);

  // Load existing characters on component mount
  useEffect(() => {
    const savedCharacters = localStorage.getItem("characters");
    if (savedCharacters) {
      try {
        const parsedCharacters = JSON.parse(savedCharacters);
        // Check if the parsed data is an array
        if (Array.isArray(parsedCharacters)) {
          setCharacters(parsedCharacters);
        } else {
          // If it's not an array (e.g., it's a single object), convert it to an array
          setCharacters([parsedCharacters]);
        }
      } catch (error) {
        console.error("Error parsing characters from localStorage:", error);
        // Initialize with empty array if there's an error
        setCharacters([]);
      }
    }
  }, []);

  // Reset form fields
  const resetForm = () => {
    setName("");
    setStatus("");
    setSpecies("");
    setImage("");
  };

  // SUBMIT EVENT
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create new character object
    const newCharacter = {
      id: Date.now(), // Add unique ID for each character
      name,
      species,
      image,
      status,
    };

    // Update local state with new character
    const updatedCharacters = [...characters, newCharacter];
    setCharacters(updatedCharacters);

    // Store updated array in local storage
    localStorage.setItem("characters", JSON.stringify(updatedCharacters));

    // Reset form fields
    resetForm();
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Add Character
      </h3>

      <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-5">
        <div className="flex flex-col">
          <label
            htmlFor="name"
            className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            className="px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter character name"
            required
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="status"
            className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Status
          </label>
          <input
            id="status"
            type="text"
            value={status}
            className="px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            onChange={(e) => setStatus(e.target.value)}
            placeholder="Enter character status"
            required
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="species"
            className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Species
          </label>
          <input
            id="species"
            type="text"
            value={species}
            className="px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            onChange={(e) => setSpecies(e.target.value)}
            placeholder="Enter character species"
            required
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="image"
            className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Image URL
          </label>
          <input
            id="image"
            type="text"
            value={image}
            className="px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            onChange={(e) => setImage(e.target.value)}
            placeholder="Enter image URL"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-6 mt-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md shadow transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Add Character
        </button>
      </form>

      {/* Optional: Show number of characters saved */}
      {characters.length > 0 && (
        <p className="mt-6 text-sm text-gray-600 dark:text-gray-300">
          {characters.length} character{characters.length !== 1 ? "s" : ""}{" "}
          saved
        </p>
      )}
    </div>
  );
}
