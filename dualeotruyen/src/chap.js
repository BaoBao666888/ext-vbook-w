load('config.js');
load('decode.js');
function execute(url) {
    const match = url.match(/\/truyen-tranh\/[^"]+?\.html/);
    url = BASE_URL + match[0];
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let data = [];
        doc.select('.content_view_chap img').forEach(e => {
            let imgData = e.attr("data-img").trim();
            let imgoriginal = e.attr("data-original").trim();
            let imgSrc = e.attr("src").trim();
            let img = imgData;
            if (img) {
                img = decodeImageLink(img);
            }
            if (!img && imgoriginal) {
                img = imgoriginal;
            }
            if (!img && imgSrc) {
                img = imgSrc;
            }
            if (img) {
                data.push(img);
            }
        })
        return Response.success(data);
    }
    return null;
}