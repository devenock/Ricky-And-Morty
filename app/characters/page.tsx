"use client";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useCharacters } from "@/hooks/useCharacters";
import { CharacterCard } from "@/components/CharacterCard";

export default function CharactersPage() {
  const { ref, inView } = useInView();
  const {
    localCharacters,
    apiCharacters,
    deleteLocalCharacter,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useCharacters();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl">Loading characters...</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="text-red-500 p-4">
        An error has occurred: {error?.message}
      </div>
    );
  }

  const allCharacters = [...localCharacters, ...apiCharacters];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <h3 className="text-2xl font-bold mb-6 text-center">Character Gallery</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allCharacters.map((character, index) => (
          <div
            key={character.id}
            ref={index === allCharacters.length - 1 ? ref : undefined}
          >
            <CharacterCard
              character={character}
              onDelete={character.isLocal ? deleteLocalCharacter : undefined}
            />
          </div>
        ))}
      </div>

      {isFetchingNextPage && (
        <div className="flex justify-center mt-8 mb-4">
          <p className="text-gray-500">Loading more characters...</p>
        </div>
      )}

      {!hasNextPage && (
        <div className="text-center mt-8 mb-4">
          <p className="text-gray-500">You&apos;ve reached the end!</p>
        </div>
      )}
    </div>
  );
}
