'use client';
import JSZip from "jszip";
import { jsPDF } from "jspdf";
import { saveAs } from "file-saver";
import Tesseract from "tesseract.js";
import * as pdfjsLib from "pdfjs-dist";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { TextItem } from "pdfjs-dist/types/src/display/api";

pdfjsLib.GlobalWorkerOptions.workerSrc = `/js/pdf.worker.mjs`;

interface UTransformProps {
    file: File | null;
    setFile: React.Dispatch<React.SetStateAction<File | null>>;
    convertType: string;
    setConvertType: React.Dispatch<React.SetStateAction<string>>;
    result: string;
    setResult: React.Dispatch<React.SetStateAction<string>>;
}

export function useTransform({
    file, setFile, convertType, setConvertType, result, setResult
}: Readonly<UTransformProps>) {

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

            const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
            saveAs(blob, `${file.name.split(".")[0]}.txt`);
        }

        if (convertType === "image-to-base64") {
            reader.onload = () => {
                const base64 = reader.result as string;
                const blob = new Blob([base64], { type: "text/plain;charset=utf-8" });
                saveAs(blob, `${file.name.split(".")[0]}_base64.txt`);
            };
            reader.readAsDataURL(file);
        }

        if (convertType === "image-to-text") {
            const imageData = await file.arrayBuffer();
            const blob = new Blob([imageData], { type: file.type });

            Tesseract.recognize(blob, "eng")
                .then(({ data: { text } }) => {
                    const textBlob = new Blob([text], { type: "text/plain;charset=utf-8" });
                    saveAs(textBlob, `${file.name.split(".")[0]}_ocr.txt`);
                })
                .catch((err) => {
                    const errorBlob = new Blob([`Erro: ${err.message}`], { type: "text/plain" });
                    saveAs(errorBlob, "ocr_error.txt");
                });
        }

        if (convertType === "pdf-to-jpeg") {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

            const zip = new JSZip();

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: 2 });
                const canvas = document.createElement("canvas");
                const context = canvas.getContext("2d");

                canvas.width = viewport.width;
                canvas.height = viewport.height;

                await page.render({ canvasContext: context!, viewport }).promise;
                const imageUrl = canvas.toDataURL("image/jpeg", 1.0);

                const byteString = atob(imageUrl.split(",")[1]);
                const mimeString = imageUrl.split(",")[0].split(":")[1].split(";")[0];

                const ab = new ArrayBuffer(byteString.length);
                const ia = new Uint8Array(ab);
                for (let j = 0; j < byteString.length; j++) {
                    ia[j] = byteString.charCodeAt(j);
                }

                const blob = new Blob([ab], { type: mimeString });
                zip.file(`pagina_${i}.jpeg`, blob);
            }

            const content = await zip.generateAsync({ type: "blob" });
            saveAs(content, `${file.name.split(".")[0]}_imagens.zip`);
        }

        if (convertType === "pdf-to-docx") {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

            const paragraphs: Paragraph[] = [];

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const content = await page.getTextContent();
                const pageText = (content.items as TextItem[])
                    .map((item) => item.str)
                    .join(" ");

                paragraphs.push(new Paragraph({ children: [new TextRun({ text: pageText })] }));
            }
            const doc = new Document({ sections: [{ children: paragraphs }] })
            const blob = await Packer.toBlob(doc)
            saveAs(blob, `${file.name.split(".")[0]}.docx`)
        }
        if (convertType === "image-to-docx") {
            const imageData = await file.arrayBuffer();
            const blob = new Blob([imageData], { type: file.type });
            try {
                const { data: { text } } = await Tesseract.recognize(blob, "eng");

                const doc = new Document({
                    sections: [
                        {
                            children: [
                                new Paragraph({
                                    children: [new TextRun(text)],
                                }),
                            ],
                        },
                    ],
                });
                const docBlob = await Packer.toBlob(doc);
                saveAs(docBlob, `${file.name.split(".")[0]}_ocr.docx`);
            } catch (err: any) {
                const errorBlob = new Blob([`Erro: ${err.message}`], {
                    type: "text/plain",
                });
                saveAs(errorBlob, "ocr_error.txt");
            }
        }
        if (convertType === "text-to-docx") {
            reader.onload = async () => {
                const text = reader.result as string;

                const doc = new Document({
                    sections: [
                        {
                            children: text
                                .split("\n")
                                .map((line) => new Paragraph({ children: [new TextRun(line)] })),
                        },
                    ],
                })
                const docBlob = await Packer.toBlob(doc);
                saveAs(docBlob, `${file.name.split(".")[0]}.docx`);
            }
            reader.readAsText(file);
        }
        if (convertType === "docx-to-pdf") {
            const arrayBuffer = await file.arrayBuffer();

            const mammoth = await import("mammoth");
            const { value: html } = await mammoth.convertToHtml({ arrayBuffer });

            const textContent = html.replace(/<[^>]+>/g, "");

            const doc = new jsPDF();
            const lines = doc.splitTextToSize(textContent, 180);
            doc.text(lines, 10, 10);
            doc.save(`${file.name.split(".")[0]}.pdf`);
        }
    };

    return { handleFileChange, handleConvert };
}
