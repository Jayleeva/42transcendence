// Navigation bar 

import Link from "next/link";
import { Bell, CirclePlus, CircleUserRound, House, Mail, Search } from 'lucide-react';

export default function Navbar() {
    return (
        <nav>
            <Link href="/feed">
                <House />
            </Link>

            <Link href="/messages">
                <Mail />
            </Link>

            <Link href="/notifications">
                <Bell />
            </Link>
            
            <Link href="/search">
                <Search />
            </Link>

            <Link href="/pet/create">
                <CirclePlus />
            </Link>

            <Link href="/profile-student">
                <CircleUserRound />
            </Link>

        </nav>
    );
}

// test pour couleur et taille
/*             
<Link href="/feed">
    <House size={40}color="#3e7d9e"/>
</Link>
*/