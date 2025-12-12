load('config.js');
function execute(key, page) {
    if (!page) page = "1";
    //let BASE_URL = "https://dualeotruyenc.com";
    let respone = fetch(BASE_URL + "/tim-kiem.html?key=" + key + "&page=" + page);
    if (respone.ok) {
        let data = [];
        let html = respone.html();
        html.select(".box_list .li_truyen").forEach(el => {
            let link = BASE_URL + el.select("a").first().attr("href");
            let name = el.select(".name").first().text().trim();
            let cover = el.select(".img img").attr("data-src") || (BASE_URL + "/images/no-images.jpg");
            let description = el.select(".update .chap_name").text() + " · " + el.select(".update .time").text();
            data.push({
                name: name,
                link: link,
                cover: cover,
                host: BASE_URL,
                description: description
            })
        });
        // let next = null;
        // let bool = false;
        // let els = html.select(".page_redirect a");
        // for (let i=0; i < els.size(); i++) {
        //     let e = els.get(i);
        //     if (bool) {
        //         next = e.text().trim();
        //         break;
        //     }
        //     if (e.text().trim() == page) bool = true;
        // }

        return Response.success(data, (parseInt(page, 10)+1).toString());
    }
    return null;
}