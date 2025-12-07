type PillSelectorProps<T extends string> = {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  disabled?: boolean;
};

export const PillSelector = <T extends string>({
  options,
  value,
  onChange,
  disabled = false,
}: PillSelectorProps<T>) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          disabled={disabled}
          className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
            value === option.value
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-foreground hover:bg-secondary/80"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
