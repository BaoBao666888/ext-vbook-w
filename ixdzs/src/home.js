function execute() {
    return Response.success([
        { title: "完結作品", input: "https://ixdzs.tw/end/", script: "gen.js" },
        { title: "總榜", input: "https://ixdzs.tw/hot/", script: "gen.js" },
        { title: "月榜", input: "https://ixdzs.tw/hot/month/", script: "gen.js" },
        { title: "日榜", input: "https://ixdzs.tw/hot/day/", script: "gen.js" },
    ]);
}