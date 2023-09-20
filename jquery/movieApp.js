let alphaSortDir = true;
let numSortDir = false;

$('#movie-form').submit(function (e) {
    e.preventDefault();

    const title = $('input[type="text"]').val();
    const rating = $('input[type="number"]').val();

    const $title = $(`<p>${title}</p>`).css('text-decoration', 'underline');
    const $rating = $(`<p>${rating}/10</p>`);
    $('<div>')
        .addClass('movie-block')
        .attr({ 'data-rating': rating, 'data-title': title })
        .append($title)
        .append($rating)
        .append('<button>X</button>')
        .appendTo('#movie-container');
})

$('#movie-container').on('click', 'button', function () {
    $(this).parent().remove();
})

$('#sort-form').submit(function (e) {
    e.preventDefault();

    const $movies = $('.movie-block');
    if (this.sortType[0].checked) {
        sortDiv('', $movies, alphaSortDir);
        $movies.appendTo('#movie-container');
        alphaSortDir = !alphaSortDir;
        numSortDir = false;
    }
    // rating sort
    else if (this.sortType[1].checked) {
        sortDiv(0, $movies, numSortDir);
        $movies.appendTo('#movie-container');
        numSortDir = !numSortDir;
        alphaSortDir = true;
    }
    else {
        return;
    }
})

// Mode - pass in a string to sort alphabetically, pass in a number to sort numerically
function sortDiv(mode, jqObj, direction){
    let noSortsThisPass = false;
    while (!noSortsThisPass){
        noSortsThisPass = true;
        for (let i = 0; i < jqObj.length - 1; i++){
            let i0, i1;
            if (typeof mode === 'number'){
                i0 = +$(jqObj[i]).attr('data-rating');
                i1 = +$(jqObj[i+1]).attr('data-rating');
            } else if (typeof mode === 'string'){
                i0 = $(jqObj[i]).attr('data-title');
                i1 = $(jqObj[i+1]).attr('data-title');
            }
            const sort = direction ? (i0 > i1) : (i0 < i1);
            if (sort){
                [jqObj[i], jqObj[i+1]] = [jqObj[i+1], jqObj[i]];
                noSortsThisPass = false;
            }
        }
    }
}
