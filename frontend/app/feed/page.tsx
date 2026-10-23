// Feed page

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

// attention c'est faux c'etait pour tester le visu dela nav bar
// a mattre ds un layout plus tard 
export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            <main>
                {children}
            </main>
            <Footer />
        </>
    );
}


/* 
// a mettre qd le layout sera fait 
export default function FeedPage() {
    return (
        <main>
            <h1>Feed</h1>
        </main>
    );
}
*/

/*
Du coup 

*/

