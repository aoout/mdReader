---
cssclasses:
  - cards
  - cards-book
  - cards-col-4
  - cards-align-bottom
  - cards-cover
---


```dataviewjs
let files = dv.pages(`""`).filter((p) => p.cover);
files.map(
  (p) =>
    (p.cover = p.file.frontmatter.cover.startsWith("http")
      ? `[![|200](${p.cover})](<${p.file.path}>)`
      : `[<img width='200' src='${encodeURI(
          `file:${app.vault.adapter.basePath}/${p.cover}`
        )}'>](<${p.file.path}>)`)
);
dv.table(
  ["封面", "标题"],
  files.map((p) => [p.cover, p.file.name])
);
```


