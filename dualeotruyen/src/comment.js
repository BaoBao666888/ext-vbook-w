load('config.js');
function execute(url, next) {
    //const BASE_URL = "https://dualeotruyenl.com";
    let results = [];
    if (!next) {
        next = "";
        let response = fetch(url);
        if (response.ok) {
            const doc = response.html();
            doc.select(".list_comment .li_comment").forEach(e => {
                let name = e.select(".info_comment .top_comment span").first().text();
                if (e.select(".info_comment .top_comment span").size() > 1) name += " · " + e.select(".info_comment .top_comment span").last().text();
                let content = e.select(".info_comment .text_comment").text();
                let description = e.select(".info_comment .bottom_comment .show_reply").text().replace("·", " · ") + e.select(".info_comment .bottom_comment span").last().text();
                if (e.select(".info_comment .bottom_comment .show_reply").attr("id_comment").trim()) {
                    next += `⧗⧗id⧒${e.select(".info_comment .bottom_comment .show_reply").attr("id_comment").trim()}⧗name⧒${name}⧗⧗`;
                }
                results.push({
                    name: name,
                    content: content,
                    description: description,
                });
            });
            console.log(results.length);
            return Response.success(results, next);
        }
        return null;
    } else {
        const { id, name, newNext } = shiftFirstFromNext(next);
        let resReply = fetch(BASE_URL + "/process.php", {
            method: "POST",
            headers: {
                "referer": url,
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
                "x-requested-with": "XMLHttpRequest",
            },
            body: {
                "action": "load_reply",
                "id": id,
            }
        });
        if (resReply.ok) {
            let reply = resReply.json().list;
        // console.log(typeof html);
        // console.log(typeof html === 'object');

            const regex = /<div class="li_sub_comment"[\s\S]*?<\/div>\s*<\/div>/g;

            let match;
            while ((match = regex.exec(reply)) !== null) {
                const block = match[0];

                const nameMatch = block.match(/<div class="top_sub_comment">\s*<span[^>]*>(.*?)<\/span>/);
                const contentMatch = block.match(/<div class="text_sub_comment">(.*?)<\/div>/);
                const descriptionMatch = block.match(/<div class="bottom_sub_comment">\s*<span[^>]*>(.*?)<\/span>/);

                results.push({
                    name: nameMatch ? nameMatch[1].trim() + " · Trả lời: " + name : null,
                    content: contentMatch ? contentMatch[1].trim() : null,
                    description: descriptionMatch ? descriptionMatch[1].trim() : null,
                });
            }
            return Response.success(results, newNext);
        }
        return null;
    }
}

function shiftFirstFromNext(next) {
    const pattern = /⧗⧗id⧒(.*?)⧗name⧒(.*?)⧗⧗/;
    const match = next.match(pattern);

    if (match) {
        const id = match[1];
        const name = match[2];

        // Cắt phần đã lấy ra khỏi chuỗi
        newNext = next.replace(pattern, "");

        return { id, name, newNext };
    } else {
        return null; // Không tìm thấy
    }
}
