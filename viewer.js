pdfjsLib.GlobalWorkerOptions.workerSrc = 'libs/pdf.worker.min.js';

const url = 'pdf/your.pdf';
const container = document.getElementById('pdf-flipbook');

pdfjsLib.getDocument(url).promise.then(async function (pdf) {
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 1.5 });

    const slide = document.createElement('div');
    slide.className = 'swiper-slide';

    const pageContainer = document.createElement('div');
    pageContainer.className = 'page-container';
    pageContainer.style.width = viewport.widthpx;
    pageContainer.style.height = {viewport.height}px;

    const canvas = document.createElement('canvas');
    canvas.className = 'canvas-layer';
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const ctx = canvas.getContext('2d');
    await page.render({ canvasContext: ctx, viewport: viewport }).promise;

    const textLayerDiv = document.createElement('div');
    textLayerDiv.className = 'text-layer';
    textLayerDiv.style.width = viewport.widthpx;
    textLayerDiv.style.height = {viewport.height}px;

    const textContent = await page.getTextContent();
    pdfjsLib.renderTextLayer({
      textContent: textContent,
      container: textLayerDiv,
      viewport: viewport,
      textDivs: [],
    });

    pageContainer.appendChild(canvas);
    pageContainer.appendChild(textLayerDiv);
    slide.appendChild(pageContainer);
    container.appendChild(slide);
  }

  new Swiper('.swiper-container', {
    direction: 'horizontal',
    slidesPerView: 1,
    spaceBetween: 0,
    allowTouchMove: true,
    mousewheel: true,
    keyboard: true,
  });
});
