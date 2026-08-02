interface Props {
  options: string[];
  active: string;
  onSelect: (value: string) => void;
}

export default function FilterPills({ options, active, onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onSelect(option)}
          className={`rounded-full px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors ${
            active === option
              ? 'bg-signature-gradient text-ink'
              : 'border border-border text-ink-muted hover:border-accent hover:text-accent'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
