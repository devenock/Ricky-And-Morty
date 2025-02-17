import { useState, useEffect } from "react";
import { Character } from "../types";

interface CharacterFormState {
  name: string;
  status: string;
  species: string;
  image: string;
}

const initialState: CharacterFormState = {
  name: "",
  status: "",
  species: "",
  image: "",
};

export default function useCharacterForm() {
  const [formData, setFormData] = useState<CharacterFormState>(initialState);
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const savedCharacters = localStorage.getItem("characters");
    if (savedCharacters) {
      try {
        const parsedCharacters = JSON.parse(savedCharacters);
        setCharacters(
          Array.isArray(parsedCharacters)
            ? parsedCharacters
            : [parsedCharacters],
        );
      } catch (error) {
        console.error("Error loading characters:", error);
        setCharacters([]);
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => setFormData(initialState);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newCharacter: Character = {
      id: Date.now(),
      ...formData,
    };

    const updatedCharacters = [...characters, newCharacter];
    setCharacters(updatedCharacters);
    localStorage.setItem("characters", JSON.stringify(updatedCharacters));
    resetForm();
  };

  return {
    formData,
    characters,
    handleInputChange,
    handleSubmit,
    resetForm,
  };
}
