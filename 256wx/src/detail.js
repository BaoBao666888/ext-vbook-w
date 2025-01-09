function execute(url) {
    const doc = Http.get(url).html();
    return Response.success({
        name: doc.select(".position a").get(2).text(),
        cover: null,
        author: doc.select("#text span").first().text().replace("作者：", ""),
        description: doc.select("#nr_history p").first().text() + '<br>' + doc.select("#nr_history p").get(1).text(),
        detail: doc.select("#text span").first().text() + '<br>'+ doc.select("#text time").text(),
        ongoing : true,
        host: "https://www.256wx.net",
    });
}