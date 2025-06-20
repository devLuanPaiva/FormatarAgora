export function mockFile(name: string, type: string, content: string): File {
    const blob = new Blob([content], { type });
    return new File([blob], name, { type });
}
export function mockImageFile(name: string, type: string): File {
    const blob = new Blob(["fake image data"], { type });
    return new File([blob], name, { type });
}