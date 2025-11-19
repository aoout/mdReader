var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __commonJS = (callback, module2) => () => {
  if (!module2) {
    module2 = {exports: {}};
    callback(module2.exports, module2);
  }
  return module2.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};
var __exportStar = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module2) => {
  return __exportStar(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? {get: () => module2.default, enumerable: true} : {value: module2, enumerable: true})), module2);
};

// node_modules/path-browserify/index.js
var require_path_browserify = __commonJS((exports2, module2) => {
  "use strict";
  function assertPath(path4) {
    if (typeof path4 !== "string") {
      throw new TypeError("Path must be a string. Received " + JSON.stringify(path4));
    }
  }
  function normalizeStringPosix(path4, allowAboveRoot) {
    var res = "";
    var lastSegmentLength = 0;
    var lastSlash = -1;
    var dots = 0;
    var code;
    for (var i = 0; i <= path4.length; ++i) {
      if (i < path4.length)
        code = path4.charCodeAt(i);
      else if (code === 47)
        break;
      else
        code = 47;
      if (code === 47) {
        if (lastSlash === i - 1 || dots === 1) {
        } else if (lastSlash !== i - 1 && dots === 2) {
          if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 || res.charCodeAt(res.length - 2) !== 46) {
            if (res.length > 2) {
              var lastSlashIndex = res.lastIndexOf("/");
              if (lastSlashIndex !== res.length - 1) {
                if (lastSlashIndex === -1) {
                  res = "";
                  lastSegmentLength = 0;
                } else {
                  res = res.slice(0, lastSlashIndex);
                  lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
                }
                lastSlash = i;
                dots = 0;
                continue;
              }
            } else if (res.length === 2 || res.length === 1) {
              res = "";
              lastSegmentLength = 0;
              lastSlash = i;
              dots = 0;
              continue;
            }
          }
          if (allowAboveRoot) {
            if (res.length > 0)
              res += "/..";
            else
              res = "..";
            lastSegmentLength = 2;
          }
        } else {
          if (res.length > 0)
            res += "/" + path4.slice(lastSlash + 1, i);
          else
            res = path4.slice(lastSlash + 1, i);
          lastSegmentLength = i - lastSlash - 1;
        }
        lastSlash = i;
        dots = 0;
      } else if (code === 46 && dots !== -1) {
        ++dots;
      } else {
        dots = -1;
      }
    }
    return res;
  }
  function _format(sep, pathObject) {
    var dir = pathObject.dir || pathObject.root;
    var base = pathObject.base || (pathObject.name || "") + (pathObject.ext || "");
    if (!dir) {
      return base;
    }
    if (dir === pathObject.root) {
      return dir + base;
    }
    return dir + sep + base;
  }
  var posix = {
    resolve: function resolve() {
      var resolvedPath = "";
      var resolvedAbsolute = false;
      var cwd;
      for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
        var path4;
        if (i >= 0)
          path4 = arguments[i];
        else {
          if (cwd === void 0)
            cwd = process.cwd();
          path4 = cwd;
        }
        assertPath(path4);
        if (path4.length === 0) {
          continue;
        }
        resolvedPath = path4 + "/" + resolvedPath;
        resolvedAbsolute = path4.charCodeAt(0) === 47;
      }
      resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);
      if (resolvedAbsolute) {
        if (resolvedPath.length > 0)
          return "/" + resolvedPath;
        else
          return "/";
      } else if (resolvedPath.length > 0) {
        return resolvedPath;
      } else {
        return ".";
      }
    },
    normalize: function normalize(path4) {
      assertPath(path4);
      if (path4.length === 0)
        return ".";
      var isAbsolute = path4.charCodeAt(0) === 47;
      var trailingSeparator = path4.charCodeAt(path4.length - 1) === 47;
      path4 = normalizeStringPosix(path4, !isAbsolute);
      if (path4.length === 0 && !isAbsolute)
        path4 = ".";
      if (path4.length > 0 && trailingSeparator)
        path4 += "/";
      if (isAbsolute)
        return "/" + path4;
      return path4;
    },
    isAbsolute: function isAbsolute(path4) {
      assertPath(path4);
      return path4.length > 0 && path4.charCodeAt(0) === 47;
    },
    join: function join() {
      if (arguments.length === 0)
        return ".";
      var joined;
      for (var i = 0; i < arguments.length; ++i) {
        var arg = arguments[i];
        assertPath(arg);
        if (arg.length > 0) {
          if (joined === void 0)
            joined = arg;
          else
            joined += "/" + arg;
        }
      }
      if (joined === void 0)
        return ".";
      return posix.normalize(joined);
    },
    relative: function relative(from, to) {
      assertPath(from);
      assertPath(to);
      if (from === to)
        return "";
      from = posix.resolve(from);
      to = posix.resolve(to);
      if (from === to)
        return "";
      var fromStart = 1;
      for (; fromStart < from.length; ++fromStart) {
        if (from.charCodeAt(fromStart) !== 47)
          break;
      }
      var fromEnd = from.length;
      var fromLen = fromEnd - fromStart;
      var toStart = 1;
      for (; toStart < to.length; ++toStart) {
        if (to.charCodeAt(toStart) !== 47)
          break;
      }
      var toEnd = to.length;
      var toLen = toEnd - toStart;
      var length = fromLen < toLen ? fromLen : toLen;
      var lastCommonSep = -1;
      var i = 0;
      for (; i <= length; ++i) {
        if (i === length) {
          if (toLen > length) {
            if (to.charCodeAt(toStart + i) === 47) {
              return to.slice(toStart + i + 1);
            } else if (i === 0) {
              return to.slice(toStart + i);
            }
          } else if (fromLen > length) {
            if (from.charCodeAt(fromStart + i) === 47) {
              lastCommonSep = i;
            } else if (i === 0) {
              lastCommonSep = 0;
            }
          }
          break;
        }
        var fromCode = from.charCodeAt(fromStart + i);
        var toCode = to.charCodeAt(toStart + i);
        if (fromCode !== toCode)
          break;
        else if (fromCode === 47)
          lastCommonSep = i;
      }
      var out = "";
      for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
        if (i === fromEnd || from.charCodeAt(i) === 47) {
          if (out.length === 0)
            out += "..";
          else
            out += "/..";
        }
      }
      if (out.length > 0)
        return out + to.slice(toStart + lastCommonSep);
      else {
        toStart += lastCommonSep;
        if (to.charCodeAt(toStart) === 47)
          ++toStart;
        return to.slice(toStart);
      }
    },
    _makeLong: function _makeLong(path4) {
      return path4;
    },
    dirname: function dirname(path4) {
      assertPath(path4);
      if (path4.length === 0)
        return ".";
      var code = path4.charCodeAt(0);
      var hasRoot = code === 47;
      var end = -1;
      var matchedSlash = true;
      for (var i = path4.length - 1; i >= 1; --i) {
        code = path4.charCodeAt(i);
        if (code === 47) {
          if (!matchedSlash) {
            end = i;
            break;
          }
        } else {
          matchedSlash = false;
        }
      }
      if (end === -1)
        return hasRoot ? "/" : ".";
      if (hasRoot && end === 1)
        return "//";
      return path4.slice(0, end);
    },
    basename: function basename(path4, ext) {
      if (ext !== void 0 && typeof ext !== "string")
        throw new TypeError('"ext" argument must be a string');
      assertPath(path4);
      var start = 0;
      var end = -1;
      var matchedSlash = true;
      var i;
      if (ext !== void 0 && ext.length > 0 && ext.length <= path4.length) {
        if (ext.length === path4.length && ext === path4)
          return "";
        var extIdx = ext.length - 1;
        var firstNonSlashEnd = -1;
        for (i = path4.length - 1; i >= 0; --i) {
          var code = path4.charCodeAt(i);
          if (code === 47) {
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else {
            if (firstNonSlashEnd === -1) {
              matchedSlash = false;
              firstNonSlashEnd = i + 1;
            }
            if (extIdx >= 0) {
              if (code === ext.charCodeAt(extIdx)) {
                if (--extIdx === -1) {
                  end = i;
                }
              } else {
                extIdx = -1;
                end = firstNonSlashEnd;
              }
            }
          }
        }
        if (start === end)
          end = firstNonSlashEnd;
        else if (end === -1)
          end = path4.length;
        return path4.slice(start, end);
      } else {
        for (i = path4.length - 1; i >= 0; --i) {
          if (path4.charCodeAt(i) === 47) {
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else if (end === -1) {
            matchedSlash = false;
            end = i + 1;
          }
        }
        if (end === -1)
          return "";
        return path4.slice(start, end);
      }
    },
    extname: function extname(path4) {
      assertPath(path4);
      var startDot = -1;
      var startPart = 0;
      var end = -1;
      var matchedSlash = true;
      var preDotState = 0;
      for (var i = path4.length - 1; i >= 0; --i) {
        var code = path4.charCodeAt(i);
        if (code === 47) {
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
        if (end === -1) {
          matchedSlash = false;
          end = i + 1;
        }
        if (code === 46) {
          if (startDot === -1)
            startDot = i;
          else if (preDotState !== 1)
            preDotState = 1;
        } else if (startDot !== -1) {
          preDotState = -1;
        }
      }
      if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        return "";
      }
      return path4.slice(startDot, end);
    },
    format: function format(pathObject) {
      if (pathObject === null || typeof pathObject !== "object") {
        throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
      }
      return _format("/", pathObject);
    },
    parse: function parse(path4) {
      assertPath(path4);
      var ret = {root: "", dir: "", base: "", ext: "", name: ""};
      if (path4.length === 0)
        return ret;
      var code = path4.charCodeAt(0);
      var isAbsolute = code === 47;
      var start;
      if (isAbsolute) {
        ret.root = "/";
        start = 1;
      } else {
        start = 0;
      }
      var startDot = -1;
      var startPart = 0;
      var end = -1;
      var matchedSlash = true;
      var i = path4.length - 1;
      var preDotState = 0;
      for (; i >= start; --i) {
        code = path4.charCodeAt(i);
        if (code === 47) {
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
        if (end === -1) {
          matchedSlash = false;
          end = i + 1;
        }
        if (code === 46) {
          if (startDot === -1)
            startDot = i;
          else if (preDotState !== 1)
            preDotState = 1;
        } else if (startDot !== -1) {
          preDotState = -1;
        }
      }
      if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        if (end !== -1) {
          if (startPart === 0 && isAbsolute)
            ret.base = ret.name = path4.slice(1, end);
          else
            ret.base = ret.name = path4.slice(startPart, end);
        }
      } else {
        if (startPart === 0 && isAbsolute) {
          ret.name = path4.slice(1, startDot);
          ret.base = path4.slice(1, end);
        } else {
          ret.name = path4.slice(startPart, startDot);
          ret.base = path4.slice(startPart, end);
        }
        ret.ext = path4.slice(startDot, end);
      }
      if (startPart > 0)
        ret.dir = path4.slice(0, startPart - 1);
      else if (isAbsolute)
        ret.dir = "/";
      return ret;
    },
    sep: "/",
    delimiter: ":",
    win32: null,
    posix: null
  };
  posix.posix = posix;
  module2.exports = posix;
});

