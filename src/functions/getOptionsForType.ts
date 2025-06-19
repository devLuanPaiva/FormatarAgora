export function getOptionsForType(fileType: string) {
    if (fileType.includes("pdf")) {
        return [
            { value: "pdf-to-jpeg", label: "PDF → JPEG" },
            { value: "pdf-to-docx", label: "PDF → DOCX" },
            { value: "pdf-to-text", label: "PDF → Texto" },
        ];
    } else if (fileType.includes("image")) {
        return [
            { value: "image-to-pdf", label: "Imagem → PDF" },
            { value: "image-to-docx", label: "Imagem → DOCX" },
            { value: "image-to-base64", label: "Imagem → Base64" },
            { value: "image-to-text", label: "Imagem → Texto (OCR)" },
        ];
    } else if (
        fileType === "text/plain" ||
        fileType === "application/json"
    ) {
        return [
            { value: "text-to-pdf", label: "Texto → PDF" },
            { value: "text-to-docx", label: "Texto → DOCX" },
        ];
    } else if (
        fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
        return [
            { value: "docx-to-pdf", label: "DOCX → PDF" },
        ];
    }

    return [];
}
