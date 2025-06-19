"use client";
import { useState } from "react";
import { FileUpload } from "../ui/file-upload";
import { useTransform } from "@/hooks/useTransform";
import { getOptionsForType } from "@/functions";

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
  const fileType = file?.type ?? "";
  const availableOptions = getOptionsForType(fileType);

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
            {availableOptions.length > 0 ? (
              availableOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))
            ) : (
              <option disabled>Tipo de arquivo não suportado</option>
            )}
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
