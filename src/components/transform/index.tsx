"use client";
import { useState } from "react";
import { FileUpload } from "../ui/file-upload";
import { useTransform } from "@/hooks/useTransform";

export function Transform() {
  const [file, setFile] = useState<File | null>(null);
  const [convertType, setConvertType] = useState<string>("text-to-pdf");
  const [result, setResult] = useState<string>("");
  const { handleConvert, handleFileChange } = useTransform({
    file,
    setFile,
    convertType,
    setConvertType,
    result,
    setResult,
  });
  return (
    <section className="max-w-screen flex flex-col gap-6 items-center justify-center p-6">
      <div className="w-full md:w-[70%]">
        <FileUpload onChange={handleFileChange} />
      </div>

      {file && (
        <>
          <select
            className="border px-4 py-2 rounded-md "
            value={convertType}
            onChange={(e) => setConvertType(e.target.value)}
          >
            <option value="pdf-to-jpeg">PDF → JPEG</option>
            <option value="pdf-to-docx">PDF → DOCX</option>
            <option value="pdf-to-text">PDF → Texto</option>
            <option value="image-to-pdf">Imagem → PDF</option>
            <option value="image-to-docx">Imagem → DOCX</option>
            <option value="image-to-base64">Imagem → Base64</option>
            <option value="image-to-text">Imagem → Texto (OCR)</option>
            <option value="text-to-pdf">Texto → PDF</option>
            <option value="text-to-docx">Texto → DOCX</option>
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
