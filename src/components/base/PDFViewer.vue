<script lang="ts" setup>
import type { Ref } from 'vue'
import type { PDFDoc, PDFJsLib, PDFRenderCtx } from '~/types/pdfjs'

const props = defineProps<{ url: string }>()

const wrapper = ref()

const loadScript = (url: string) => {
  const script = document.createElement('script')
  script.src = url
  return new Promise((resolve) => {
    script.onload = resolve
    document.head.append(script)
  })
}
const doc = ref() as Ref<PDFDoc>
const scale = 3

const renderPage = (page: number, lastPage: number) => {
  if (lastPage < page)
    return
  // Get page
  doc.value.getPage(page).then((docPage) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    wrapper.value.append(canvas)
    const viewport = docPage.getViewport({ scale })
    canvas.height = viewport.height
    canvas.width = viewport.width
    canvas.style.width = '100%'

    const renderCtx: PDFRenderCtx = {
      canvasContext: ctx,
      viewport,
    }

    docPage.render(renderCtx)
    renderPage(page + 1, lastPage)
  })
}

const previewDocument = (documentUrl: string) => {
  (window as { pdfjsLib: PDFJsLib }).pdfjsLib.getDocument(documentUrl).promise.then((pdfDoc) => {
    doc.value = markRaw(pdfDoc)

    renderPage(1, pdfDoc.numPages)
  })
}

const initDocument = () => {
  const pdfLibUrl = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js'
  if (!document.querySelector(`script[src="${pdfLibUrl}"]`)) {
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js').then(() => {
      previewDocument(props.url)
    })
  }
  else {
    previewDocument(props.url)
  }
}

onMounted(initDocument)
</script>

<template>
  <div ref="wrapper" />
</template>
