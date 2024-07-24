type Props = {
  text: string;
  onClick: () => void;
  red: boolean;
  disabled?: boolean;
  className?: string;
};
export default function Button({
  text,
  onClick,
  red,
  disabled = false,
  className,
}: Props) {
  const buttonStyle = `rounded-[8px] px-[16px] py-[7px] flex self-auto items-stretch justify-start relative bg-[#EFEFEFFF] hover:bg-[#dbdbdb] ${
    red ? "bg-red-500 text-white" : "bg-[#EFEFEFFF]"
  } ${disabled && "opacity-80"} ${className}`;
  return (
    <button
      onClick={() => onClick()}
      disabled={disabled}
      className={buttonStyle}
    >
      {text}
    </button>
  );
}
