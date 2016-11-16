# Migrations

## 0.1.1-ALPHA to 0.1.2-ALPHA

### References

- [archive page return 404](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/31)

### Using migration script

```bash
./0_1_1_to_0_1_2 /path/to/config.toml
```

Should works with `.toml`, `.yml` and `.json`

### Manually

Add

```toml
[taxonomies]
	archive = "archives"
```

## 0.1.0-ALPHA to 0.1.1-ALPHA

### References

- [Migrate google analytics](https://github.com/kakawait/hugo-tranquilpeak-theme/issues/21)

### Using migration script

```bash
./0_1_0_to_0_1_1 /path/to/config.toml
```

Should works with `.toml`, `.yml` and `.json`

### Manually

Replace

```toml
[params]
	google_analytics_id = "UA-XXX-X"
```

to (top level)

```toml
googleAnalytics = "UA-XXX-X"
```