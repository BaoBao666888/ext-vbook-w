function execute(url, page) {
    if (!page) page = 0;
    let urlEnd = (page === 0) ? "index.html" : `index_${page}.html`;
    const html = Http.get(`https://www.256wx.net/${url}/${urlEnd}`).html();
    const el = html.select('.article_list li');
    const data = [];   
    for (var i = 0; i < el.size(); i++) {
        var e = el.get(i);         
        let parts = e.select("h3 a").text().trim().split(" 作者：");
        let name = parts[0];
        let author = parts[1]; 
        data.push({
            name: name,
            link: e.select("h3 a").attr("href"),
            cover: null,
            description: author,
            host: "https://www.256wx.net"
        })
    }
    if (data.length === 0) return null;
    return Response.success(data, page + 1);
}