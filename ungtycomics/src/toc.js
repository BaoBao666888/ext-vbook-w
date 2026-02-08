load('config.js');
function execute(url) {
    //let BASE_URL = "https://ungtycomicsnay.com";
    let page;
    let data = [];
    while(true) {
        if (!page) page = "1";
        const match = url.match(/\/[^\/]+\.html/);
        url = BASE_URL + match[0] + "?page=" + page;
        let response = fetch(url);
        if (response.ok) {
            let doc = response.html();
            let els = doc.select('[class="pagination customer-pagination"] li');
            let nextPage = null;
            let bool = false;
            for (let i=0; i<els.size(); i++) {
                let el = els.get(i);
                let ss = el.text().trim()
                if (ss && bool) {
                    nextPage = ss;
                    break;
                }
                if (ss == page) bool = true;
            }
            doc.select('[class="row cnt-list-chapter"] .item-right .episode-title a').forEach(e => {
                data.unshift({
                    name: e.text().trim(),
                    url: e.attr("href"),
                    host: BASE_URL
                });
            });
            if (nextPage === null) {
                break;
            } else {
                page = nextPage;
            }
        } else {
            return Response.error("Lỗi: " + response.status)
        }
    }
    if (data) return Response.success(data);
    return null;
}