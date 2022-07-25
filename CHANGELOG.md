# Change Log

All notable changes to this project will be documented in this file.

## [0.5.3-BETA](https://github.com/kakawait/hugo-tranquilpeak-theme/milestone/27) - 06 oct 2021

- Fix top/bottom bar behavior when scrolling ([#520](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/520))

## [0.5.2-BETA](https://github.com/kakawait/hugo-tranquilpeak-theme/milestone/25) - 08 sep 2021

- Fix gitalk (really does not work on previous version) ([#504](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/504) and [#507](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/507)) (thank you @duval1024)
- Replace Google+ with Linkedin as default in exampleSite ([#489](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/489)) (thank you @stiliajohny)
- Fix i18n files (missing keys or wrong key names) and aria-label translation ([#479](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/479) and [#503](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/503))
- Add Finnish lang ([#500](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/500)) (thank you @ronjakoi)
- Support gallery title with spaces ([#292](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/292))
- Properly handle relative URLs ([#333](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/333)) (thank you @sascha-wolf)
- Fix small visual bug on Firefox ([#322](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/322))
- Remove dom element `<div class="post-actions-wrap>` if `showActions: false` ([#413](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/413))

## [0.5.1-BETA](https://github.com/kakawait/hugo-tranquilpeak-theme/milestone/24) - 27 aug 2021

- Fix fancybox gallery since upgrade to 3.x.x ([#490](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/490))
- Fix `clearReading` options that was only applied to type `posts`. Now apply to any types of `mainSections` ([#492](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/492))
- Fix merriweather font that only load latin subset, missing other subsets like vietnamese. ([#493](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/493))

## [0.5.0-BETA](https://github.com/kakawait/hugo-tranquilpeak-theme/milestone/5) - 14 aug 2021

### Forwords

> Theme activities were pretty low since 2019. I maintain the theme on my free time and in 2019 I became a dad. You may (or not) understand that it was hard for me to find time to maintain the project.
>
> I recently find a great motiviation to re-maintain with more frequent updates and releases!
>Some big changes will comes to try to use latest Hugo's improvements and features.
> The goal is to release the `1.0.0` for the end of this year.

I'd like to thank every existing contributors. And not only people that pushing code.
During that period, I've seen some people trying to help other people on issue! I really appreciate.

If you'd like to start helping you can firstly look on that list of labelled issues [good first issue, ideal for contribution, help wanted](https://github.com/kakawait/hugo-tranquilpeak-theme/issues?q=is%3Aopen+label%3A%22good+first+issue%22%2C%22ideal+for+contribution%22%2C%22help+wanted%22)

---

- Synch from Hexo Tranquilpeak theme 3.1.0 ([#287](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/287))
  - Check https://github.com/LouisBarranqueiro/hexo-theme-tranquilpeak/releases to get more informations
  - Notables changes:
    - Update Font Awesome to v5
    - Accessibility: add `aria-label` HTML attribute to links
    - Close about page when clicking on its background
    - Add Gitalk comment component
- Revamp sidebar translation in order to use `transform3d` which is way more efficiant in term of performance ([#364](https://github.com/kakawait/hugo-tranquilpeak-theme/pull/364))
- De-hardcode main section as recommended in [Hugo documentation](https://gohugo.io/functions/where/#mainsections) ([#444](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/444))
- Create a new shortcode `{{< toc >}}` to replace previous HTML comment `<!-- toc -->` that does not work anymore with latest Hugo's markdown engine ([#395](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/395))
- Update every 3rd party dependencies (except MathJax<sup id="fnr1">[*](#fnt1)</sup>):
  - highlight.js `9.12.0` -> `11.1.0`
  - jQuery `2.2.4` -> `3.6.0`
  - jQuery fancybox `2.1.4` -> `3.5.7`
  - prism `1.8.3` -> `1.24.1`
  - font-awesome `4.7.0` -> `5.15.3`
- Add touch event support for closing sidebar when opened ([#475](https://github.com/kakawait/hugo-tranquilpeak-theme/pull/475))

<b id="fnt1">*</b> I'm not using Math's stuffs at all, so it's hard for me to check no-regression. That why I'm looking for some help by creating a new post that expose Math feature. See issue [#478](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/478). [↩](#fnr1)

### Breaking changes

#### Update Font Awesome to v5

Hugo Tranquilpeak now uses Font Awesome v5. In this new version, Font Awesome has separated web fonts in 3 categories: regular, solid and brands. Because of that, you now have to update your icons in the sidebar configuration and sharing options in the theme configuration to tell Font Awesome in which web fonts your icons are:

- fa: for regular and solid icon
  - fas: for solid icon only
  - far: for regular icon only
- fab: for brand icons

Some icon names have also changed, so if at the end of the process, some icons are not displayed, make sure they still exist here: Font Awesome v5 - icons

Here is an example to help you upgrade to the new version:

**Before (`config.toml`):**

```toml
# ------------
# Sidebar menu
# ------------
[[menu.main]]
  weight = 1
  identifier = "home"
  name = "Home"
  pre = "<i class=\"sidebar-button-icon fa fa-lg fa-home\"></i>"
  url = "/"
[[menu.main]]
  weight = 2
  identifier = "categories"
  name = "Categories"
  pre = "<i class=\"sidebar-button-icon fa fa-lg fa-bookmark\"></i>"
  url = "/categories"
[[menu.main]]
  weight = 3
  identifier = "tags"
  name = "Tags"
  pre = "<i class=\"sidebar-button-icon fa fa-lg fa-tags\"></i>"
  url = "/tags"
[[menu.main]]
  weight = 4
  identifier = "archives"
  name = "Archives"
  pre = "<i class=\"sidebar-button-icon fa fa-lg fa-archive\"></i>"
  url = "/archives"
[[menu.main]]
  weight = 5
  identifier = "about"
  name = "About"
  pre = "<i class=\"sidebar-button-icon fa fa-lg fa-question\"></i>"
  url = "/#about"

[[menu.links]]
  weight = 1
  identifier = "github"
  name = "GitHub"
  pre = "<i class=\"sidebar-button-icon fa fa-lg fa-github\"></i>"
  url = "https://github.com/kakawait"
[[menu.links]]
  weight = 2
  identifier = "stackoverflow"
  name = "Stack Overflow"
  pre = "<i class=\"sidebar-button-icon fa fa-lg fa-stack-overflow\"></i>"
  url = "https://stackoverflow.com/users/636472/kakawait"

[[menu.misc]]
  weight = 1
  identifier = "rss"
  name = "RSS"
  pre = "<i class=\"sidebar-button-icon fa fa-lg fa-rss\"></i>"
  url = "/index.xml"

[params]
  # Sharing options
  # Comment and uncomment to enable or disable sharing options
  # If you wanna add a sharing option, read user documentation :
  # Tranquilpeak configuration > Theme configuration > sharing-options
  [[params.sharingOptions]]
    name = "Facebook"
    icon = "fa-facebook-official"
    url = "https://www.facebook.com/sharer/sharer.php?u=%s"

  [[params.sharingOptions]]
    name = "Twitter"
    icon = "fa-twitter"
    url = "https://twitter.com/intent/tweet?text=%s"

  [[params.sharingOptions]]
    name = "Google+"
    icon = "fa-google-plus"
    url = "https://plus.google.com/share?url=%s"
```

**After (`config.toml`):**

```toml
# ------------
# Sidebar menu
# ------------
[[menu.main]]
  weight = 1
  identifier = "home"
  name = "Home"
  pre = "<i class=\"sidebar-button-icon fas fa-lg fa-home\" aria-hidden=\"true\"></i>"
  url = "/"
[[menu.main]]
  weight = 2
  identifier = "categories"
  name = "Categories"
  pre = "<i class=\"sidebar-button-icon fas fa-lg fa-bookmark\" aria-hidden=\"true\"></i>"
  url = "/categories"
[[menu.main]]
  weight = 3
  identifier = "tags"
  name = "Tags"
  pre = "<i class=\"sidebar-button-icon fas fa-lg fa-tags\" aria-hidden=\"true\"></i>"
  url = "/tags"
[[menu.main]]
  weight = 4
  identifier = "archives"
  name = "Archives"
  pre = "<i class=\"sidebar-button-icon fas fa-lg fa-archive\" aria-hidden=\"true\"></i>"
  url = "/archives"
[[menu.main]]
  weight = 5
  identifier = "about"
  name = "About"
  pre = "<i class=\"sidebar-button-icon fas fa-lg fa-question\" aria-hidden=\"true\"></i>"
  url = "/#about"

[[menu.links]]
  weight = 1
  identifier = "github"
  name = "GitHub"
  pre = "<i class=\"sidebar-button-icon fab fa-lg fa-github\" aria-hidden=\"true\"></i>"
  url = "https://github.com/kakawait"
[[menu.links]]
  weight = 2
  identifier = "stackoverflow"
  name = "Stack Overflow"
  pre = "<i class=\"sidebar-button-icon fab fa-lg fa-stack-overflow\" aria-hidden=\"true\"></i>"
  url = "https://stackoverflow.com/users/636472/kakawait"

[[menu.misc]]
  weight = 1
  identifier = "rss"
  name = "RSS"
  pre = "<i class=\"sidebar-button-icon fas fa-lg fa-rss\" aria-hidden=\"true\"></i>"
  url = "/index.xml"

[params]
  # ---------------
  # Sharing options
  # ---------------
  # Comment and uncomment to enable or disable sharing options
  # If you wanna add a sharing option, read user documentation :
  # Tranquilpeak configuration > Theme configuration > sharing-options
  [[params.sharingOptions]]
    name = "Facebook"
    icon = "fab fa-facebook-square"
    url = "https://www.facebook.com/sharer/sharer.php?u=%s"

  [[params.sharingOptions]]
    name = "Twitter"
    icon = "fab fa-twitter"
    url = "https://twitter.com/intent/tweet?text=%s"

  # Removed Google+ because service was shutdown
```

#### Main section

Until now, Hugo Tranquilpeak was using hardcoded main section `post`. That force you to have the following content structure:

```
content/
  post/
    your-post.md
    other-post.md
```

Since `0.5.0-BETA` Hugo tranquilpeak will now follow official recommendation https://gohugo.io/functions/where/#mainsections.

You can configure your main(s) section(s) from `config.toml`

```toml
[params]
  mainSections = ['posts']
```

but by default

> If the user has not set this config parameter in their site config, it will default to the section with the most pages.

## [0.4.8-BETA](https://github.com/kakawait/hugo-tranquilpeak-theme/milestone/23) - 29 may 2020

- Fix regression from Hugo 0.71 ([#429](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/429))

## [0.4.7-BETA](https://github.com/kakawait/hugo-tranquilpeak-theme/milestone/22) - 15 aug 2019

- Fix regression from Hugo 0.57 ([#371](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/371))

## [0.4.6-BETA](https://github.com/kakawait/hugo-tranquilpeak-theme/milestone/21) - 10 jul 2019

- Fix coverImage url (again) ([#358](https://github.com/kakawait/hugo-tranquilpeak-theme/pull/358))

## [0.4.5-BETA](https://github.com/kakawait/hugo-tranquilpeak-theme/milestone/20) - 03 jul 2019

- Remove algolia search if site config is not enable ([#283](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/283))
- Site config `coverImage` is more consistent with other existing image config, refer to _breaking changes_ ([#327](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/327))
- `param` `coverImage` if relative now based on site base url ([#236](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/236))
- Fix `grunt` build to support newer `node` version ([#315](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/315))
- Fix `hugo` warnings/deprecations ([#340](https://github.com/kakawait/hugo-tranquilpeak-theme/pull/340) & [#349](https://github.com/kakawait/hugo-tranquilpeak-theme/pull/349))
- Add swedish translation ([#345](https://github.com/kakawait/hugo-tranquilpeak-theme/pull/345)) (thank you [flojon](https://github.com/flojon))

### Breaking changes

#### Do not support anymore Hugo version < 0.53!

As `.Hugo` is deprecated, it has been replace by the global function `hugo` which appears in ([version 0.53](https://github.com/gohugoio/hugo/releases/tag/v0.53)).

`coverImage` from `config.toml` now more consistent by do not fix default static folder to `images` (see [#327](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/327) for more details).
`coverImage` from `param` will now always based on base path and not relative to current url, thus

```yml
coverImage: img/a.jpg
```

will the be the same as

```yml
coverImage: /img/a.jpg
```

## [0.4.4-BETA](https://github.com/kakawait/hugo-tranquilpeak-theme/milestone/19) - 09 sep 2018

- Revamp _open sidebar_ behavior to not push the content out of container ([#278](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/278)) (thank you [johnsoncodehk](https://github.com/johnsoncodehk))
- Fix category name when using special char ([#269](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/269))
- Fix param `async` & `defer` from `customJS` ([#289](https://github.com/kakawait/hugo-tranquilpeak-theme/pull/289))
- Add support of `mailto:` in menu link ([#208](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/208))
- Add support of `MathJax` ([#294](https://github.com/kakawait/hugo-tranquilpeak-theme/pull/294))
- And more see milestone page for complete log

## [0.4.3-BETA](https://github.com/kakawait/hugo-tranquilpeak-theme/milestone/18) - 12 nov 2017

- Typo fix from `highligth.js` to correct on `highlight.js` ([#231](https://github.com/kakawait/hugo-tranquilpeak-theme/pull/231)) (thank you [@zacbook](https://github.com/zacbook))
- Russian translation enhancement ([#227](https://github.com/kakawait/hugo-tranquilpeak-theme/pull/227))

### Breaking changes

Since I did an error on `highlight.js` for parameter `syntaxHighlighter`, sorry but you have to change it again for the correct typo

```toml
[params]
  syntaxHighlighter = "highlight.js"
```

## [0.4.2-BETA](https://github.com/kakawait/hugo-tranquilpeak-theme/milestone/17) - 1 nov 2017

- Support [prism.js](http://prismjs.com/) syntax highlighter in addition to _highlight.js_ ([#24](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/24))
- Upgrade external JS dependencies
  - Jquery 2.1.3 to 2.2.4 ([#214](https://github.com/kakawait/hugo-tranquilpeak-theme/pull/214))
  - Fancybox 2.1.4 to 2.1.7 ([#215](https://github.com/kakawait/hugo-tranquilpeak-theme/pull/215))
  - Highlight 9.8.0 to 9.12.0 ([#219](https://github.com/kakawait/hugo-tranquilpeak-theme/pull/219))
- Fix issue where link to every posts is display inside archive ([#203](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/203))
- Fix issue on global property `thumbnailimageposition` which was ignored ([#179](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/179))
- Add global property to allow swapping pagination ([#202](https://github.com/kakawait/hugo-tranquilpeak-theme/pull/202))

### Breaking changes

Since new syntax highlighter prism.js, you have to configure which syntax highlighter you want to use between _highlight.js_ and _prism.js_. **However if you don't configure it, no syntax highligh will be apply** (where previously _highlight.js_ was forced by default).

Please upgrade you're `config.toml` (you can checkout `exampleSite/config.toml` to see sample) to re-add _highlight.js_ as syntax highlighter (except if you don't need it):

```toml
[params]
  # There is a typo on highligth.js (which should be highlight.js instead, please checkout version 0.4.3-BETA to get fix)
  syntaxHighlighter = "highligth.js"
```

## [0.4.1-BETA](https://github.com/kakawait/hugo-tranquilpeak-theme/milestone/16) - 11 sep 2017

- Fix _sharing options_ link generation bug, that break shares ([#196](https://github.com/kakawait/hugo-tranquilpeak-theme/pull/196))

## [0.4.0-BETA](https://github.com/kakawait/hugo-tranquilpeak-theme/milestone/4) - 10 sep 2017

- Fix menu ordering ([#149](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/149), [#150](https://github.com/kakawait/hugo-tranquilpeak-theme/pull/150))
- Synch from Hexo Tranquilpeak theme 1.10 ([#147](https://github.com/kakawait/hugo-tranquilpeak-theme/pull/147), [#132](https://github.com/kakawait/hugo-tranquilpeak-theme/pull/132))
  - Italian translation
  - `showMeta` & `showActions` (see user doc for more details)
  - Extensible _Sharing options_ (see user doc for more details)
  - XLG side bar bug on Edge
  - _OLDER POSTS_ Button Overlaps Sidebar
  - Print media queries
- Load external resources using SRI ([#159](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/159))
- revamp HLjs usage to fix highlighting bugs ([#154](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/154), [#160](https://github.com/kakawait/hugo-tranquilpeak-theme/pull/160))
- Improve `customJS` and `customCSS`
  - Now support both abs and rel url ([#155](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/155))
  - Add more customization than just url ([#163](https://github.com/kakawait/hugo-tranquilpeak-theme/pull/163))
- Add theme version on meta tag ([#140](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/140))

### Breaking changes

In order to fix menu ordering, you have to upgrade you `config.toml` to avoid any menu weight equals to `0`. See https://github.com/kakawait/hugo-tranquilpeak-theme/commit/f4feb3261381bd9a77be4da66d8466322886eb22#diff-991d2a2fe208cdee83955ad6e9a323a7 to get an full example.

With new _Sharing options_ that allow extensible list of sharing options, there is no more hardcoded sharing option inside template. Thus sharing options: Facebook, Twitter and Google plus should be reported inside your `config.toml` (you can checkout `exampleSite/config.toml` to see sample):

```toml
[params]
  [[params.sharingOptions]]
    name = "Facebook"
    icon = "fa-facebook-official"
    url = "https://www.facebook.com/sharer/sharer.php?u=%s"

  [[params.sharingOptions]]
    name = "Twitter"
    icon = "fa-twitter"
    url = "https://twitter.com/intent/tweet?text=%s"

  [[params.sharingOptions]]
    name = "Google+"
    icon = "fa-google-plus"
    url = "https://plus.google.com/share?url=%s"
```

## [0.3.1-BETA](https://github.com/kakawait/hugo-tranquilpeak-theme/milestone/13) - 15 apr 2017

- Fix Merriweather font to support non latin chars ([#129](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/129), [#142](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/142), [#143](https://github.com/kakawait/hugo-tranquilpeak-theme/pull/143))
- Fix `exampleSite/config.toml` about `customCSS` and `customJS` ([#137](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/137), [#141](https://github.com/kakawait/hugo-tranquilpeak-theme/pull/141))
- Add meta tag `theme` that will contain theme version ([#140](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/140), [#144](https://github.com/kakawait/hugo-tranquilpeak-theme/pull/144))

## [0.3.0-BETA](https://github.com/kakawait/hugo-tranquilpeak-theme/milestone/3) - 9 apr 2017

- Update minimun requirement to Hugo 0.20 ([#134](https://github.com/kakawait/hugo-tranquilpeak-theme/pull/134))
- Fix warning from Hugo 0.19 ([#125](https://github.com/kakawait/hugo-tranquilpeak-theme/pull/125)) (thank you [jmugz3](https://github.com/jmugz3))
- Hugo 0.20 fix 404's page for archive ([#111](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/111))

### Breaking changes

Do not support anymore Hugo version < 0.20!

## [0.2.3-ALPHA](https://github.com/kakawait/hugo-tranquilpeak-theme/milestone/12) - 31 mar 2017

- CSS and JS imports customization ([#120](https://github.com/kakawait/hugo-tranquilpeak-theme/pull/120)) (thank you [yamila-moreno](https://github.com/yamila-moreno))

two news settings:

```toml
customCSS = ["css/foo.css"]
customJS = ["js/foo.js"]
```

That allow you to inject your own `CSS` or `JS`

- Fix nav since Hugo 0.18 ([#119](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/119), [#122](https://github.com/kakawait/hugo-tranquilpeak-theme/pull/122))
- Change _Next_ and _Previous_ behavior ([#118](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/118), [#122](https://github.com/kakawait/hugo-tranquilpeak-theme/pull/122))

### Breaking changes

Related to new _Next_ and _Previous_ behavior [#118](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/118), nav is now working like following

Next -> Newer post
Previous -> Older post

## [0.2.2-ALPHA](https://github.com/kakawait/hugo-tranquilpeak-theme/milestone/11) - 14 feb 2017

- Page archetype ([#106](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/106)) (thank you [@ebouchut](https://github.com/ebouchut))
- Improve documentation ([#113](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/113), [#105](https://github.com/kakawait/hugo-tranquilpeak-theme/pull/105)) (thank you [@ebouchut](https://github.com/ebouchut))
- Update brazilian translation ([#101](https://github.com/kakawait/hugo-tranquilpeak-theme/pull/101)) (thank you [@italocegatta](https://github.com/italocegatta))

## [0.2.1-ALPHA](https://github.com/kakawait/hugo-tranquilpeak-theme/milestone/10) - 8 jan 2017

- Easy customization of head and foot via `/layouts/partials/(head|foot)_(start|end).html` ([#80](https://github.com/kakawait/hugo-tranquilpeak-theme/pull/80)) (thank you [@blaubaer](https://github.com/blaubaer))
- New front matters to hide/show pagination, social buttons and tags ([#81](https://github.com/kakawait/hugo-tranquilpeak-theme/pull/81)) (thank you [@blaubaer](https://github.com/blaubaer))
- Sidebar author avatar link modifiable ([#81](https://github.com/kakawait/hugo-tranquilpeak-theme/pull/81)) (thank you [@blaubaer](https://github.com/blaubaer))

```toml
[params.sidebar.profile]
    url = ...
```

- Alert shortcode support markdown content ([#91](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/91))

```
{{< alert info >}}
Praesent diam elit, **interdum** ut [pulvinar](http://foo.bar) placerat, imperdiet at magna.
{{< /alert >}}
```

- Add basic post archetype ([#76](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/76))
- Remove `en.yaml` symlink ([#84](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/84))
- Fix gravatar integration that was broken ([#87](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/87))
- Fix missing css for post meta ([#89](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/89))
- Fix front matters `coverSize` ([#93](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/93))

### Breaking changes

Related to [#84](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/84), language code `en` does not exist anymore.

Replace if relevant

```toml
languageCode = "en"
defaultContentLanguage = "en"
```

to

```toml
languageCode = "en-us"
defaultContentLanguage = "en-us"
```

## [0.2.0-ALPHA](https://github.com/kakawait/hugo-tranquilpeak-theme/milestone/2) - 4 dec 2016

- *De-bundlize* every external scripts/css ([#66](https://github.com/kakawait/hugo-tranquilpeak-theme/pull/66)) for many reasons:
    - To use browser cache
    - To reduce git repo size
    - To easily upgrade dependencies without installing dev env
- First iteration for i18n support ([#9](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/9)), theme currently support following language:
    - `en-us`
    - `fr-fr`
    - `es-es`
    - `ja`
    - `pt-br`
    - `ru`
    - `zh-cn`
    - `zh-tw`
    - `vi` (thank you [@Kiennh](https://github.com/Kiennh))
    - `de-de` (thank you [@Martin1001](https://github.com/Martin1001))
- Allow some customization on *copyright* section ([#48](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/48))

using

```toml
[params.footer]
    copyright = ...
```

like

```toml
[params.footer]
    copyright = "<a href=\"https://github.com/kakawait\">kakawait</a>"
```

- Add fallback to `monospace` when `Menlo` font is not installed ([#68](https://github.com/kakawait/hugo-tranquilpeak-theme/pull/68))
- Update fontawesome to 4.7.0 ([#58](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/58))
- Add horizontal scrolling for scrollblock ([#71](https://github.com/kakawait/hugo-tranquilpeak-theme/pull/71)) (thank you [@jeremywho](https://github.com/jeremywho))
- Fix missing blog post title when using caption ([#65](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/65))
- Fix vertical scrolling page opening on Firefox ([#69](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/69))

### Breaking changes

Replace

```toml
[author]
    gravatar_email = "your@email.com"
    google_plus = "+YourGooglePlus"
```

to

```toml
[author]
    gravatarEmail = "your@email.com"
    googlePlus = "+YourGooglePlus"
```

Replace

```toml
[params]
    clear_reading = ...
    hierarchical_categories = ...
    sidebar_behavior = ...
    cover_image = ...
    image_gallery = ...
    thumbnail_image = ...
    thumbnail_image_position = ...
    auto_thumbnail_image = ...
    fb_admin_ids = ...
    fb_app_id = ...
    category_pagination = ...
    archive_pagination = ...
    tag_pagination = ...
```

to

```toml
[params]
    clearReading = ...
    hierarchicalCategories = ...
    sidebarBehavior = ...
    coverImage = ...
    imageGallery = ...
    thumbnailImage = ...
    thumbnailImagePosition = ...
    autoThumbnailImage = ...
    fbAdminIds = ...
    fbAppId = ...
    categoryPagination = ...
    archivePagination = ...
    tagPagination = ...
```

Replace

```
[params.header.right_link]
```

to

```
[params.header.rightLink]
```

## [0.1.4-ALPHA](https://github.com/kakawait/hugo-tranquilpeak-theme/milestone/9) - 16 nov 2016

- Remove migration scripts ([#45](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/45))

## [0.1.3-ALPHA](https://github.com/kakawait/hugo-tranquilpeak-theme/milestone/8) - 16 nov 2016

- Remove unused npm deps ([#43](https://github.com/kakawait/hugo-tranquilpeak-theme/pull/43))

## [0.1.2-ALPHA](https://github.com/kakawait/hugo-tranquilpeak-theme/milestone/7) - 16 nov 2016

- Fix *archives* pages generation by creating `archive` taxonomy ([#31](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/31))
- Use `slug` instead of `title` for *permalink* urls ([#33](https://github.com/kakawait/hugo-tranquilpeak-theme/pull/33))

### Breaking changes

- [archive page return 404](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/31)

Add

```toml
[taxonomies]
    archive = "archives"
```

## [0.1.1-ALPHA](https://github.com/kakawait/hugo-tranquilpeak-theme/milestone/6) - 13 nov 2016

- Upgrade *Google Analytics* script to do not use anymore `ga.js` which is now deprecated ([#21](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/21))
- **[Breaking changes]** Changes *Google Analytics* config key from `params.google_analytics_id` to official `googleAnalytics` ([#21](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/21))
- Add parameter to choose between sync/async loading of *Google Analytics* `params.ga.async` ([#21](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/21))

### Breaking changes

- [Migrate google analytics](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/21)

Replace

```toml
[params]
    google_analytics_id = "UA-XXX-X"
```

to (top level)

```toml
googleAnalytics = "UA-XXX-X"
```
