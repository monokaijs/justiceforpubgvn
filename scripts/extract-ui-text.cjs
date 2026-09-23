const ts = require("typescript");
const fs = require("fs");
const paths = [
  "components/timeline-experience.tsx", "components/interior-header.tsx",
  "app/sources/page.tsx", "app/legal/page.tsx", "app/players/page.tsx",
  "app/players/[slug]/page.tsx", "data/timeline.ts", "data/players.ts",
];
const strings = new Set();
for (const path of paths) {
  const source = ts.createSourceFile(path, fs.readFileSync(path, "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const add = (node) => { if (node && ts.isStringLiteralLike(node)) strings.add(node.text); };
  const visit = (node) => {
    if (ts.isPropertyAssignment(node)) {
      const key = node.name.getText(source);
      if (key === "en" || key === "titleEn" || key === "noteEn") {
        if (ts.isStringLiteralLike(node.initializer)) add(node.initializer);
        else if (ts.isObjectLiteralExpression(node.initializer) || ts.isArrayLiteralExpression(node.initializer)) {
          const collect = (child) => { if (ts.isStringLiteralLike(child)) add(child); else ts.forEachChild(child, collect); };
          collect(node.initializer);
        }
      }
    }
    if (ts.isJsxAttribute(node) && node.name.text === "en") add(node.initializer);
    if (ts.isConditionalExpression(node) && /language\s*===\s*["']vi["']|\bisVi\b/.test(node.condition.getText(source))) add(node.whenFalse);
    ts.forEachChild(node, visit);
  };
  visit(source);
}
process.stdout.write(JSON.stringify([...strings].filter((value) => value.trim() && !/^(https?:|\/|#[a-z]|[0-9]+$)/.test(value)), null, 2));
