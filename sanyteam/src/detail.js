function execute(url) {
    const BASE_URL = "https://sanyteam.com";
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let name = doc.select(".infox h1.entry-title").text().trim();
        let cover = doc.select('[class="infoanime widget_senction"] .thumb img').attr('src');
        const el = doc.select(".infox .spe span");
        
        let author = "";
        let ongoing = true;
        let type = "";
        for (let i=0; i < el.size(); i++) {
            let e = el.get(i);
            // console.log(e.text());
            if (e.select("b").text().includes("Tình Trạng") && e.text().includes("Đã Hoàn")) ongoing = false;
            if (e.select("b").text().includes("Tác Giả")) author = e.text().replace("Tác Giả", "").trim();
            if (e.select("b").text().includes("Type")) type = e.text().replace("Type", "").trim();
        }
        let description = "";
        doc.select(".infox .desc p").forEach(p => {
            description += p.text() + "<br>";
        })
        return Response.success({
            name: name,
            cover: cover,
            author: author,
            description: description,
            detail: `Tác giả: ${author}<br>Type: ${type}`,
            host: BASE_URL,
            ongoing: ongoing,
            suggests: [
                {
                    title: "Gợi ý",
                    input: url,
                    script: "rank.js"
                }
            ],
        });
    }
    return null;
}