import { PiSmileyWinkLight } from "react-icons/pi";

export default function SmileIcon({ className }: { className?: string }) {
  return (
    <PiSmileyWinkLight
      style={{ fontSize: "24px", cursor: "pointer" }}
      className={className}
    />
  );
}
