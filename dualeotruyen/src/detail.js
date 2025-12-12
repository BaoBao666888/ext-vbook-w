load('config.js');
function execute(url) {
    //const BASE_URL = "https://dualeotruyenl.com";
    const match = url.match(/\/truyen-tranh\/[^\/]+\.html/);
    url = BASE_URL + match[0];
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let name = doc.select(".box_info_right h1").first().text();
        let cover = doc.select('.box_info_left .img img').attr('src');
        const el = doc.select(".box_info_right .txt .info-item");
        
        let author = "";
        let ongoing = false;
        let detail = "";
        for (let i=0; i < el.size(); i++) {
            let e = el.get(i);
            // console.log(e.text());
            if (e.text().includes("Tình trang") && e.text().includes("Đang cập nhật")) ongoing = true;
            if (e.text().includes("Nhóm dịch")) author = e.select("a").text();
            detail += e.text() + "<br>";
        }
        let description = doc.select(".story-detail-info").html()
        .replace(/<(?!br\s*\/?)[^>]+>/gi, '')
        .replace(/\n/g, '<br>')
        .replace(/<br\s*\/?>/gi, '<br>')
        .trim();

        let comment = null;
        if (doc.select(".list_comment .li_comment").size() > 0) {
            comment = {
                input: url,
                next: null,
                script: "comment.js"
            }
        }

        let genres = [];
        doc.select('.box_info_right [class="list-tag-story list-orange"] a').forEach(e => {
            genres.push({
                    title: e.text(),
                    input: e.attr("href"),
                    script: "gen.js"
                })
        });

        return Response.success({
            name: name,
            cover: cover,
            author: author,
            description: description,
            detail: detail,
            genres: genres,
            host: BASE_URL,
            ongoing: ongoing,
            comment: comment,
        });
    }
    return null;
}