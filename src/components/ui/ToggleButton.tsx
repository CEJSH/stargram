type Props = {
  toggled: boolean;
  onToggle: (toggled: boolean) => void;
  onIcon: React.ReactNode;
  offIcon: React.ReactNode;
  className?: string;
  title: string;
};
export default function ToggleButton({
  toggled,
  onToggle,
  onIcon,
  offIcon,
  title,
}: Props) {
  return (
    <button
      aria-label={title}
      className="cursor-pointer"
      onClick={() => onToggle(!toggled)}
    >
      {toggled ? onIcon : offIcon}
    </button>
  );
}
