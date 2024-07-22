type Props = {
  toggled: boolean;
  onToggle: (toggled: boolean) => void;
  onIcon: React.ReactNode;
  offIcon: React.ReactNode;
  className?: string;
};
export default function ToggleButton({
  toggled,
  onToggle,
  onIcon,
  offIcon,
}: Props) {
  return (
    <button className="cursor-pointer" onClick={() => onToggle(!toggled)}>
      {toggled ? onIcon : offIcon}
    </button>
  );
}
