function execute(key, page) {
    if (!page) page = '1';
    let url;
    if (page === '1') {
        url = "https://www.tushumi.cc/search.html";
    } else {
        url = "https://www.tushumi.cc" + page;
    }
    const payload = {
        "searchkey": key,
        "searchtype": "all",
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
        const html = response.html();
        const next = html.select(".articlepage").select(".next").attr("href");
        const data = []; 
        let el = html.select("#alist").select("#alistbox");
        for (var i = 0; i < el.size(); i++) {
            var e = el.get(i);
            let cover = e.select("img").attr("src");
            let name = e.select(".title a").text();
            let author = e.select(".title span").text().split("作者：")[1];
            let link_info = e.select(".pic a").attr("href");
            let link = "https://www.tushumi.cc/shu/" + link_info.match(/info-(\d+)\.html/)[1] + "/";
            data.push({
                name: name,
                link: link,
                cover: cover,
                description: author,
                host: "https://www.tushumi.cc"
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