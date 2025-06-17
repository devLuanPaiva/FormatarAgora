"use client";
import { FileUpload } from "../ui/file-upload";
import { useState } from "react";
import { jsPDF } from "jspdf";
import * as pdfjsLib from "pdfjs-dist";
import Tesseract from "tesseract.js";
import { TextItem } from "pdfjs-dist/types/src/display/api";

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export function Transform() {
  const [file, setFile] = useState<File | null>(null);
  const [convertType, setConvertType] = useState<string>("text-to-pdf");
  const [result, setResult] = useState<string>("");

  const handleFileChange = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
      setResult("");
    }
  };

  const handleConvert = async () => {
    if (!file) return;

    const reader = new FileReader();

    if (convertType === "text-to-pdf") {
      reader.onload = () => {
        const doc = new jsPDF();
        doc.text(reader.result as string, 10, 10);
        doc.save(`${file.name.split(".")[0]}.pdf`);
      };
      reader.readAsText(file);
    }

    if (convertType === "image-to-pdf") {
      reader.onload = () => {
        const doc = new jsPDF({
          orientation: "portrait",
          unit: "px",
          format: [500, 700],
        });
        doc.addImage(reader.result as string, "JPEG", 0, 0, 500, 700);
        doc.save(`${file.name.split(".")[0]}.pdf`);
      };
      reader.readAsDataURL(file);
    }

    if (convertType === "pdf-to-text") {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let text = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = (content.items as TextItem[])
          .map((item) => item.str)
          .join(" ");
        text += `\n${pageText}`;
      }

      setResult(text);
    }

    if (convertType === "image-to-base64") {
      reader.onload = () => {
        const base64 = reader.result as string;
        setResult(base64);
      };
      reader.readAsDataURL(file);
    }

    if (convertType === "image-to-text") {
      const imageData = await file.arrayBuffer();
      const blob = new Blob([imageData], { type: file.type });

      Tesseract.recognize(blob, "eng")
        .then(({ data: { text } }) => setResult(text))
        .catch((err) => setResult(`Erro: ${err.message}`));
    }
  };

  return (
    <section className="max-w-screen flex flex-col gap-6 items-center justify-center p-6">
      <div className="w-full md:w-[70%]">
        <FileUpload onChange={handleFileChange} />
      </div>

      {file && (
        <>
          <select
            className="border px-4 py-2 rounded-md"
            value={convertType}
            onChange={(e) => setConvertType(e.target.value)}
          >
            <option value="text-to-pdf">Texto → PDF</option>
            <option value="image-to-pdf">Imagem → PDF</option>
            <option value="pdf-to-text">PDF → Texto</option>
            <option value="image-to-base64">Imagem → Base64</option>
            <option value="image-to-text">Imagem → Texto (OCR)</option>
          </select>

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
            onClick={handleConvert}
          >
            Converter
          </button>

          {result && (
            <textarea
              readOnly
              value={result}
              className="mt-4 w-full h-64 border rounded p-2"
            />
          )}
        </>
      )}
    </section>
  );
}
