import { useState, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Character, ApiResponse } from "../types";

export function useCharacters() {
  const [localCharacters, setLocalCharacters] = useState<Character[]>([]);

  // Load local characters
  useEffect(() => {
    const savedCharacters = localStorage.getItem("characters");
    if (savedCharacters) {
      try {
        const characters = JSON.parse(savedCharacters);
        setLocalCharacters(
          (Array.isArray(characters) ? characters : [characters]).map(
            (char) => ({
              ...char,
              id: `local-${char.id}`,
              isLocal: true,
            }),
          ),
        );
      } catch (error) {
        console.error("Error loading local characters:", error);
        setLocalCharacters([]);
      }
    }
  }, []);

  // Fetch API characters
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
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.info.next) return undefined;
      return new URL(lastPage.info.next).searchParams.get("page") || undefined;
    },
    initialPageParam: 1,
  });

  const deleteLocalCharacter = (id: number | string) => {
    const updatedCharacters = localCharacters.filter((char) => char.id !== id);
    setLocalCharacters(updatedCharacters);

    localStorage.setItem(
      "characters",
      JSON.stringify(
        updatedCharacters.map((char) => ({
          ...char,
          id: String(char.id).replace("local-", ""),
        })),
      ),
    );
  };

  const apiCharacters =
    data?.pages.flatMap((page) =>
      page.results.map((char) => ({
        ...char,
        id: `api-${char.id}`,
      })),
    ) || [];

  return {
    localCharacters,
    apiCharacters,
    deleteLocalCharacter,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  };
}
