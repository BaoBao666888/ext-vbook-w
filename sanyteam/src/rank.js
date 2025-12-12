function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let books = [];
        let data = response.html().select(".animposx a");

        data.forEach(e => {
            books.push({
                name: e.attr("title"),
                link: e.attr("href"),
                cover: e.select(".content-thumb img").attr("src"),
                description: e.select('.type').last().text(),
            });
        });
        return Response.success(books, null);
    }
    return null;
}