package main

import (
    "os"
    "fmt"
    "io/ioutil"
    "github.com/mickep76/iodatafmt"
)

func main() {
    if len(os.Args) < 2 {
        fmt.Print("Missing first parameter: file config.{toml,json,yml} path")
        os.Exit(1)
    }
    path := os.Args[1]
    if _, err := os.Stat(path); os.IsNotExist(err) {
        panic(fmt.Errorf("Unable to find config file using path \"%s\", %s", path, err))
    }
    f, err := iodatafmt.FileFormat(path)
    if err != nil {
        panic(fmt.Errorf("Unable to determine format of given config file \"%s\", %s", path, err))
    }
    d, err := iodatafmt.Load(path, f)
    if err != nil {
        panic(fmt.Errorf("Unable to read config from given file \"%s\", %s", path, err))
    }
    if val, ok := d.(map[string]interface {})["googleAnalytics"]; ok {
        fmt.Printf("googleAnalytics value already exists with: \"%s\"! No migration applied", val)
        os.Exit(0)
    }
    if _, ok := d.(map[string]interface {})["params"]; ok {
        if val, ok := d.(map[string]interface {})["params"].(map[string]interface {})["google_analytics_id"]; ok {
            fmt.Printf("Migrate\n=======\n\n[params]\n\tgoogle_analytics_id = %s\n\nto\n\ngoogleAnalytics = %s\n\n", val, val)
            d.(map[string]interface {})["googleAnalytics"] = val
            delete(d.(map[string]interface {})["params"].(map[string]interface {}), "google_analytics_id")
        }
    }
    m, err := iodatafmt.Marshal(d, f)
    if err != nil {
        panic(fmt.Errorf("Unable to marshal config, %s", err))
    }
    ioutil.WriteFile(path + ".new", m, 0644)
    fmt.Printf("New configuration has been generated on %s", path + ".new")
}
