import reactDom from "react-dom";

type Props = { children: React.ReactNode };

// ssr일 때는 처리해주지 않을 것
export default function ModalPortal({ children }: Props) {
  // 아래 조건은 브라우저 환경이 아니라는 의미
  if (typeof window === "undefined") return null;
  const node = document.getElementById("portal") as Element;
  return reactDom.createPortal(children, node);
}
