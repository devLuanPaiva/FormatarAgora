import "@testing-library/jest-dom";

import { renderHook } from "@testing-library/react";
import { useTransform } from "../src/hooks/useTransform";
import { mockFile } from "../__mocks__";

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
  it("should set file when files are provided", () => {
    const mockSetFile = jest.fn();
    const { result } = renderHook(() =>
      useTransform({
        file: null,
        setFile: mockSetFile,
        convertType: "text-to-pdf",
      })
    );

    const testFile = mockFile("test.txt", "text/plain", "Hello World");
    result.current.handleFileChange([testFile]);

    expect(mockSetFile).toHaveBeenCalledWith(testFile);
  });
});
