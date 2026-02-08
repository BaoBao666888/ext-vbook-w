load('config.js');
function execute(url) {
    //let BASE_URL = "https://ungtycomicsnay.com";
    const match = url.match(/\/[^\/]+\.html/);
    url = BASE_URL + match[0];
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let name = doc.select(".title-heading").text();
        let cover = doc.select('.comics-thumbnail img').attr('src');
        const el = doc.select(".comics-info .meta_item");
        
        let author = "Ưng Tỷ Comics";
        let ongoing = false;
        let detail = `Ngày cập nhật: ${doc.select(".comics-info .meta .updated").text()}<br>Lượt xem: ${doc.select(".comics-info .meta .viewer").text().trim()}<br>`;
        for (let i=0; i < el.size(); i++) {
            let e = el.get(i);
            // console.log(e.text());
            if (e.text().includes("Đang tiến hành")) ongoing = true;
            detail += e.select(".meta_label").text().trim() + " " + e.select(".meta_info").text() + "<br>";
        }
        let description = doc.select(".structure").text().replace(name, "").trim();
        return Response.success({
            name: name,
            cover: cover,
            author: author,
            detail: detail,
            host: BASE_URL,
            description: description,
            ongoing: ongoing,
        });
    }
    return null;
}