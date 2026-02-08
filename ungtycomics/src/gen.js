load('config.js');
function execute(url, page) {
    if (!page) page = "1";
    //let BASE_URL = "https://ungtycomicsnay.com";
    const newUrl = BASE_URL + url + "?page=" + page;
    const response = fetch(newUrl);
    if (response.ok) {
        const doc = response.html();
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
        let data = [];
        //console.log(el.html());
        let nameHtml = doc.select('[class="row list-comics"] .content-title');
        let descriptionHtml = doc.select('[class="row list-comics"] .chapter-item');
        let imageHtml = doc.select('[class="row list-comics"] .content-image');
        for (let i=0; i<nameHtml.size(); i++) {
            let name = nameHtml.get(i).text().trim();
            let cover = imageHtml.get(i).select("img").attr("data-src");
            let link = nameHtml.get(i).select("a").attr("href");
            let description = descriptionHtml.get(i).select("a").text().trim() + " · " + descriptionHtml.get(i).select("span").last().text().trim();
            data.push({
                name: name,
                link: link,
                cover: cover,
                description: description,
                host: BASE_URL
            });
        }

        return Response.success(data, nextPage)
    }
    return Response.error("Kiểm tra lại?")
}