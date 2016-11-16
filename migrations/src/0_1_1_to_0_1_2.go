package main

import (
    "os"
    "fmt"
    "github.com/mickep76/iodatafmt"
    "io/ioutil"
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
    if _, ok := d.(map[string]interface {})["taxonomies"]; ok {
        if _, ok := d.(map[string]interface{})["taxonomies"].(map[string]interface{})["archives"]; ok {
            fmt.Print("archives taxonomies already exists! No migration applied")
            os.Exit(0)
        }
        fmt.Print("Migrate\n=======\n\n[taxonomies]\n\tarchive = \"archives\"\n\naddded\n\n")
        d.(map[string]interface {})["taxonomies"].(map[string]interface{})["archives"] = "archive"
    }
    m, err := iodatafmt.Marshal(d, f)
    if err != nil {
        panic(fmt.Errorf("Unable to marshal config, %s", err))
    }
    ioutil.WriteFile(path + ".new", m, 0644)
    fmt.Printf("New configuration has been generated on %s", path + ".new")
}
