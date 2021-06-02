ClassicEditor.create(document.querySelector("#editor"), {
  toolbar: {
    items: [
      "heading",
      "|",
      "codeBlock",
      "code",
      "|",
      "bold",
      "italic",
      "link",
      "bulletedList",
      "numberedList",
      "|",
      "outdent",
      "indent",
      "|",
      "imageUpload",
      "blockQuote",
      "insertTable",
      "mediaEmbed",
    ],
  },
  language: "fr",
  image: {
    toolbar: ["imageTextAlternative", "imageStyle:full", "imageStyle:side"],
  },
  table: {
    contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
  },
  licenseKey: "",

  codeBlock: {
    languages: [
      { language: "css", label: "CSS" },
      { language: "html", label: "HTML" },
      { language: "javascript", label: "JavaScript" },
    ],
  },
})
  .then((editor) => {
    window.editor = editor;
  })
  .catch((error) => {
    console.error("Oops, something went wrong!");
    console.error(
      "Please, report the following error on https://github.com/ckeditor/ckeditor5/issues with the build id and the error stack trace:"
    );
    console.warn("Build id: n8xfr8lm8yp5-w0dac461805w");
    console.error(error);
  });
