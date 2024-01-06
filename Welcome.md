欢迎来到我的示例库。

本示例库用于展示我开发的插件[obsidian-epub-importer](https://github.com/aoout/obsidian-epub-importer)和[obsidian-highlighter](https://github.com/aoout/obsidian-highlighter)的功能。目前，后者还暂时不建议脱离于前者单独使用，但前者对后者基本上没有要求。

---

# Epub importer

像是该库根目录下的三个文件夹，代表了三本书。

```dataview
table title,author,publisher from #book
```

你也可以键入`Projects: 打开项目`命令，进入如下界面。

![[Projects Screenshot.png]]
# Highlighter

在设置中，将tag调整为与`epub importer`一致，并且确保`HighlighterBox Type`为`MOC`。这将确保`highlighter`可以与`epub importer`正常互动。

点击这个链接：[[如果你吃了这块饼干，恐怖分子就赢了]]，然后在其笔记内键入`Highlighter: Search highlights in current HighlightBox`命令，即可看到该本书籍内的所有高亮。如果使用`enter`确认，可以跳转到相应的位置。

