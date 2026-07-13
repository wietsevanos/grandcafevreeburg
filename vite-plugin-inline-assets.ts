import { promises as fs } from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";

const CDN_BASE = "https://bloemendaal-cafe-craft.lovable.app";

async function walk(dir: string): Promise<string[]> {
  const out: string[] = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (e.isFile() && p.endsWith(".asset.json")) out.push(p);
  }
  return out;
}

export function inlineAssets(): Plugin {
  return {
    name: "inline-lovable-assets",
    apply: "build",
    async closeBundle() {
      const outDir = path.resolve("dist");
      const srcDir = path.resolve("src");
      const files = await walk(srcDir);
      for (const f of files) {
        try {
          const meta = JSON.parse(await fs.readFile(f, "utf8"));
          if (!meta.url || !meta.asset_id) continue;
          const dest = path.join(outDir, meta.url);
          await fs.mkdir(path.dirname(dest), { recursive: true });
          try {
            await fs.access(dest);
            continue;
          } catch {}
          const res = await fetch(CDN_BASE + meta.url);
          if (!res.ok) {
            console.warn(`[inline-assets] failed ${meta.url}: ${res.status}`);
            continue;
          }
          const buf = Buffer.from(await res.arrayBuffer());
          await fs.writeFile(dest, buf);
          console.log(`[inline-assets] ${meta.url} (${buf.length} bytes)`);
        } catch (err) {
          console.warn(`[inline-assets] error on ${f}:`, err);
        }
      }
    },
  };
}
