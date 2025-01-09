function execute(url) {
    const doc = Http.get(url).html();
    let name = doc.select(".n-text h1").text();
    let cover = doc.select(".n-img img").attr("src");
    let author = doc.select(".n-text p").first().select("a").text();
    let description = doc.select("#intro").html().split("<span class=\"icon icon-arrow-d c-more\"><\/span>")[0].replace(/\n/g, "<br>");
    let detail = `作者： ${author}<br>字数: ${doc.select(".n-text p").get(2).select("span").text()}<br>最新: ${doc.select(".n-text p").get(3).select("a").text()}<br>${doc.select(".n-text p").last().text()}`;
    let ongoing = false;
    if (doc.select(".n-text p").get(1).select("span").text() === "連載中") {
        ongoing = true;
    }
    return Response.success({
        name: name,
        cover: cover,
        author: author,
        description: description,
        detail: detail,
        ongoing : ongoing,
        host: "https://ixdzs.tw",
    });
}