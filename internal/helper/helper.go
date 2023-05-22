package helper

// Contains return true if `s“ in `list`
func Contains(s string, list []string) bool {
	for _, v := range list {
		if v == s {
			return true
		}
	}
	return false
}
