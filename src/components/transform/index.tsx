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
  const { handleConvert, handleFileChange } = useTransform({
    file,
    setFile,
    convertType,
  });

  const fileType = file?.type ?? "";
  const availableOptions = getOptionsForType(fileType);

  return (
    <section className="max-w-screen flex flex-col lg:flex-row gap-6 items-center lg:items-start justify-center p-6">
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <FileUpload onChange={handleFileChange} />
      </div>

      {file && (
        <section className="flex flex-col items-center w-full lg:w-1/2 xl:max-w-[700px] gap-1.5">
          <h3 className="self-start text-sm md:text-lg font-bold text-zinc-800">Selecione o tipo de conversão</h3>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3 w-full ">
            {availableOptions.length > 0 ? (
              availableOptions.map((option) => {
                const Icon1 = option.icons.icon1;
                const Icon2 = option.icons.icon2;

                return (
                  <motion.button
                    key={option.value}
                    onClick={() => setConvertType(option.value)}
                    className={`w-full flex items-center text-purple-800 justify-between gap-4 p-4 rounded-lg cursor-pointer border shadow-md hover:shadow-lg  hover:bg-purple-500 hover:text-white transition-colors ${
                      convertType === option.value
                        ? "bg-purple-800 text-white"
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
                    <div className="flex items-center justify-center flex-1 ">
                      <ArrowRight size={20} />
                    </div>
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
            className="mt-4 bg-purple-800 text-white px-6 py-2 rounded-lg hover:bg-purple-500 transition-colors cursor-pointer"
            onClick={handleConvert}
          >
            Converter
          </button>
        </section >
      )}
    </section>
  );
}
