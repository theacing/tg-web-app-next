'use client'

import { usePathname } from "next/navigation";
import Link from "next/link";

interface HeaderProps {
    children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({
    children
}) => {
    const pathname = usePathname();

    return (
        <div className="flex flex-col gap-1.5">
            <div className="flex p-2 items-center justify-between bg-[#424242] rounded-2xl flex-none">
                <Link href="/me" className="w-14 h-14 bg-black rounded-full"></Link>
                <div className="w-14 h-14 bg-black"></div>
                <Link href="/search" className="w-14 h-14 bg-black rounded-full"></Link>
            </div>
            <main className="h-full flex-1 overflow-y-auto bg-[#eee] shadow-md p-6 border-2 border-indigo-500">
                {children}
            </main>
            
        </div>
    )
}

export default Header;