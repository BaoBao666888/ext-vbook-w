function execute() {
    return Response.success([
        { title: "最近更新", input: "lastupdate", script: "gen.js" },
        { title: "最新入库", input: "postdate", script: "gen.js" },
        { title: "月点击", input: "monthvisit", script: "gen.js" },
        { title: "总收藏", input: "goodnum", script: "gen.js" },
        { title: "新书榜", input: "goodnew", script: "gen.js" },
    ]);
}