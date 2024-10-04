function createpicturesList (pictures) {
  const myRow = document.getElementById('create-row')

  for (let i = 0; i < pictures.photos.length; i++) {
    const myCard = document.createElement('div')
    myCard.classList.add('col-sm-6', 'col-md-3', 'col-lg-3', 'mt-2', 'card-box')
    myCard.innerHTML = `
    <div class="card p-2">
    <p ><i class="fa-solid fa-ellipsis"></i></p>
    <img src="${pictures.photos[i].src.original}" alt="" class="img-fluid" >
    <div class="card-body d-flex">
      <small class="card-text">${pictures.photos[i].photographer}</small>
      <button type="button" class=" btn-box btn-sm btn-outline-secondary" style="background-color:${pictures.photos[i].avg_color}; border: 1px solid ${pictures.photos[i].avg_color}; "></button>
    </div>
    </div>
    `
    myRow.appendChild(myCard)
  }
}
function fetchAlbumData () {
  const page = getPage()
  const query = getQuery()
  let myRequest = new XMLHttpRequest()
  myRequest.open(
    'GET',
    `https://api.pexels.com/v1/search?query=${query}&per_page=16&page=${page}`
  )
  myRequest.setRequestHeader(
    'Authorization',
    '47b6VBNu56SDv6uS2hfY7zQZHGpNok1t0Gk8LyWLQBcrZjQnIhtlgnvR'
  )
  myRequest.send()

  myRequest.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let jsData = JSON.parse(this.responseText)
      createpicturesList(jsData)
      createPagination(jsData)
      // console.log(jsData);
    }
  }
}
fetchAlbumData()
function createPagination (pictures) {
  let page = pictures.page
  let query = getQuery()
  const pageCount = pictures.total_results / pictures.per_page
  const paginationText = document.getElementById('pagination-text')
  const paginationElement = document.createElement('ul')
  paginationElement.setAttribute('id', 'pagination-ul')
  let startI = page - 3
  let endI = page + 3

  if (page <= 3) {
    startI = 1
    endI = 7
  } else if (page >= pageCount - 2) {
    startI = pageCount - 6
    endI = pageCount
  }
  const PreviousPage = document.getElementById('Previous-page')
  const nextPage = document.getElementById('next-page')
  if (page != 1) {
    PreviousPage.setAttribute(
      'href',
      `/glozin.html?query=${query}&page=${page - 1}`
    )
  } else {
    PreviousPage.addEventListener('click', function (e) {
      e.preventDefault()
    })
  }
  if (page != pictures.total_results / pictures.per_page) {
    nextPage.setAttribute(
      'href',
      `/glozin.html?query=${query}&page=${page + 1}`
    )
  } else {
    nextPage.addEventListener('click', function (e) {
      e.preventDefault()
    })
  }

  for (let i = startI; i <= endI; i++) {
    // <span id="prev" class="prev"><a id="Previous-page" class="page-link" href="#">Previous</a></span>
    // <span id="pagination-text" class="pagination-texts"></span>
    // <span id="next" class="next"><a id="next-page" class="page-link" href="#">Next</a></span>

    const paginationItem = document.createElement('li')
    paginationItem.setAttribute('class', 'page-item')
    const paginatioHref = document.createElement('a')
    paginatioHref.setAttribute('class', 'page-link')
    paginatioHref.setAttribute('href', `/glozin.html?query=${query}&page=${i}`)
    paginatioHref.textContent = i
    if (i == page) {
      paginationItem.classList.add('active')
      paginatioHref.setAttribute('href', 'javascript: void(0)')
    }
    paginationItem.appendChild(paginatioHref)
    paginationElement.appendChild(paginationItem)
  }

  paginationText.appendChild(paginationElement)
}

function logoutProfile () {
  localStorage.removeItem('token')
  location.replace('/html/inpout.html')
}
function getPage () {
  const urlParams = new URLSearchParams(window.location.search)
  let myPage = urlParams.get('page')
  if (myPage == null) {
    myPage = 1
  }
  return myPage
}
function getQuery () {
  const urlParamsQuery = new URLSearchParams(window.location.search)
  let myQuery = urlParamsQuery.get('query')
  if (myQuery == null) {
    myQuery = 'nature'
  }
  return myQuery
}
