load('config.js');
function execute(url) {
    //const BASE_URL = "https://dualeotruyenl.com";
    const match = url.match(/\/truyen-tranh\/[^\/]+\.html/);
    url = BASE_URL + match[0];
    let response = fetch(url);
    if (response.ok) {
        let data = [];
        let doc = response.html();
        doc.select(".box_list .chap_name").forEach(e => {
            data.unshift({
                name: e.text(),
                url: BASE_URL + e.select("a").attr("href"),
                host: BASE_URL
            });
        });
        return Response.success(data);
    }
    return Response.error("Lỗi!!!!!");
}