// src/main.ts
__markAsModule(exports);
__export(exports, {
  default: () => main_default,
  path: () => path3
});
var import_obsidian5 = __toModule(require("obsidian"));

// src/settings/settings.ts
var DEFAULT_SETTINGS = {
  boxTags: ["HighlightBox"],
  boxType: "MOC",
  template: "{{highlight}}",
  popupType: "same as active file mode",
  storage: "highlights",
  autoUpdate: false
};

// src/lib/HighlightBox.ts
var import_obsidian = __toModule(require("obsidian"));

// src/lib/getHighlights.ts
function getHighlights(content, sourcePath) {
  const highlights = [];
  const regex = /==(.+)==/g;
  let match = null;
  while ((match = regex.exec(content)) !== null) {
    highlights.push({
      content: match[1],
      sourcePath
    });
  }
  return highlights;
}

// src/lib/highlightsBuilder.ts
var HighlightsBuilder = class {
  static highlights2map(highlights) {
    const map = new Map();
    highlights.forEach((highlight3) => {
      const {sourcePath, content} = highlight3;
      const title = sourcePath.split("/").splice(-1)[0].split(".md")[0];
      const note = map.get(title);
      if (note) {
        note.push({content, Comment: ""});
      } else {
        map.set(title, [{content, Comment: ""}]);
      }
    });
    return map;
  }
  static map2markdown(map, template) {
    let markdown = "";
    map.forEach((value, key) => {
      markdown += `## ${key}

`;
      value.forEach((item) => {
        markdown += template.replace("{{highlight}}", item.content);
        markdown += "\n";
        if (item.comment) {
          markdown += `@
${item.comment}
`;
        }
        markdown += "\n";
      });
    });
    return markdown;
  }
  static markdown2map(markdown, template) {
    const map = new Map();
    const notes = markdown.split("## ").splice(1);
    notes.forEach((note) => {
      const title = note.split("\n")[0];
      const highlights = note.split("\n\n").splice(1).filter((highlight3) => highlight3);
      const items = [];
      highlights.forEach((highlight3) => {
        const content = highlight3.split("\n")[0].replaceAll(new RegExp(`${template.replaceAll(/[.*+?^${}()|[\]\\]/g, "\\$&").replaceAll(/\\{\\{highlight\\}\\}/g, "(.*)")}`, "g"), "$1");
        const comment = highlight3.split(content).splice(1).join("\n").split("@\n")[1];
        items.push({
          content,
          comment
        });
      });
      map.set(title, items);
    });
    return map;
  }
  static mergeComments(mapOld, mapNew) {
    return new Map(Array.from(mapNew.entries()).map((i) => [
      i[0],
      i[1].map((j) => ({
        content: j.content,
        comment: mapOld.get(i[0])?.find((i2) => i2.content == j.content)?.comment || ""
      }))
    ]));
  }
};

