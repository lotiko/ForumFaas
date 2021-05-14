// prettier-ignore
const reserverdWords = ["abstract", "arguments", "await", "boolean","break", "byte", "case", "catch","char", "class*", "const", "continue",
  "debugger", "default", "delete", "do","double", "else", "enum", "eval","export", "extends", "false", "final","finally", "float", "for", "function",
  "goto", "if", "implements", "import","in", "instanceof", "int", "interface","let", "long", "native", "new","null", "package", "private", "protected",
  "public", "return", "short", "static","super", "switch", "synchronized", "this","throw", "throws", "transient", "true","try", "typeof", "var", "void",
  "volatile", "while", "with", "yield"];

class Faas {
  constructor(name, args, body) {
    this.name = name;
    this.args = args;
    this.body = body;
    this.fun;
  }
  checkName(name) {
    let ret = { isValid: true, error: [] };
    // must be a string
    if (typeof name !== "string") {
      ret.isValid = false;
      ret.error.push("Type of name must be string");
      // ret.link = "link.doc";
    }
    // can't be a reserverd words
    if (reserverdWords.includes("name")) {
      ret.isValid && (ret.isValid = false);
      ret.error.push("Name can't be a reserverd words see link for details");
      ret.link = "https://www.w3schools.com/js/js_reserved.asp";
    }
    // regex US ASCII charactere and can start with $ or _
    let regex = /^[$A-Z_][0-9A-Z_$]*$/i;
    if (regex.test(name)) {
      return ret;
    } else {
      ret.isValid && (ret.isValid = false);
      ret.error.push(
        "Name can contains only US ASCII characters and can start with letters or $ or _"
      );
      return ret;
      /// voir pour mettre lien doc
      // ret.link = "link.doc";
    }
  }
  checkargs() {}
  checkBody() {}
}
