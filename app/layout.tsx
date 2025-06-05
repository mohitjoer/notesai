import "./globals.css";
import { ClerkProvider, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Header from "../components/header";
import SideBarMenu from "../components/sidebarmenu";
import { Button } from "@/components/ui/button";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-gray-100 h-screen flex flex-col">
          <header className="shadow-md">
            <Header />
          </header>
          <main className="flex flex-1 overflow-hidden">
            <SignedIn>
              <section className="flex">
                <SideBarMenu />
              </section>
              <section className="flex flex-1 m-2 rounded-2xl items-center justify-center  bg-gray-400">
                {children}
              </section>
            </SignedIn>
            <SignedOut>
              <section className="flex flex-1 items-center justify-center">
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-4">Please Sign In</h2>
                  <p className="mb-4 text-gray-600">
                    Sign in to access Notes AI features
                  </p>
                  <Button asChild variant="default">
                    <SignInButton />
                  </Button>
                </div>
              </section>
            </SignedOut>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
