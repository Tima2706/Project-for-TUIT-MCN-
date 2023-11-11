export interface PDFViewport {
  width: number
  height: number
}

export interface PDFRenderCtx { canvasContext: CanvasRenderingContext2D; viewport: PDFViewport }
export interface PDFDocPage {
  getViewport: (options: { scale: number }) => PDFViewport
  render: (options: PDFRenderCtx) => ({
    promise: Promise<void>
  })
}
export interface PDFDoc {
  numPages: number
  getPage: (page: number) => Promise<PDFDocPage>
}

export interface PDFJsLib {
  getDocument: (docUrl: string) => {
    promise: Promise<PDFDoc>
  }
}
