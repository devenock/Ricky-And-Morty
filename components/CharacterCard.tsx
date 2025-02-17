import Image from "next/image";
import { Trash2 } from "lucide-react";
import { Character } from "../types";
import StatusBadge from "@/components/StatusBadge";

interface CharacterCardProps {
  character: Character;
  onDelete?: (id: number | string) => void;
}

export function CharacterCard({ character, onDelete }: CharacterCardProps) {
  return (
    <div className="relative flex flex-col overflow-hidden rounded-lg shadow-lg border border-gray-200 transition-transform duration-200 hover:shadow-xl bg-white dark:bg-gray-800">
      {character.isLocal && onDelete && (
        <button
          // onClick={() => onDelete(character.id)}
            onClick={() => {
                if (confirm("Are you sure you want to delete this character?")) {
                    onDelete(character.id);
                }
            }}
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
          <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500">No image available</p>
          </div>
        )}

        {character.isLocal && (
          <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-md">
            Local
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col space-y-2 flex-grow">
          <h4 className="font-semibold text-lg">{character.name}</h4>
          <StatusBadge status={character.status} />
          <p className="text-gray-700 dark:text-gray-300">
           Species: {character.species}
         </p>
      </div>
    </div>
  );
}
