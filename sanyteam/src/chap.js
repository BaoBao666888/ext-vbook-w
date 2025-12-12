function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let data = [];
        // console.log(doc.select(".reading-content img"));
        doc.select('.reader-area img').forEach(e => {
            let img = e.attr("src").trim();
            if (img) {
                data.push(img);
            }
        })
        return Response.success(data);
    }
    return null;
}