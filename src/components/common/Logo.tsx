import Link from "next/link";
import Image from "next/image";

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <Link href="/" className={className}>
      <Image
        src="/logo-cleanco.png"
        alt="CleanCo"
        width={100}
        height={20}
        style={{ height: "auto", width: "auto", maxHeight: "2.5rem" }}
        priority
      />
    </Link>
  );
};
export default Logo;
