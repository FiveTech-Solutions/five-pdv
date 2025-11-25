import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Five PDV - Sistema de Ponto de Venda",
  description: "Sistema de PDV moderno e minimalista para mercados e lojas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </head>
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
