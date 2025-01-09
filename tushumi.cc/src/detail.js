function execute(url) {
    const doc = Http.get(url).html();
    let name = doc.select("#info a").first().select("h1").text();
    let cover = doc.select("#fmimg img").attr("src");
    let author = doc.select("#info p").first().select("a").text();
    let description = doc.select("#intro .introtxt").text();
    let detail = "作者： " + author + "<br>" + "类别： " + doc.select("#info p").get(1).text().split("别：")[1] + "<br>" + doc.select("#info p").get(3).text() + "<br>" + doc.select("#info p").get(4).text();
    return Response.success({
        name: name,
        cover: cover,
        author: author,
        description: description,
        detail: detail,
        ongoing : true,
        host: "https://www.tushumi.cc",
    });
}