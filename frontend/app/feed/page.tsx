// Feed page

import Navbar from "@/components/layout/Navbar";

export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            <main>
                {children}
            </main>
        </>
    );
}

