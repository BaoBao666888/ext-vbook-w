function execute(url, page) {
    if (!page) page = '1';
    if (page !== '1') {
        url = "https://ixdzs.tw" + page;
    }
    const html = Http.get(url).html();
    let next = null;
    let next_TF = html.select(".pagei a[title*='下一頁']").first();
    console.log(next_TF); 
    if (next_TF) {
        next = next_TF.attr("href");
    }
    let el = html.select(".u-list li");
    const data = []; 
    for (var i = 0; i < el.size(); i++) {
        var e = el.get(i);
        let cover = e.select(".l-img img").attr("src");
        let name = e.select(".bname a").text();
        let author = e.select(".bauthor a").text();
        let link = "https://ixdzs.tw" + e.select(".l-img a").attr("href");
        data.push({
            name: name,
            link: link,
            cover: cover,
            description: author,
            host: "https://ixdzs.tw"
        })
    }
    return Response.success(data, next);
}