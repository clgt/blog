package pagination

import (
	"net/url"
	"strconv"

	"github.com/clgt/blog/internal/helper"
)

const (
	// default limit
	Default = 18
	// max limit
	Max = 100
	// min limit
	Min = 10
	// pages per side
	PagesPerSide = 3 // 3 pages per side => 1 2 3 [4] 5 6 7
)

type Pagination struct {
	CurrentPage int
	Limit       int
	Total       int

	NumberOfPages int

	LeftPages  []int
	RightPages []int

	Prev  int
	Next  int
	First int
	Last  int
}

func New(q *url.URL) *Pagination {
	// create new pagination
	p := &Pagination{
		Limit: Default,
	}

	page, err := strconv.Atoi(q.Query().Get("page"))
	if err != nil || page == 0 {
		page = 1
	}
	limit, err := strconv.Atoi(q.Query().Get("limit"))
	if err != nil || limit == 0 || limit < Min || limit > Max {
		limit = Default
	}

	p.Limit = limit
	p.CurrentPage = page

	return p
}

func (p *Pagination) SetTotal(total int) *Pagination {
	p.Total = total

	if total == 0 {
		p.NumberOfPages = 1
		p.CurrentPage = 1
		return p
	}

	// count number of pages
	p.NumberOfPages = total / p.Limit
	if total%p.Limit > 0 {
		p.NumberOfPages++
	}

	// make sure current page is not greater than number of pages
	if p.CurrentPage > p.NumberOfPages {
		p.CurrentPage = p.NumberOfPages
	}

	return p
}

// generate
func (p *Pagination) Generate() *Pagination {
	// make sure current page could not be 0
	if p.CurrentPage == 0 {
		p.CurrentPage = 1
	}

	return p.GeneratePages().GenerateControl()
}

// generate pages, use to render pagination
func (p *Pagination) GeneratePages() *Pagination {
	nPages := p.NumberOfPages

	nLeftPages := helper.Min(PagesPerSide, p.CurrentPage-1)
	nRightPages := helper.Min(PagesPerSide, nPages-p.CurrentPage)

	if nLeftPages+nRightPages < PagesPerSide*2 {
		if nLeftPages < PagesPerSide {
			nRightPages += PagesPerSide - nLeftPages
		} else {
			nLeftPages += PagesPerSide - nRightPages
		}
	}

	leftPages := make([]int, 0)
	for i := 0; i < nLeftPages; i++ {
		if p.CurrentPage-nLeftPages+i > 0 {
			leftPages = append(leftPages, p.CurrentPage-nLeftPages+i)
		}
	}

	rightPages := make([]int, 0)
	for i := 0; i < nRightPages; i++ {
		if p.CurrentPage+i+1 <= nPages {
			rightPages = append(rightPages, p.CurrentPage+i+1)
		}
	}

	p.LeftPages = leftPages
	p.RightPages = rightPages

	return p
}

// generate prev and next page
func (p *Pagination) GenerateControl() *Pagination {
	if p.CurrentPage > 1 {
		p.Prev = p.CurrentPage - 1
		p.First = 1
	}

	if p.CurrentPage < p.NumberOfPages {
		p.Next = p.CurrentPage + 1
		p.Last = p.NumberOfPages
	}

	return p
}

// get data bound to limit the current data
func (p *Pagination) GetDataBound() (int, int) {
	if p.Total == 0 {
		return 0, 0
	}

	offset := p.Limit * (p.CurrentPage - 1)

	dataLeftBound := offset
	dataRightBound := helper.Min(offset+p.Limit, p.Total)

	return dataLeftBound, dataRightBound
}
