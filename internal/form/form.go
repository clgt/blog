package form

import (
	"fmt"
	"net/url"
	"regexp"
	"strconv"
	"strings"
	"time"
	"unicode/utf8"
)

var Email = regexp.MustCompile("^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")
var AlphaNumeric = regexp.MustCompile("^[a-zA-Z0-9_]*$")

type Form struct {
	url.Values
	Errors errors
}

func New(data url.Values) *Form {
	if data == nil {
		data = url.Values{}
	}
	return &Form{
		data,
		errors(map[string][]string{}),
	}
}

func (f *Form) Required(fields ...string) {
	for _, field := range fields {
		value := f.Get(field)
		if strings.TrimSpace(value) == "" {
			f.Errors.Add(field, fmt.Sprintf("%s could not be blank", field))
		}
	}
}

func (f *Form) MinLen(field string, d int) {
	value := f.Get(field)
	if utf8.RuneCountInString(value) < d {
		f.Errors.Add(field, fmt.Sprintf("%s is too short", field))
	}
}

func (f *Form) MaxLen(field string, d int) {
	value := f.Get(field)
	if strings.TrimSpace(value) == "" {
		return
	}

	if utf8.RuneCountInString(value) > d {
		f.Errors.Add(field, fmt.Sprintf("%s is too long (max is %d)", field, d))
	}
}

func (f *Form) Match(field string, pattern *regexp.Regexp) {
	value := f.Get(field)
	if value == "" {
		return
	}
	if !pattern.MatchString(value) {
		f.Errors.Add(field, fmt.Sprintf("%s is invalid", field))
	}
}

func (f *Form) AllowValues(field string, opts ...string) {
	value := f.Get(field)
	if value == "" {
		return
	}

	for _, opt := range opts {
		if value == opt {
			return
		}
	}

	f.Errors.Add(field, fmt.Sprintf("%s is invalid", field))
}

func (f *Form) URL(field string) {
	value := f.Get(field)
	if value == "" {
		return
	}

	_, err := url.ParseRequestURI(value)
	if err != nil {
		f.Errors.Add(field, fmt.Sprintf("%s is not a URL", field))
	}
}

func (f *Form) Number(field string) {
	value := f.Get(field)
	if value == "" {
		return
	}

	_, err := strconv.Atoi(value)
	if err != nil {
		f.Errors.Add(field, fmt.Sprintf("%s is not a number", field))
	}
}

func (f *Form) Time(field, layout string) {
	value := f.Get(field)
	if value == "" {
		return
	}

	_, err := time.Parse(layout, value)
	if err != nil {
		fmt.Println(value, err)
		f.Errors.Add(field, fmt.Sprintf("%s is not a datetime", field))
	}
}

func (f *Form) GetInt(field string) int {
	value := f.Get(field)
	num, err := strconv.Atoi(value)
	if err != nil {
		return 0
	}
	return num
}

func (f *Form) GetBool(field string) bool {
	value := f.Get(field)
	if value == "" {
		return false
	}

	boolValue, err := strconv.ParseBool(value)
	if err != nil {
		return false
	}
	return boolValue
}

func (f *Form) GetFloat(field string) float64 {
	value := f.Get(field)
	num, err := strconv.ParseFloat(value, 32)
	if err != nil {
		return 0
	}
	return num
}

func (f *Form) MustGetStringSlice(field string) ([]string, bool) {
	_, ok := f.Values[field]
	return f.GetStringSlice(field), ok
}

func (f *Form) GetStringSlice(field string) []string {
	value := f.Get(field)
	result := []string{}

	if value == "" {
		return result
	}

	for _, name := range strings.Split(value, ",") {
		name = strings.TrimSpace(name)
		if len(name) > 0 {
			result = append(result, name)
		}
	}
	return result
}

func (f *Form) GetTime(field string) (time.Time, error) {
	value := f.Get(field)
	layout := f.Get(field + ".layout")
	if layout == "" {
		if len(value) > 10 {
			// 2006-01-02T15:04:05Z07:00
			layout = time.RFC3339
		} else {
			layout = "2006-01-02"
		}
	}

	return time.Parse(layout, value)
}

func (f *Form) Valid() bool {
	return len(f.Errors) == 0
}
func (f *Form) MustGet(field string) (string, bool) {
	_, ok := f.Values[field]
	return f.Get(field), ok
}
func (f *Form) MustGetInt(field string) (int, bool) {
	_, ok := f.Values[field]
	return f.GetInt(field), ok
}
