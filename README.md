# Resizable Editor Sidebars

This is a WordPress plugin for resizing the sidebars in the Block Editor/Gutenberg.

After activation, both sidebars in the Block Editor should be resizable. The current width of the sidebar gets saved to local storage. Therefore, if you open a different post or page, the sidebars should retain their previously set widths. 

## Installation

You can install this plugin in multiple ways:

1. Use [Git Updater](https://git-updater.com/), this should give you automatic updates as well.
2. Download  either a tag or the stable branch as a zip file from GitHub and upload it to your site. This won't show or install updates for this plugin and you have to manually keep track.
3. Install via Composer by adding this repo to your composer.json

```json
{
  "repositories": [
    {
      "type": "vcs",
      "url": "https://github.com/alpipego/resizable-editor-sidebars"
    }
  ],
  "require": {
    "alpipego/resizable-editor-sidebars": "^1.0.0"
  }
}
```

## Attribution

This is a fork of https://wordpress.org/plugins/resizable-editor-sidebar/. Props to [aaronj1998](https://profiles.wordpress.org/aaronj1998/) and [@davros20](https://profiles.wordpress.org/davros20/) for their initial work.
