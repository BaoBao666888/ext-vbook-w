function execute(key, page) {
    if(!page) page =1;
    const url = "https://www.256wx.net/e/search/";
    const payload = {
        "show": "title,writer",
        "tempid": "1",
        "tbname": "article",
        "keyboard": key,
    };
    const body = buildQueryString(payload);
    var response = fetch(url, {
        method: "POST", 
        headers: {
            "Content-Type": "application/x-www-form-urlencoded", 
        },
        body: body,
    });
	if (response.ok) {
        const html = response.html()
        const next = page + 1;
        const data = []; 
        let el = html.select(".main_left h3")
        for (var i = 0; i < el.size(); i++) {
            var e = el.get(i);
            let parts = e.text().trim().split(" 作者：");
            let name = parts[0];
            let author = parts[1]; 
            data.push({
                name: name,
                link: "https://www.256wx.net" + e.select("a").attr("href"),
                cover: null,
                description: author,
                host: "https://www.256wx.net"
            })
        }
        return Response.success(data, next);
	}
	return null;
}

function buildQueryString(data) {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
}