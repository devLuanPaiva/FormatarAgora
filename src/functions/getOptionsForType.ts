import { AiFillFilePdf, AiFillFileImage, AiFillFileWord, AiFillFileText, AiOutlineCode } from "react-icons/ai";

export function getOptionsForType(fileType: string) {
    if (fileType.includes("pdf")) {
        return [
            {
                value: "pdf-to-jpeg",
                label: "PDF → JPEG",
                icons: { icon1: AiFillFilePdf, label1: 'PDF', icon2: AiFillFileImage, label2: 'JPEG' }
            },
            {
                value: "pdf-to-docx",
                label: "PDF → DOCX",
                icons: { icon1: AiFillFilePdf, label1: 'PDF', icon2: AiFillFileWord, label2: 'DOCX' }
            },
            {
                value: "pdf-to-text",
                label: "PDF → Texto",
                icons: { icon1: AiFillFilePdf, label1: 'PDF', icon2: AiFillFileText, label2: 'Texto' }
            },
        ];
    } else if (fileType.includes("image")) {
        return [
            {
                value: "image-to-pdf",
                label: "Imagem → PDF",
                icons: { icon1: AiFillFileImage, label1: 'Imagem', icon2: AiFillFilePdf, label2: 'PDF' }
            },
            {
                value: "image-to-docx",
                label: "Imagem → DOCX",
                icons: { icon1: AiFillFileImage, label1: 'Imagem', icon2: AiFillFileWord, label2: 'DOCX' }
            },
            {
                value: "image-to-base64",
                label: "Imagem → Base64",
                icons: { icon1: AiFillFileImage, label1: 'Imagem', icon2: AiOutlineCode, label2: 'Base64' }
            },
            {
                value: "image-to-text",
                label: "Imagem → Texto (OCR)",
                icons: { icon1: AiFillFileImage, label1: 'Imagem', icon2: AiFillFileText, label2: 'Texto' }
            },
        ];
    } else if (
        fileType === "text/plain" ||
        fileType === "application/json"
    ) {
        return [
            {
                value: "text-to-pdf",
                label: "Texto → PDF",
                icons: { icon1: AiFillFileText, label1: 'Texto', icon2: AiFillFilePdf, label2: 'PDF' }
            },
            {
                value: "text-to-docx",
                label: "Texto → DOCX",
                icons: { icon1: AiFillFileText, label1: 'Texto', icon2: AiFillFileWord, label2: 'DOCX' }
            },
        ];
    } else if (
        fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
        return [
            {
                value: "docx-to-pdf",
                label: "DOCX → PDF",
                icons: { icon1: AiFillFileWord, label1: 'DOCX', icon2: AiFillFilePdf, label2: 'PDF' }
            },
        ];
    }

    return [];
}
