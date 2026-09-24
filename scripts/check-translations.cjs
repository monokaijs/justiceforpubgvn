const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");

const root = path.resolve(__dirname, "..");
const sourceDirs = ["app", "components", "data", "lib"];
const excluded = new Set(["data/ui-translations.ts", "data/zh-translations.ts"]);
const sourceKeys = new Set();

function filesIn(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(directory, entry.name);
    return entry.isDirectory() ? filesIn(full) : /\.tsx?$/.test(entry.name) ? [full] : [];
  });
}

function collectStrings(node) {
  if (ts.isStringLiteralLike(node)) {
    sourceKeys.add(node.text);
  } else {
    ts.forEachChild(node, collectStrings);
  }
}

for (const file of sourceDirs.flatMap((directory) => filesIn(path.join(root, directory)))) {
  const relative = path.relative(root, file);
  if (excluded.has(relative) || relative === "lib/language.ts") continue;
  const source = ts.createSourceFile(file, fs.readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true, file.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  function visit(node) {
    if (ts.isPropertyAssignment(node) && node.name.getText(source) === "en") collectStrings(node.initializer);
    if (ts.isCallExpression(node) && node.expression.getText(source) === "loc" && ts.isStringLiteralLike(node.arguments[2])) {
      sourceKeys.add(node.arguments[2].text);
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
}

sourceKeys.delete("en-US");
sourceKeys.delete("en_US");

const uiFile = path.join(root, "data/ui-translations.ts");
const uiSource = ts.createSourceFile(uiFile, fs.readFileSync(uiFile, "utf8"), ts.ScriptTarget.Latest, true);
let baseKeys = [];
function visitUi(node) {
  if (ts.isVariableDeclaration(node) && node.name.getText(uiSource) === "entries") {
    baseKeys = node.initializer.elements.map((entry) => entry.elements[0].text);
  }
  ts.forEachChild(node, visitUi);
}
visitUi(uiSource);

const allKeys = [...new Set([...baseKeys, ...sourceKeys])];
const base = new Set(baseKeys);
const extra = allKeys.filter((key) => !base.has(key));
if (process.argv.includes("--dump")) {
  process.stdout.write(JSON.stringify({ baseKeys, extra, allKeys }, null, 2) + "\n", () => process.exit(0));
} else {
  checkTranslations();
}

function checkTranslations() {
  const locales = ["ja", "de", "ms", "fil", "ru"];
  const errors = [];
  for (const locale of locales) {
    const translations = JSON.parse(fs.readFileSync(path.join(root, `data/${locale}-translations.json`), "utf8"));
    for (const key of allKeys) {
      if (typeof translations[key] !== "string" || !translations[key].trim()) errors.push(`${locale}: ${key}`);
      for (const token of ["↗", "↓", "←", "§", "SHA-256", "2024", "2025", "2026", "PUBG", "KRAFTON"]) {
        if (key.includes(token) && !translations[key]?.includes(token)) errors.push(`${locale}: lost ${token} in ${key}`);
      }
    }
  }
  const supplemental = JSON.parse(fs.readFileSync(path.join(root, "data/supplemental-translations.json"), "utf8"));
  for (const key of extra) {
    for (const locale of ["th", "ko", "zh"]) {
      if (typeof supplemental[key]?.[locale] !== "string" || !supplemental[key][locale].trim()) errors.push(`${locale}: ${key}`);
    }
  }
  if (baseKeys.length !== new Set(baseKeys).size) errors.push("Duplicate English keys in ui-translations.ts");
  if (errors.length) {
    console.error(`Missing translations (${errors.length}):\n${errors.join("\n")}`);
    process.exitCode = 1;
  } else {
    console.log(`Checked ${allKeys.length} keys across ${locales.length + 3} translated locales.`);
  }
}
