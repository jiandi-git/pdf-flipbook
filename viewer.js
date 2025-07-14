{\rtf1\ansi\ansicpg1252\cocoartf2821
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 pdfjsLib.GlobalWorkerOptions.workerSrc = 'libs/pdf.worker.js';\
\
const url = 'pdf/your.pdf';\
const container = document.getElementById('pdf-flipbook');\
\
pdfjsLib.getDocument(url).promise.then(async pdf => \{\
  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) \{\
    const page = await pdf.getPage(pageNum);\
    const viewport = page.getViewport(\{ scale: 1.5 \});\
\
    // Slide container\
    const slide = document.createElement('div');\
    slide.className = 'swiper-slide';\
\
    const pageContainer = document.createElement('div');\
    pageContainer.className = 'page-container';\
    pageContainer.style.width = viewport.widthpx;\
    pageContainer.style.height = \{viewport.height\}px;\
\
    // Canvas\
    const canvas = document.createElement('canvas');\
    canvas.className = 'canvas-layer';\
    canvas.width = viewport.width;\
    canvas.height = viewport.height;\
\
    const ctx = canvas.getContext('2d');\
    await page.render(\{ canvasContext: ctx, viewport \}).promise;\
\
    // Text layer\
    const textLayerDiv = document.createElement('div');\
    textLayerDiv.className = 'text-layer';\
    textLayerDiv.style.width = viewport.widthpx;\
    textLayerDiv.style.height = \{viewport.height\}px;\
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0
\cf0     const textContent = await page.getTextContent();\
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0
\cf0     pdfjsLib.renderTextLayer(\{\
      textContent,\
      container: textLayerDiv,\
      viewport,\
      textDivs: [],\
    \});\
\
    pageContainer.appendChild(canvas);\
    pageContainer.appendChild(textLayerDiv);\
    slide.appendChild(pageContainer);\
    container.appendChild(slide);\
  \}\
\
  new Swiper('.swiper-container', \{\
    direction: 'horizontal',\
    slidesPerView: 1,\
    spaceBetween: 0,\
    allowTouchMove: true,\
    mousewheel: true,\
    keyboard: true,\
  \});\
\});}