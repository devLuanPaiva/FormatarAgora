"use client";
import { useState } from "react";
import { FileUpload } from "../ui/file-upload";
import { useTransform } from "@/hooks/useTransform";
import { getOptionsForType } from "@/functions";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {availableOptions.length > 0 ? (
              availableOptions.map((option) => {
                const Icon1 = option.icons.icon1;
                const Icon2 = option.icons.icon2;

                return (
                  <motion.button
                    key={option.value}
                    onClick={() => setConvertType(option.value)}
                    className={`flex items-center text-black justify-between gap-4 p-4 rounded-2xl border shadow-md hover:shadow-lg transition-all ${
                      convertType === option.value
                        ? "bg-blue-600 text-white"
                        : "bg-white"
                    }`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <div className="flex flex-col items-center">
                      <Icon1 size={32} />
                      <span className="text-sm font-medium">
                        {option.icons.label1}
                      </span>
                    </div>
                    <ArrowRight size={20} />
                    <div className="flex flex-col items-center">
                      <Icon2 size={32} />
                      <span className="text-sm font-medium">
                        {option.icons.label2}
                      </span>
                    </div>
                  </motion.button>
                );
              })
            ) : (
              <span className="text-gray-500">
                Tipo de arquivo não suportado
              </span>
            )}
          </div>

          <button
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-colors"
            onClick={handleConvert}
          >
            Converter
          </button>
        </>
      )}
    </section>
  );
}
