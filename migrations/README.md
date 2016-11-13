# Migrations

## 0.1.0-ALPHA to 0.1.1-ALPHA

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