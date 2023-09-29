const getImage = async (search) => {
    const res = await axios.get(`https://api.giphy.com/v1/gifs/search?q=${search}&api_key=MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym`)
    const randomIndex = Math.floor(Math.random() * (res.data.data).length)
    const urls = res.data.data[ randomIndex ].images.original.url
    const images = $("<img>").attr({ src: urls })
    $(images).appendTo(".col")
}

$('#search-form').submit((e) => {
    e.preventDefault()
    $(".btn").on("click", () => {
      getImage($("#search").val())
      $("#search").val("")
  })
})

$(".delete-all-btn").on('click', () => {
    $(".col").empty()
});
