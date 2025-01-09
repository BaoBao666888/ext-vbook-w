function execute() {
    return Response.success([
        { title: "现代耽美", input: "xiandai", script: "gen2.js" },
        { title: "古代架空", input: "jiakong", script: "gen2.js" }, 
        { title: "穿越重生", input: "chuanyue", script: "gen2.js" }, 
        { title: "BL同人", input: "bltongren", script: "gen2.js" }, 
    ]);
}