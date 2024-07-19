type Props = {
  text: string;
  onClick: () => void;
  red: boolean;
};
export default function Button({ text, onClick, red }: Props) {
  const buttonStyle = `rounded-[8px] px-[16px] py-[7px] flex self-auto items-stretch justify-start relative bg-[#EFEFEFFF] hover:bg-[#dbdbdb] ${
    red ? "bg-red-500 text-white" : "bg-[#EFEFEFFF]"
  }`;
  return <button className={buttonStyle}>{text}</button>;
}