// src/lib/HighlightBox.ts
var path = require_path_browserify().posix;
var HighlightBox = class {
  constructor(app, settings, path4) {
    this.app = app;
    this.settings = settings;
    this.path = path4;
  }
  static type(type) {
    if (type == "MOC")
      return MocBox;
    if (type == "Folder")
      return FolderBox;
    throw new Error("Invalid type");
  }
  static tagCheck(app, path4, boxTags) {
    const tags = app.metadataCache.getCache(path4)?.frontmatter?.tags || [];
    return tags.some((tag) => boxTags.includes(tag));
  }
  async getHighlights() {
    const notes = this.getNotes();
    const highlights = (await Promise.all(notes.map(async (note) => {
      const content = await this.app.vault.read(note);
      return getHighlights(content, note.path);
    }))).flat();
    return highlights;
  }
  getNotes() {
    throw new Error("Method not implemented.");
  }
  getHighlightsNotePath() {
    throw new Error("Method not implemented.");
  }
  async updateHighlightsNote(template) {
    const highlights = await this.getHighlights();
    const map = HighlightsBuilder.highlights2map(highlights);
    const notePath = this.getHighlightsNotePath();
    const noteFile = this.app.vault.getAbstractFileByPath(notePath);
    if (!(noteFile instanceof import_obsidian.TFile)) {
      await this.app.vault.create(notePath, HighlightsBuilder.map2markdown(map, template));
    } else {
      const content = await this.app.vault.read(noteFile);
      const mapOld = HighlightsBuilder.markdown2map(content, template);
      const mapNew = HighlightsBuilder.mergeComments(mapOld, map);
      await this.app.vault.modify(noteFile, HighlightsBuilder.map2markdown(mapNew, template));
    }
  }
  async updateComment(sourcePath, highlight3, comment) {
    const notePath = this.getHighlightsNotePath();
    const noteFile = this.app.vault.getAbstractFileByPath(notePath);
    if (!(noteFile instanceof import_obsidian.TFile))
      return;
    const content = await this.app.vault.read(noteFile);
    const map = HighlightsBuilder.markdown2map(content, this.settings.template);
    const title = sourcePath.split("/").splice(-1)[0].split(".md")[0];
    const note = map.get(title);
    if (note) {
      const item = note.find((item2) => item2.content === highlight3);
      if (item)
        item.comment = comment;
      else
        note.push({content: highlight3, comment});
    } else {
      map.set(title, [{content: highlight3, comment}]);
    }
    await this.app.vault.modify(noteFile, HighlightsBuilder.map2markdown(map, this.settings.template));
  }
};
var MocBox = class extends HighlightBox {
  static findBox(app, path4, settings) {
    const file = app.vault.getAbstractFileByPath(path4);
    if (!file || !(file instanceof import_obsidian.TFile))
      return;
    const backlinks = app.metadataCache.getBacklinksForFile(file);
    const result = Array.from(backlinks.data).find((backlink) => {
      return this.tagCheck(app, backlink[0], settings.boxTags);
    })[0];
    return new MocBox(app, settings, result);
  }
  getNotes() {
    const notes = this.app.metadataCache.getCache(this.path).links.map((link) => {
      const file = this.app.vault.getAbstractFileByPath(link.link + ".md");
      if (!file)
        return;
      return file;
    });
    return notes;
  }
  getHighlightsNotePath() {
    return path.dirname(this.path) + "/" + this.settings.storage + ".md";
  }
};
var FolderBox = class extends HighlightBox {
  static findBox(app, _path, settings) {
    const dir = path.dirname(_path);
    const folderNote = dir + "/" + path.basename(dir) + ".md";
    if (this.tagCheck(app, folderNote, settings.boxTags))
      return new FolderBox(app, settings, folderNote);
    if (dir == ".")
      return;
    return FolderBox.findBox(app, dir, settings);
  }
  getNotes() {
    const dir = path.dirname(this.path);
    const files = this.app.vault.getMarkdownFiles().filter((file) => file.path.split("/").includes(dir));
    return files;
  }
};

