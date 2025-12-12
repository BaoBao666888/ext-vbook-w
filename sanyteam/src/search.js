function execute(key) {
    const BASE_URL = "https://sanyteam.com";
    let respone = fetch(BASE_URL + "/?s=" + key);
    let data = [];
    if (respone.ok) {
        const doc = respone.html();
        const el = doc.select(".animposx");
        el.forEach(e => {
            let description = e.select(".data .type").text().trim();
            data.push({
                name: e.select("a").attr("alt"),
                link: e.select("a").attr("href"),
                cover: e.select("img").attr("src"),
                description: description,
                host: BASE_URL
            });
        });
        return Response.success(data);
    }
    return Response.error("Lỗi nè!!!");
}