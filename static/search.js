let fuse;
let data = [];



fetch("/search.json")
    .then(r => r.json())
    .then(json => {
        data = json;

        fuse = new fuse(data, {  // Uncaught (in promise) TypeError: fuse is not a constructor
            keys: [
                { name: "title", weight: 0.5 },
                { name: "content", weight: 0.1 },
                { name: "tags", weight: 0.2 },
                { name: "summary", weight: 0.2 }
            ],
            threshold: 0.4,
            includeScore: true
        });
    });


document.getElementById("searchbox").addEventListener("input", e => {
    const q = e.target.value.trim();

    if (!q) {
        document.getElementById("results").innerHTML = "";
        return;
    }

    const results = fuse.search(q);

    document.getElementById("results").innerHTML = results
        .map(r => '<li><a href="${r.item.url}">${r.item.title}</a></li>')
        .join("");
});
