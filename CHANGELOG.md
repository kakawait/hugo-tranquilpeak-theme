# Change Log

All notable changes to this project will be documented in this file.

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