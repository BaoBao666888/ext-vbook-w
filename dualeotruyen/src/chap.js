load('config.js');
load('decode.js');
function execute(url) {
    //const BASE_URL = "https://dualeotruyenl.com";
    const match = url.match(/\/truyen-tranh\/[^"]+?\.html/);
    url = BASE_URL + match[0];
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let data = [];

        doc.select('.content_view_chap img').forEach(e => {
            let imgoriginal = e.attr("data-original").trim();
            let imgSrc = e.attr("src").trim();
            let img = imgoriginal;
            if (!imgoriginal) {
                img = imgSrc;
            }
            if (!img) {
                let encoded = e.attr('data-lazy');
                img = decode_light(encoded);
            }
            if (!img) {
                let encodedOriginal = e.attr('data-lazy-original');
                img = decode_light(encodedOriginal);
            }
            if (img) {
                data.push(img);
            }
        })
        return Response.success(data);
    }
    return null;
}