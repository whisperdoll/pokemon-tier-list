const fs = require("fs");
const https = require("https");
const request = require("request");

function httpGET(url, callback)
{
    https.get(url).on("response", (response) =>
    {
        let body = "";
        response.on("data", (chunk) =>
        {
            body += chunk;
        });

        response.on("end", () =>
        {
            callback(body);
        });
    });
}

function saveImage(url, filename, callback)
{
    request.head(url, (err, res, body) =>
    {
        request(url).pipe(fs.createWriteStream(filename)).on("close", callback);
    });
}

function fetchSprite(num)
{
    console.log("fetching " + num + "...");
    httpGET("https://zukan.pokemon.co.jp/detail/" + num, (html) =>
    {
        let s = "<script id=\"json-data\" type=\"application/json\">";
        let z = html.substr(html.indexOf(s) + s.length);
        z = z.substr(z.indexOf("image_m") + 10);
        z = z.substr(0, z.indexOf("\""));
        z = z.replace(/\\/g, "");
        saveImage(z, "src/sprites/" + num.toString().padStart(4, "0") + ".png", () => console.log("saved " + num));
    });
}

try
{
    fs.mkdirSync("src/sprites");
}
catch (e)
{
    // we dont care if it already exists, but throw any other kind of error
    if (!(e.code && e.code === "EEXIST"))
    {
        throw e;
    }
}

for (let i = 0; i < 890; i++)
{
    setTimeout(() =>
    {
        fetchSprite(i + 1);
    }, i * 1000);
}