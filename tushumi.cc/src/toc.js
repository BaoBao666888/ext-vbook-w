function execute(url) {
    const doc = Http.get(url).html();
    const list = [];
    let el = doc.select("#list dl").select("*"); 
    let is_chapter_info = false;
    let dem = 1;
    for (var i = 2; i < el.size(); i++) {
        var e = el.get(i);
        if (is_chapter_info && e.tagName() === "dd"){
            list.push({
                name: e.text(),
                url: "https://www.tushumi.cc" + e.select("a").attr("href"),
                host: "https://www.tushumi.cc"
            });
            dem ++;
        } else {
            if (e.tagName() === "dt") {
                is_chapter_info = true;
            }
        }
    }

    return Response.success(list);
}