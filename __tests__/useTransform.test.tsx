import "@testing-library/jest-dom";
import { jsPDF } from "jspdf";
import { renderHook, act } from "@testing-library/react";
import { mockFile, mockImageFile } from "../__mocks__";
import { useTransform } from "../src/hooks/useTransform";
import { saveAs } from "file-saver";

jest.mock("jszip");
jest.mock("jspdf", () => {
  const mockAddImage = jest.fn();
  const mockSave = jest.fn();
  const mockText = jest.fn();
  const mockSplitTextToSize = jest.fn((text) => [text]);

  const jsPDFMock = jest.fn().mockImplementation((options) => {
    return {
      addImage: mockAddImage,
      save: mockSave,
      text: mockText,
      splitTextToSize: mockSplitTextToSize,
      options: options,
    };
  });

  return {
    __esModule: true,
    jsPDF: jsPDFMock,
  };
});


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
  it("should convert image to PDF", async () => {
    const testFile = mockImageFile("test.jpg", "image/jpeg");
    const mockReadAsDataURL = jest.fn();
    const mockFileReader = {
      readAsDataURL: mockReadAsDataURL,
      onload: null as
        | null
        | ((this: FileReader, ev: ProgressEvent<FileReader>) => any),
      result: "data:image/jpeg;base64,mockdata",
    };

    global.FileReader = jest.fn(() => mockFileReader as unknown as FileReader);

    const { result } = renderHook(() =>
      useTransform({
        file: testFile,
        setFile: jest.fn(),
        convertType: "image-to-pdf",
      })
    );

    await act(async () => {
      const convertPromise = result.current.handleConvert();

      if (mockFileReader.onload) {
        mockFileReader.onload.call(
          mockFileReader as unknown as FileReader,
          new ProgressEvent("load")
        );
      }

      await convertPromise;
    });

    expect(jsPDF).toHaveBeenCalledWith({
      orientation: "portrait",
      unit: "px",
      format: [500, 700],
    });
  });
  it("should convert text to PDF", async () => {
    const testFile = mockFile("test.txt", "text/plain", "Hello World");

    const mockReadAsText = jest.fn();
    const mockFileReader = {
      readAsText: mockReadAsText,
      onload: null as FileReader["onload"],
      result: "Hello World",
    };

    global.FileReader = jest.fn(() => mockFileReader as unknown as FileReader);

    const { result } = renderHook(() =>
      useTransform({
        file: testFile,
        setFile: jest.fn(),
        convertType: "text-to-pdf",
      })
    );

    await act(async () => {
      const convertPromise = result.current.handleConvert();
      if (mockFileReader.onload) {
        mockFileReader.onload.call(
          mockFileReader as unknown as FileReader,
          new ProgressEvent("load")
        );
      }

      await convertPromise;
    });

    expect(mockReadAsText).toHaveBeenCalledWith(testFile);
    expect(jsPDF).toHaveBeenCalled();
  });

});