// src/HighlighterModal.ts
var import_obsidian2 = __toModule(require("obsidian"));
var HighlighterModal = class extends import_obsidian2.SuggestModal {
  constructor(app, highlights, choosed) {
    super(app);
    this.emptyStateText = "No highlight files found.";
    this.highlighters = highlights;
    this.choosed = choosed;
  }
  getSuggestions(query) {
    return this.highlighters.filter((highlight3) => highlight3.content.includes(query));
  }
  renderSuggestion(item, el) {
    el.createEl("div", {text: item.sourcePath});
    el.createEl("small", {text: item.content});
  }
  onChooseSuggestion(item, _evt) {
    this.choosed(item);
  }
};

// src/settings/settingsTab.ts
var import_obsidian3 = __toModule(require("obsidian"));
var HighlighterSettingsTab = class extends import_obsidian3.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const {containerEl} = this;
    containerEl.empty();
    new import_obsidian3.Setting(containerEl).setName("Tags").setDesc("The tags that will be added to the imported books.").addText((text) => text.setPlaceholder("HighlighterBox").setValue(this.plugin.settings.boxTags.join(", ")).onChange(async (value) => {
      this.plugin.settings.boxTags = value.split(",").map((tag) => tag.trim());
      await this.plugin.saveSettings();
    }));
    new import_obsidian3.Setting(containerEl).setName("HighlighterBox Type").setDesc("The type of the HighlighterBox that will be used.").addDropdown((text) => text.addOptions({
      Folder: "Folder",
      MOC: "MOC"
    }).setValue(this.plugin.settings.boxType).onChange(async (value) => {
      this.plugin.settings.boxType = value;
      await this.plugin.saveSettings();
    }));
    new import_obsidian3.Setting(containerEl).setName("Template").setDesc("Change the way highlights are displayed.").addTextArea((text) => text.setValue(this.plugin.settings.template).onChange(async (value) => {
      this.plugin.settings.template = value;
      await this.plugin.saveSettings();
    }));
    new import_obsidian3.Setting(containerEl).setName("popup type").setDesc("Use different types of popups.").addDropdown((text) => text.addOptions({
      "same as active file mode": "same as active file mode",
      "always Editable": "always Editable",
      "always Readonly": "always Readonly"
    }).setValue(this.plugin.settings.popupType).onChange(async (value) => {
      this.plugin.settings.popupType = value;
      await this.plugin.saveSettings();
    }));
    new import_obsidian3.Setting(containerEl).setName("Highlights Storage").setDesc("The name of the note where the highlights are stored.").addText((text) => text.setPlaceholder("highlights").setValue(this.plugin.settings.storage).onChange(async (value) => {
      this.plugin.settings.storage = value;
      await this.plugin.saveSettings();
    }));
    new import_obsidian3.Setting(containerEl).setName("auto update highlights file").setDesc("Auto update highlights file.").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.autoUpdate).onChange(async (value) => {
        this.plugin.settings.autoUpdate = value;
        await this.plugin.saveSettings();
      });
    });
  }
};

