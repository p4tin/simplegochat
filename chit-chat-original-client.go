package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
)

// Client gets messages from server
func Client() {
	for {
    // long polling is initiated
		response, err := http.Get("http://localhost:9000/chat")  
		defer response.Body.Close()
		if err != nil {
			fmt.Println(err.Error())
		}

		bs, err := ioutil.ReadAll(response.Body)
		if string(bs) != "" {
			tr := string(bs)
			// print to terminal
			fmt.Println(tr)
		}
	}
}

func main() {
	Client()
}

