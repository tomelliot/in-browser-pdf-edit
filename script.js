
document.querySelector("#files").addEventListener("change", function() {
  var file = document.querySelector("#files");
  openPdf(file.files[0]);
});
var pdf;

function openPdf(file) {
  pdf = new PDFAnnotate("pdf-container", file, {
    onPageUpdated(page, oldData, newData) {
      console.log(page, oldData, newData);
    },
    ready() {
      console.log("Plugin initialized successfully");
      enableEditButtons();
    },
    scale: 1.5,
    pageImageCompression: "MEDIUM", // FAST, MEDIUM, SLOW(Helps to control the new PDF file size)
  });
}

function enableEditButtons() {
  $(".btn:not(#openPdf),input").removeClass("disabled")
}

function changeActiveTool(event) {
  var element = $(event.target).hasClass("tool-button") ?
    $(event.target) :
    $(event.target).parents(".tool-button").first();
  $(".tool-button.active").removeClass("active");
  $(element).addClass("active");
}

function enableSelector(event) {
  event.preventDefault();
  changeActiveTool(event);
  pdf.enableSelector();
}

function enablePencil(event) {
  event.preventDefault();
  changeActiveTool(event);
  pdf.enablePencil();
}

function enableAddText(event) {
  event.preventDefault();
  changeActiveTool(event);
  pdf.enableAddText();
}

function deleteSelectedObject(event) {
  event.preventDefault();
  pdf.deleteSelectedObject();
}

function savePDF() {
  pdf.savePdf("sample.pdf"); // save with given file name
}

function clearPage() {
  pdf.clearActivePage();
}

$(function() {
  $("#size-picker").change(function() {
    var width = $(this).val();
    pdf.setBrushSize(width);
    var font_size = $(this).val();
    pdf.setFontSize(font_size);
  });
});
