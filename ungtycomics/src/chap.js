load('config.js');
function execute(url) {
    //let BASE_URL = "https://ungtycomicsnay.com";
    const match = url.match(/\/[^\/]+\/[^\/]+\.html/);
    url = BASE_URL + match[0];
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let data = [];

        doc.select('.content-container img').forEach(e => {
            let img = e.attr("data-src").trim();
            if (img) {
                data.push(img);
            }
        })
        return Response.success(data);
    }
    return null;
}