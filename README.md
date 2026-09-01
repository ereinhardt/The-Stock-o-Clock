# The-Stock-o-Clock (v.1.2-9-2026)

"The Stock o' Clock" displays a new stock photo every minute, 24/7, with a clock synchronised to the current time.

by Erik Anton Reinhardt.<br>
[MIT License]

---

**Pre-Setup:**

1. PHP v.8.X or higher (Recommended).
2. At least one image for each minute must be stored in the `assets` folder in JPG format. File names can contain an ID after a double underscore:

```bash
00_00__472099273.jpg
12_15__123456789.jpg
23_59.jpg
```

If multiple files have the same time code, one is selected randomly.

## Start

Upload everything combined to your Webserver.