// src/popover.ts
var import_obsidian4 = __toModule(require("obsidian"));
var path2 = require_path_browserify().posix;
var POPOVER_STYLES = {
  container: {
    padding: "6px",
    backgroundColor: "var(--background-primary)",
    borderRadius: "4px"
  },
  textarea: {
    width: "100%",
    minHeight: "60px",
    maxHeight: "120px",
    padding: "6px",
    border: "none",
    resize: "vertical",
    fontFamily: "var(--font-text)",
    backgroundColor: "var(--background-primary)",
    color: "var(--text-normal)"
  },
  readonlyContainer: {
    padding: "6px",
    backgroundColor: "var(--background-primary)",
    borderRadius: "4px"
  },
  readonlyContent: {
    maxHeight: "150px",
    overflowY: "auto",
    color: "var(--text-normal)",
    padding: "4px"
  }
};
var Popover = class {
  constructor(plugin, textGetter) {
    this.plugin = plugin;
    this.textGetter = textGetter;
    this.cursorClientX = 0;
    this.cursorClientY = 0;
    this.saveMousePosition = (event) => {
      this.cursorClientX = event.clientX;
      this.cursorClientY = event.clientY;
    };
    this.onKeyChange = (event) => {
      if (event.key !== "Control")
        return;
      const isKeyDown = event.type === "keydown";
      const highlightEls = [
        ...document.querySelectorAll("[class='cm-highlight']"),
        ...document.querySelectorAll("mark")
      ];
      highlightEls.forEach((el) => {
        this.togglePopoverEvents(el, isKeyDown);
      });
      if (isKeyDown)
        this.triggerMousemoveOnHovered();
    };
    this.init();
  }
  init() {
    this.plugin.registerDomEvent(document, "mousemove", this.saveMousePosition);
    this.plugin.registerDomEvent(document, "keydown", this.onKeyChange);
    this.plugin.registerDomEvent(document, "keyup", this.onKeyChange);
  }
  togglePopoverEvents(el, add) {
    const handlerShow = (e) => this.handlePopoverEvents(e, true);
    const handlerHide = (e) => this.handlePopoverEvents(e, false);
    if (add) {
      el.addEventListener("mouseover", handlerShow);
      el.addEventListener("mousemove", handlerShow);
      el.addEventListener("mouseleave", handlerHide);
    } else {
      el.removeEventListener("mouseover", handlerShow);
      el.removeEventListener("mousemove", handlerShow);
      el.removeEventListener("mouseleave", handlerHide);
    }
  }
  triggerMousemoveOnHovered() {
    const hoveredEls = document.querySelectorAll(":hover");
    const lastHovered = hoveredEls[hoveredEls.length - 1];
    if (!lastHovered)
      return;
    setTimeout(() => {
      lastHovered.dispatchEvent(new MouseEvent("mousemove", {
        bubbles: true,
        cancelable: true,
        ctrlKey: true,
        metaKey: true,
        clientX: this.cursorClientX,
        clientY: this.cursorClientY,
        view: window
      }));
    }, 50);
  }
  async handlePopoverEvents(event, show) {
    const activeView = this.plugin.app.workspace.getActiveViewOfType(import_obsidian4.MarkdownView);
    if (!activeView)
      return;
    const mode = activeView.getMode();
    const {popupType} = this.plugin.settings;
    if (popupType === "always Editable" || mode === "source" && popupType !== "always Readonly") {
      await this.showEditablePopup(event, activeView);
    } else {
      await this.showReadonlyPopup(event, show, activeView);
    }
  }
  async showEditablePopup(event, activeView) {
    if (!(event.ctrlKey || event.metaKey))
      return;
    const el = event.currentTarget;
    const content = el.firstChild?.textContent;
    if (!content)
      return;
    let comment = "";
    comment = await this.plugin.getCommentByContent(content);
    if (comment === "Not any comment yet")
      comment = "";
    const popover = new import_obsidian4.HoverPopover(activeView, el, null);
    const inputContainer = this.createInputContainer();
    const input = this.createTextarea(comment);
    const onEnter = async (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        await this.saveCommentToHighlightFile(content, input.value.trim());
        new import_obsidian4.Notice("Comment saved successfully");
        popover.hoverEl.hide();
      }
    };
    const onEsc = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        popover.hoverEl.hide();
      }
    };
    input.addEventListener("keydown", onEnter);
    input.addEventListener("keydown", onEsc);
    inputContainer.appendChild(input);
    popover.hoverEl.appendChild(inputContainer);
    setTimeout(() => input.focus(), 0);
  }
  createInputContainer() {
    const container = document.createElement("div");
    container.className = "highlighter-popover";
    Object.assign(container.style, POPOVER_STYLES.container);
    return container;
  }
  createTextarea(value) {
    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.placeholder = "\u8F93\u5165...";
    textarea.setAttribute("aria-label", "\u8BC4\u8BBA\u8F93\u5165\u6846");
    Object.assign(textarea.style, POPOVER_STYLES.textarea);
    return textarea;
  }
  async saveCommentToHighlightFile(content, comment) {
    const activeFile = this.plugin.app.workspace.getActiveFile();
    if (!activeFile)
      return;
    const box = HighlightBox.type(this.plugin.settings.boxType).findBox(this.plugin.app, activeFile.path, this.plugin.settings);
    box.updateComment(activeFile.path, content, comment);
  }
  async showReadonlyPopup(event, show, activeView) {
    if (!(event.ctrlKey || event.metaKey))
      return;
    const el = event.currentTarget;
    if (show) {
      const popover = new import_obsidian4.HoverPopover(activeView, el, null);
      const contentText = await this.textGetter(el.firstChild?.textContent || "");
      const container = document.createElement("div");
      container.className = "highlighter-popover";
      Object.assign(container.style, POPOVER_STYLES.readonlyContainer);
      const contentDiv = document.createElement("div");
      contentDiv.className = "markdown-preview-view markdown-rendered";
      Object.assign(contentDiv.style, POPOVER_STYLES.readonlyContent);
      contentDiv.innerHTML = `<p>${contentText}</p>`;
      container.appendChild(contentDiv);
      popover.hoverEl.appendChild(container);
    } else {
      activeView.hoverPopover = null;
    }
  }
};

