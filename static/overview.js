function createOverview(element, textToReplace) {
    var el = document.getElementById(element);
    if (!el) {
        console.error("Element with id '" + element + "' not found.");
        return;
    }
    el.innerHTML = textToReplace;
}

var newText = '<p><strong>Op deze pagina:</strong></p><ul class="list-group">';
const htags = document.querySelectorAll('h2, h3');

for (var i = 0; i < htags.length; i++) {
    htags[i].id = i;
    if (htags[i].tagName === 'H3') {
        newText += '<li class="list-group-item list-group-item-secondary"><a href="#' + i + '">' + htags[i].textContent + '</a></li>';
    } else {
        newText += '<li class="list-group-item list-group-item-primary"><a href="#' + i + '">' + htags[i].textContent + '</a></li>';
    }
}
newText += '</ul>';

createOverview('overview', newText);