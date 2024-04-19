欢迎来到我的示例库。

本示例库用于展示我开发的插件[obsidian-epub-importer](https://github.com/aoout/obsidian-epub-importer)和[obsidian-highlighter](https://github.com/aoout/obsidian-highlighter)的功能。目前，后者还暂时不建议脱离于前者单独使用，但前者对后者基本上没有要求。

---
# Epub importer

像是该库根目录下的三个文件夹，代表了三本书。

```dataview
table title,author,publisher from #book
```

在[[SHELF]]笔记内，你可以以更直观的方式浏览你所有的书籍，通过点击封面图片，你就可以进入对应的书籍页面，就像这样：

![[SHELF]]

# Highlighter

在设置中，将tag调整为与`epub importer`一致，并且确保`HighlighterBox Type`为`MOC`。这将确保`highlighter`可以与`epub importer`正常互动。

点击这个链接：[[如果你吃了这块饼干，恐怖分子就赢了]]，然后在其笔记内键入`Highlighter: Search highlights in current HighlightBox`命令，即可看到该本书籍内的所有高亮。如果使用`enter`确认，可以跳转到相应的位置，就像这样：

![[screenshot.png]]

通过`Highlighter: Update highlights file`命令，你可以更新该书籍对应的整理了所有高亮的导出文件，就像这样：


![[highlights]]