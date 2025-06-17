"use client";
import { FileUpload } from "../ui/file-upload";
import { useState } from "react";
import { jsPDF } from "jspdf";

export function Transform() {
  const [file, setFile] = useState<File | null>(null);
  const [convertType, setConvertType] = useState<string>("text-to-pdf");

  const handleFileChange = (files: File[]) => {
    if (files.length > 0) setFile(files[0]);
  };

  const handleConvert = () => {
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
          </select>

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
            onClick={handleConvert}
          >
            Converter
          </button>
        </>
      )}
    </section>
  );
}
