import { logo } from "@/assets/webp";
import Image from "next/image";
import { FC } from "react";

export const Logo: FC<{ className?: string }> = ({ className }) => {
  return <Image className={className} src={logo} alt={"logo"} />;
};
