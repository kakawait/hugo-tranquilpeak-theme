# Migrations

## 0.1.1-ALPHA to 0.1.2-ALPHA

### References

- [archive page return 404](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/31)

### Procedure

Add

```toml
[taxonomies]
	archive = "archives"
```

## 0.1.0-ALPHA to 0.1.1-ALPHA

### References

- [Migrate google analytics](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/21)

### Procedure

Replace

```toml
[params]
	google_analytics_id = "UA-XXX-X"
```

to (top level)

```toml
googleAnalytics = "UA-XXX-X"
```