// src/main.ts
var import_obsidian6 = __toModule(require("obsidian"));
var path3 = require_path_browserify().posix;
var HighlighterPlugin = class extends import_obsidian5.Plugin {
  constructor() {
    super(...arguments);
    this.getCommentByContent = async (content) => {
      const activeFile = this.app.workspace.getActiveFile();
      if (!activeFile)
        return null;
      const box = HighlightBox.type(this.settings.boxType).findBox(this.app, activeFile.path, this.settings);
      if (!box)
        return "It is not in a box";
      const folder = path3.dirname(box.path);
      const highlightsPath = folder + "/" + this.settings.storage + ".md";
      const highlightsFile = this.app.vault.getAbstractFileByPath(highlightsPath);
      const highlightsContent = await this.app.vault.read(highlightsFile);
      const map = HighlightsBuilder.markdown2map(highlightsContent, this.settings.template);
      for (const [_, items] of map.entries()) {
        const foundItem = items.find((item) => item.content === content);
        if (foundItem)
          return foundItem.comment || "Not any comment yet";
      }
      return "Not any comment yet";
    };
  }
  async onload() {
    await this.loadSettings();
    this.addSettingTab(new HighlighterSettingsTab(this.app, this));
    this.addCommand({
      id: "search-highlights-in-current-note",
      name: "Search highlights in current note",
      checkCallback: (checking) => {
        const activeFile = this.app.workspace.getActiveFile();
        if (!activeFile)
          return false;
        if (checking)
          return true;
        this.app.vault.cachedRead(activeFile).then((content) => {
          const highlights = getHighlights(content, activeFile.path);
          new HighlighterModal(this.app, highlights, (highlight3) => {
            this.jumpToHighlight(highlight3);
          }).open();
        });
        return true;
      }
    });
    this.addCommand({
      id: "search-highlights-in-current-HighlightBox",
      name: "Search highlights in current HighlightBox",
      checkCallback: (checking) => {
        const activeFile = this.app.workspace.getActiveFile();
        if (!activeFile)
          return false;
        const box = HighlightBox.type(this.settings.boxType).findBox(this.app, activeFile.path, this.settings);
        if (!box)
          return false;
        if (checking)
          return true;
        box.getHighlights().then((highlights) => {
          new HighlighterModal(this.app, highlights, (highlight3) => {
            this.jumpToHighlight(highlight3);
          }).open();
        });
        return true;
      }
    });
    this.addCommand({
      id: "update-highlights-file",
      name: "Update highlights file",
      checkCallback: (checking) => {
        const activeFile = this.app.workspace.getActiveFile();
        if (!activeFile)
          return false;
        const box = HighlightBox.type(this.settings.boxType).findBox(this.app, activeFile.path, this.settings);
        if (!box)
          return false;
        if (checking)
          return true;
        box.updateHighlightsNote(this.settings.template);
        return true;
      }
    });
    this.addCommand({
      id: "restore-highlights-from-file",
      name: "Restore highlights from .highlight file",
      checkCallback: (checking) => {
        const activeFile = this.app.workspace.getActiveFile();
        if (!activeFile)
          return false;
        const box = HighlightBox.type(this.settings.boxType).findBox(this.app, activeFile.path, this.settings);
        if (!box)
          return false;
        if (checking)
          return true;
        const notes = box.getNotes();
        const folder = path3.dirname(box.path);
        const highlightsPath = folder + "/" + this.settings.storage + ".md";
        this.app.vault.read(this.app.vault.getAbstractFileByPath(highlightsPath)).then((highlightsContent) => {
          const map = HighlightsBuilder.markdown2map(highlightsContent, this.settings.template);
          notes.forEach((note) => {
            this.app.vault.cachedRead(note).then((content) => {
              let updatedContent = content;
              for (const [_, items] of map.entries()) {
                items.forEach((item) => {
                  const regex = new RegExp(item.content, "g");
                  updatedContent = updatedContent.replace(regex, `==${item.content}==`);
                });
              }
              this.app.vault.modify(note, updatedContent);
            });
          });
        });
        return true;
      }
    });
    this.registerEvent(this.app.workspace.on("editor-change", async (editor, info) => {
      if (!this.settings.autoUpdate)
        return;
      const box = HighlightBox.type(this.settings.boxType).findBox(this.app, info.file.path, this.settings);
      if (!box)
        return;
      await info.save();
      this.app.commands.executeCommandById("highlighter:update-highlights-file");
    }));
    if (!import_obsidian6.Platform.isMobileApp) {
      const popover = new Popover(this, this.getCommentByContent);
    }
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
  jumpToHighlight(highlight3) {
    const activeFile = this.app.workspace.getActiveFile();
    if (!activeFile)
      return;
    if (activeFile.path != highlight3.sourcePath) {
      const file = this.app.vault.getAbstractFileByPath(highlight3.sourcePath);
      if (!file || !(file instanceof import_obsidian5.TFile))
        return;
      this.app.workspace.getLeaf().openFile(file).then(() => {
        this.jumpToContent(highlight3.content);
      });
    } else {
      this.jumpToContent(highlight3.content);
    }
  }
  jumpToContent(content) {
    const activeFile = this.app.workspace.getActiveFile();
    if (!activeFile)
      return;
    this.app.vault.cachedRead(activeFile).then((content2) => {
      const editor = this.app.workspace.activeEditor.editor;
      const st = content2.indexOf(content);
      const ed = st + content.length;
      const range = {
        from: editor.offsetToPos(st),
        to: editor.offsetToPos(ed)
      };
      editor.scrollIntoView(range, true);
    });
  }
};
var main_default = HighlighterPlugin;
