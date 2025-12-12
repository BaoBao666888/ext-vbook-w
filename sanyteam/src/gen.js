function execute(url) {
    const BASE_URL = "https://sanyteam.com";
    const newUrl = BASE_URL + url;
    const response = fetch(newUrl);
    if (response.ok) {
        const doc = response.html();

        const el = doc.select(".animposx");
        let data = [];
        //console.log(el.html());
        el.forEach(e => {
            let description = e.select(".data .char a").first().text().trim();
            if (!description) description = "Đã Hoàn"
            data.push({
                name: e.select("a").attr("alt"),
                link: e.select("a").attr("href"),
                cover: e.select("img").attr("src"),
                description: description,
                host: BASE_URL
            });
        });

        return Response.success(data)
    }
}