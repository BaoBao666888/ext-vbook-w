function execute(url) {
    const doc = Http.get(url).html();
    let el = doc.select('.page-content p');
    let chapter_info = el.get(0).text().trim();
    for (var i= 1; i < el.size(); i++) {
        var e = el.get(i);
        chapter_info = chapter_info + '<br>' + e.text().trim();
    }
    return Response.success(chapter_info);
}