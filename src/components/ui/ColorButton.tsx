type Props = {
  text: string;
  className?: string;
  onClick?: () => void;
  type?: "submit" | "reset" | "button" | undefined;
};

export default function ColorButton({ text, onClick, className, type }: Props) {
  return (
    <div className="w-full flex items-center p-[0.095rem] rounded-md bg-gradient-to-bl from-fuchsia-600 to-amber-300">
      <button type={type} className={className} onClick={onClick}>
        {text}
      </button>
    </div>
  );
}
