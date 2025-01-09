function execute(url, page) {
    if (!page) page = 1;
    const html = Http.get('https://www.256wx.net/').html();
    let el;
    if (url === 'clicks') {
        el = html.select('.mr_article').first().select('li');
    } else {
        el = html.select('.mr_article').get(1).select('li');
    }
    const data = []; 
    for (var i = 0; i < el.size(); i++) {
        var e = el.get(i);
        let parts = e.text().trim().split(" 作者：");
        let name = parts[0];
        let author = parts[1]; 
        data.push({
            name: name,
            link: e.select("a").attr("href"),
            cover: null,
            description: author,
            host: "https://www.256wx.net"
        })
    }
    if (page !== 1) {
        return null;
    }
    return Response.success(data, page + 1);
}