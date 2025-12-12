load('config.js');
function execute(url, page) {
    if (!page) page = "1";
    //const BASE_URL = "https://dualeotruyenl.com";
    const newUrl = BASE_URL + url + "?page=" + page;
    const response = fetch(newUrl);
    
    if (response.ok) {
        const doc = response.html();
        let data = [];
        //console.log(el.html());
        doc.select(".box_list .li_truyen").forEach(e => {
            let description = e.select(".update .chap_name").text() + " · " + e.select(".update .time").text()
            let cover = e.select(".img img").attr("data-src") ? e.select(".img img").attr("data-src") : BASE_URL + "/images/no-images.jpg";
            data.push({
                name: e.select(".name").text(),
                link: BASE_URL + e.select("a").first().attr("href"),
                cover: cover,
                description: description,
                host: BASE_URL
            });
        });

        return Response.success(data, (parseInt(page, 10)+1).toString())
    }
    return Response.error("Kiểm tra lại?")
}