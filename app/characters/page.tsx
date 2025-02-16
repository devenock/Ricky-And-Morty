"use client";
import { useState, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { Trash2 } from "lucide-react";

// Define the API response types
interface Character {
  id: number | string;
  name: string;
  status: string;
  species: string;
  image: string;
  // Flag to identify local characters
  isLocal?: boolean;
}

interface ApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

export default function CharactersPage() {
  const [localCharacters, setLocalCharacters] = useState<Character[]>([]);
  const { ref, inView } = useInView();

  // Load characters from localStorage
  const loadLocalCharacters = () => {
    const savedCharacters = localStorage.getItem("characters");
    if (savedCharacters) {
      try {
        const parsedCharacters = JSON.parse(savedCharacters);
        const characters = Array.isArray(parsedCharacters)
          ? parsedCharacters
          : [parsedCharacters];

        // Mark all local characters and ensure unique IDs
        const markedCharacters = characters.map((char) => ({
          ...char,
          id: `local-${char.id}`, // Prefix local IDs to make them unique
          isLocal: true,
        }));

        setLocalCharacters(markedCharacters);
      } catch (error) {
        console.error("Error parsing characters from localStorage:", error);
        setLocalCharacters([]);
      }
    }
  };

  useEffect(() => {
    loadLocalCharacters();
  }, []);

  // Delete a local character
  const deleteCharacter = (id: number | string) => {
    // Filter out the character to delete
    const updatedCharacters = localCharacters.filter((char) => char.id !== id);

    // Update state
    setLocalCharacters(updatedCharacters);

    // Remove the 'local-' prefix before saving back to localStorage
    const cleanedCharacters = updatedCharacters.map((char) => ({
      ...char,
      id: String(char.id).replace("local-", ""),
    }));

    // Update localStorage
    localStorage.setItem("characters", JSON.stringify(cleanedCharacters));
  };

  // Fetch characters with infinite query
  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery<ApiResponse, Error>({
    queryKey: ["characters"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetch(
        `https://rickandmortyapi.com/api/character?page=${pageParam}`,
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.info.next) return undefined;
      const url = new URL(lastPage.info.next);
      const page = url.searchParams.get("page");
      return page ? parseInt(page) : undefined;
    },
    initialPageParam: 1,
  });

  // Trigger next page fetch when the last item is in view
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  // Prepare all characters (local + API)
  const allCharacters: Character[] = [
    ...localCharacters,
    ...(data?.pages.flatMap((page) =>
      // Add api- prefix to API character IDs to ensure uniqueness
      page.results.map((char) => ({
        ...char,
        id: `api-${char.id}`,
      })),
    ) || []),
  ];

  if (isLoading && !data)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl">Loading characters...</p>
      </div>
    );

  if (status === "error")
    return (
      <div className="text-red-500 p-4">
        An error has occurred: {error.message}
      </div>
    );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <h3 className="text-2xl font-bold mb-6 text-center">Character Gallery</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allCharacters.map((character, index) => {
          const isLastItem = index === allCharacters.length - 1;
          const statusColor =
            character.status === "Alive"
              ? "text-green-500"
              : character.status === "Dead"
                ? "text-red-500"
                : "text-gray-500";

          return (
            <div
              key={character.id}
              ref={isLastItem ? ref : undefined}
              className="relative flex flex-col overflow-hidden rounded-lg shadow-lg border border-gray-200 transition-transform duration-200 hover:shadow-xl bg-white dark:bg-gray-800"
            >
              {/* Delete button (only for local characters) */}
              {character.isLocal && (
                <button
                  onClick={() => deleteCharacter(character.id)}
                  className="absolute top-2 right-2 z-10 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
                  title="Delete character"
                >
                  <Trash2 size={16} />
                </button>
              )}

              <div className="relative h-64 w-full overflow-hidden">
                {character.image && character.image.startsWith("http") ? (
                  <Image
                    src={character.image}
                    alt={character.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <p className="text-gray-500">No image available</p>
                  </div>
                )}

                {/* Local badge */}
                {character.isLocal && (
                  <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-md">
                    Local
                  </div>
                )}
              </div>

              <div className="p-4 flex flex-col space-y-2 flex-grow">
                <h4 className="font-semibold text-lg">{character.name}</h4>
                <p className={statusColor}>Status: {character.status}</p>
                <p className="text-gray-700 dark:text-gray-300">
                  Species: {character.species}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {isFetchingNextPage && (
        <div className="flex justify-center mt-8 mb-4">
          <p className="text-gray-500">Loading more characters...</p>
        </div>
      )}

      {!hasNextPage && data && (
        <div className="text-center mt-8 mb-4">
          <p className="text-gray-500">You've reached the end!</p>
        </div>
      )}
    </div>
  );
}
