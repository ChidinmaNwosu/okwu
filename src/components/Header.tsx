import Image from "next/image";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-[#dc7fb6] text-white">
      <h1 className="text-xl font-bold">OKWU</h1>
      <Image src="/chat.svg" alt="chat logo" width={50} height={50} />
    </header>
  );
}
