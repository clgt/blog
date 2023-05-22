package http

import (
	"log"
	"net/http"
)

// err nhưng vẫn 200 :))
func handleError(w http.ResponseWriter, r *http.Request, err error) {
	log.Println(err)
	http.Error(w, err.Error(), 200)
}
