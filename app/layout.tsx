import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header";
import { Metadata, Viewport } from 'next'  // Use these types instead
import SideBarMenu from "@/components/sidebarmenu";
import InputBar from "@/components/inputbar";
import StartPage from "@/components/startpage";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-gray-100 h-screen flex flex-col">
          <header className="shadow-md flex-1">
            <Header/>
          </header>
          <main className=" flex flex-5/6  flex-row ">
              <section className="flex">
                <SideBarMenu />
              </section>
              <section className="flex flex-1  m-2 rounded-2xl justify-center items-center bg-gray-400">
                  {children}
              </section>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
