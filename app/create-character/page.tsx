"use client";

import useCharacterForm from "@/hooks/useCharacterForm";
import FormInput from "@/components/FormInput";
import CharacterCount from "@/components/CharacterCount";

export default function CreateCharacterPage() {
  const { formData, characters, handleInputChange, handleSubmit } =
    useCharacterForm();

  return (
    <div className="w-full max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Add Character
      </h3>

      <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-5">
        <FormInput
          id="name"
          label="Name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter character name"
        />

        <FormInput
          id="status"
          label="Status"
          value={formData.status}
          onChange={handleInputChange}
          placeholder="Enter character status"
        />

        <FormInput
          id="species"
          label="Species"
          value={formData.species}
          onChange={handleInputChange}
          placeholder="Enter character species"
        />

        <FormInput
          id="image"
          label="Image URL"
          value={formData.image}
          onChange={handleInputChange}
          placeholder="Enter image URL"
        />

        <button
          type="submit"
          className="w-full py-3 px-6 mt-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md shadow transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Add Character
        </button>
      </form>

      <CharacterCount count={characters.length} />
    </div>
  );
}
