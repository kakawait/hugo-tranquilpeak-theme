# Change Log

All notable changes to this project will be documented in this file.

## [0.1.4-ALPHA](https://github.com/kakawait/hugo-tranquilpeak-theme/milestone/9) - 16 nov 2016

- Remove migration scripts ([#45](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/45))

## [0.1.3-ALPHA](https://github.com/kakawait/hugo-tranquilpeak-theme/milestone/8) - 16 nov 2016

- Remove unused npm deps ([#43](https://github.com/kakawait/hugo-tranquilpeak-theme/pull/43))

## [0.1.2-ALPHA](https://github.com/kakawait/hugo-tranquilpeak-theme/milestone/7) - 16 nov 2016

- Fix *archives* pages generation by creating `archive` taxonomy ([#31](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/31))
- Use `slug` instead of `title` for *permalink* urls ([#33](https://github.com/kakawait/hugo-tranquilpeak-theme/pull/33))

### Migration

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

### Migration

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