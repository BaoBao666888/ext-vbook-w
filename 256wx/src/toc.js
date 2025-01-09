function execute(url) {
    const doc = Http.get(url).html();
    let el = doc.select('[class="list fix"] li');
    const list = [];
    for (var i= 0; i < el.size(); i++) {
        var e = el.get(i);
        list.push({
            name: e.text(),
            url:  "https://www.256wx.net" + e.select("a").attr("href"),
            host: "https://www.256wx.net"
        })
    }
    return Response.success(list);
}