package main

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

type Message struct {
	Id          string                 `json:"id"`
	Content     map[string]interface{} `json:"content"`
	Edit        string                 `json:"edit"`
	Position    int                    `json:"position"`
	ContentType string                 `json:"type"`
}

var clients = make(map[*websocket.Conn]bool)
var messages = make(chan []Message)
var upgrader = websocket.Upgrader{}

func main() {

	clientFs := http.FileServer(http.Dir("../build"))

	http.Handle("/", clientFs)
	http.HandleFunc("/ws", handleConnections)
	go handleMessages()
	log.Println("http server started on :8000")
	err := http.ListenAndServe(":8000", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}

func handleConnections(responseWriter http.ResponseWriter, request *http.Request) {
	conn, err := upgrader.Upgrade(responseWriter, request, nil)
	defer conn.Close()
	if err != nil {
		log.Fatal(err)
	}
	clients[conn] = true

	for {

		var msg []Message
		log.Printf("body: %v", request)
		err := conn.ReadJSON(&msg)
		log.Printf("error: %v", msg)
		if err != nil {
			log.Printf("error: %v", err)
			delete(clients, conn)
			break
		}
		messages <- msg
	}
}

func handleMessages() {
	for {
		msg := <-messages

		for client := range clients {
			err := client.WriteJSON(msg)
			if err != nil {
				log.Printf("error: %v", err)
				client.Close()
				delete(clients, client)
			}
		}
	}
}
