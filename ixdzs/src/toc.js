function execute(url) {
    const novelId = url.match(/read\/(\d+)/)[1];
    const body = "bid=" + novelId;
    var response = fetch("https://ixdzs.tw/novel/html/", {
        method: "POST",
        headers: {
            "content-type": "application/x-www-form-urlencoded"
        },
        body: body,
    });
    if (response.ok) {
        const html = response.html();
        console.log(html);
        const list = [];
        const el = html.select("li a");
        for (var i = 0; i < el.size(); i++) {
            var e = el.get(i);
            list.push({
                name: e.text(),
                url: "https://ixdzs.tw" + e.attr("href"),
                host: "https://ixdzs.tw"
            });
        }

        return Response.success(list);
    }
    return null;
}