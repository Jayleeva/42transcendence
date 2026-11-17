// test de page erreur 404 personnalisée 

import BackButton from "@/components/ui/BackButton"
import Link from "next/dist/client/link";
import Image from 'next/image';

export default function NotFound() {
    return (
        <main className="flex min-h-screen w-full flex-col px-6 py-12 md:px-8 max-w-7xl mx-auto">
            <BackButton />
            <div>
                <h1>
                    <Image
                        src="/404_dog.webp"
                        alt="404 Error"
                        width={600}
                        height={400}
                        priority
                        className="items-center justify-center mx-auto"
                    />
                </h1>
                <h2 className="font-display text-5xl font-bold text-center">
                    La page que vous cherchez n’existe pas...
                </h2>
                <p className="font-display text-3xl text-center">
                    Vérifiez l’URL ou retournez à la page {''}
                    <Link href="/" className="underline">
                        d’accueil
                    </Link>.
                </p>
            </div>
        </main>
    );
}  