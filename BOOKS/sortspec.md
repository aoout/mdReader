---
sorting-spec: |-
  target-folder: /*
  < a-z by-metadata: created_time
---
The chapter names of many books do not contain numbers or serial numbers, so when importing .epub as book, the order of the files is likely to be messy.

# Perfect solution

If you want the directory structure in Obsidian vault to be exactly the same as that in .epub book, or you just don’t like to see redundant prefixes, you can try the [obsidian-custom-sort](https://github.com/SebastianMC/obsidian-custom-sort) plugin . **It can do these things**.

Set the `notePropertysTemplate` setting for epub importer to `created_time: {{created_time}}`, and download the `custom-sort` plugin, then create a new note named `sort-spec` in the root directory of the folder you use to save the books, and enter the content:

```
---
sorting-spec: |-
  target-folder: /*
  < a-z by-metadata: created_time
---
```

Then right-click the folder and select `Then right-click the folder and select`. And **Everything is in order, exactly the same as in the .epub book**.

>[!waring]
>Its property name is not necessarily created_time, but be aware that if you have already used the same property name, it may also be affected by this collation.

