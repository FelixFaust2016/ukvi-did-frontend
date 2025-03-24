import { FC } from "react";

interface Props {
  title: string;
  desc: string;
  children: React.ReactNode;
}

export const Header: FC<Props> = ({ title, desc, children }) => {
  return (
    <header className="w-full p-5 flex items-center gap-3 shadow-md mb-5">
      {children}
      <div>
        <p className="text-2xl font-medium">{title}</p>
        <p className="mt-1">{desc}</p>
      </div>
    </header>
  );
};
