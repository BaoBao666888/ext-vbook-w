function execute(url) {
    const BASE_URL = "https://sanyteam.com";
    var response = fetch(url);
    if (response.ok) {
        let data = [];
        let doc = response.html();
        doc.select("#chapter_list .epsleft a").forEach(e => {
            data.unshift({
                name: e.text(),
                url: e.attr("href"),
                host: BASE_URL
            });
        });
        return Response.success(data);
    }
    return Response.error("Lỗi!!!!!");
}