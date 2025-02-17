interface CharacterCountProps {
  count: number;
}

export default function CharacterCount({ count }: CharacterCountProps) {
  if (count === 0) return null;

  return (
    <p className="mt-6 text-sm text-gray-600 dark:text-gray-300">
      {count} character{count !== 1 ? "s" : ""} saved
    </p>
  );
}
