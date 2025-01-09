function execute() {
    return Response.success([
        { title: "热门点击", input: "clicks", script: "gen.js" },
        { title: "推荐阅读", input: "recommended_read", script: "gen.js" }, 
    ]);
}