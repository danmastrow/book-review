type InputProps = {
  id: string;
  label: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  "data-testid"?: string;
};
const Input = ({
  id,
  label,
  placeholder,
  onChange,
  errorMessage,
  "data-testid": dataTestId,
}: InputProps) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          name={id}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          type="text"
          placeholder={placeholder}
          onChange={onChange}
          data-testid={dataTestId}
        />
      </div>
      {errorMessage && (
        <p className="mt-1 text-sm font-bold text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
