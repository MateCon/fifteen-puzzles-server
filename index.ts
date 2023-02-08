import createGame from "./createGame";
import { Game, Result } from "./interfaces";
const express = require("express");
const cors = require("cors");

const port = process.env.PORT || 8080;
const app = express();
app.use(cors());

let daily: Game | undefined = undefined;
let day: number | undefined = undefined;
let results: Result[] = [];

const getScore = (_clickCount: string, _time: string): Result | null => {
	let clickCount = parseInt(_clickCount);
	let time = parseInt(_time);
	if (typeof clickCount !== "number" || typeof time !== "number") return null;
	const score = Math.floor((1 / clickCount + 1 / time) * 100000);
	return { clickCount, time, score };
};

app.get("/daily", (_: any, res: any) => {
	if (!daily || day != new Date().getDate()) {
		daily = createGame(4);
		day = new Date().getDate();
		results = [];
	}
	res.json(daily);
});

app.post("/daily", (req: any, res: any) => {
	let result: Result | null = getScore(req.query.clickCount, req.query.time);
	if (!result) return;
	let index = 0;
	while (index < results.length && results[index].score > result.score)
		index++;
	results = [...results.slice(0, index), result, ...results.slice(index)];
	res.json({ position: index + 1, total: results.length });
});

app.get("/daily-position", (req: any, res: any) => {
	let result: Result | null = getScore(req.query.clickCount, req.query.time);
	if (!result) return;
	let index = 0;
	while (index < results.length && results[index].score > result.score)
		index++;
	res.json({ position: index, total: results.length });
});

app.listen(port, () => {
	console.log(`Server is listening on port ${port}.`);
});
