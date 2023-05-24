package form

type errors map[string][]string

func (e errors) Add(key, m string) {
	e[key] = append(e[key], m)
}

func (e errors) Get(key string) string {
	s := e[key]
	if len(s) == 0 {
		return ""
	}
	return s[0]
}
