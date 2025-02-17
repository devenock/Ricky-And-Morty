interface FormInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

export default function FormInput({
  id,
  label,
  value,
  onChange,
  placeholder,
}: FormInputProps) {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={id}
        className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-200"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
    </div>
  );
}
