import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

export const metadata: Metadata = {
  title: "Formatar Agora",
  description:
    "O Formatar Agora é um conversor de arquivos online eficiente. Converta PDF para JPEG, DOCX, TXT; Imagens para PDF, DOCX, BASE64, TXT (OCR); e TXT para PDF ou DOCX, além de DOCX para PDF. Simples, rápido e gratuito!",
  keywords: [
    "conversor de arquivos",
    "PDF para JPEG",
    "PDF para DOCX",
    "PDF para TXT",
    "Imagem para PDF",
    "Imagem para DOCX",
    "Imagem para BASE64",
    "Imagem para texto OCR",
    "TXT para PDF",
    "TXT para DOCX",
    "DOCX para PDF",
  ],
  authors: [{ name: "Luan Alves" }],
  generator: "Next.js",
  openGraph: {
    title: "Formatar Agora - Conversor de Arquivos Online",
    description:
      "Converta arquivos facilmente: PDF, Imagem, DOCX, TXT e muito mais. Gratuito e rápido!",
    url: "https://formatar-agora.vercel.app/",
    siteName: "Formatar Agora",
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              let originalTitle = document.title;
              window.addEventListener("blur", () => {
                document.title = "Ei, volte aqui...";
              });
              window.addEventListener("focus", () => {
                document.title = "Formatar Agora - Conversor de Arquivos Online";
              });
            `,
          }}
        />
      </head>
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
