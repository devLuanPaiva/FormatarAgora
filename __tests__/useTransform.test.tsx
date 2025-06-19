import "@testing-library/jest-dom";

import { renderHook } from "@testing-library/react";
import { useTransform } from "../src/hooks/useTransform";

jest.mock("jszip");
jest.mock("jspdf");
jest.mock("file-saver");
jest.mock("tesseract.js");
jest.mock("pdfjs-dist");
jest.mock("docx");
jest.mock("mammoth");
jest.mock("pdfjs-dist", () => ({
  getDocument: jest.fn(() => ({
    promise: Promise.resolve({
      getPage: jest.fn(() =>
        Promise.resolve({
          getTextContent: jest.fn(() => Promise.resolve({ items: [] })),
        })
      ),
      numPages: 1,
    }),
  })),
  GlobalWorkerOptions: {
    workerSrc: "",
  },
}));

describe("useTransform", () => {
  const mockFile = (name: string, type: string, content: string): File => {
    const blob = new Blob([content], { type });
    return new File([blob], name, { type });
  };
  const mockImageFile = (name: string, type: string): File => {
    const blob = new Blob(["fake image data"], { type });
    return new File([blob], name, { type });
  };
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should initialize correctly", () => {
    const { result } = renderHook(() =>
      useTransform({
        file: null,
        setFile: jest.fn(),
        convertType: "text-to-pdf",
      })
    );
    expect(result.current).toHaveProperty("handleFileChange");
    expect(result.current).toHaveProperty("handleConvert");
  });
});
