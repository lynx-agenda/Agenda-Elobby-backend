/**
 * THIRD PARTY APIS MIDDLEWARE
 */
const config = require("../../../config");
const { client } = require("../../../app");

var axios = require("axios");

module.exports = {
	getBooks,
	getMoviesAndTV,
	getGames,
};

/**
 *
 * @param {query params para modificar la axios request}
 * @returns Respuesta axios con la petición a la API
 */
async function getBooks(req, res) {
	const q = req.body?.q || ""; // Search for volumes that contain this text string.
	const maxResults = req.body?.maxResults || 4; // The maximum number of results to return.
	const orderBy = req.body?.orderBy || "newest"; // Books ordered by [relevance|newest]
	const langRestrict = req.body?.langRestrict || "es"; // Restricts the volumes returned to those that are tagged with the specified language
	const printType = req.body?.printType || "all"; // Does not restrict by print type
	const startIndex = req.body?.startIndex || 0; // The position in the collection at which to start. The index of the first item is 0.
	const fields =
		req.body?.fields ||
		"totalItems,items(id,volumeInfo(title,authors,publisher,publishedDate,description,industryIdentifiers,pageCount,categories,imageLinks,language))"; // Filter search results by volume type and availability.

	const baseUrl = "https://www.googleapis.com/books/v1/volumes";

	const request = JSON.stringify(req.body);

	try {
		const books = await client.get(request);

		if (books) {
			//send the response from cache
			res.status(200).json({ success: true, ...JSON.parse(books), meta_data: "from_cache" });
		} else {
			//fetch the data
			//console.log("fetch the data.");

			const books = await axios
				.get(baseUrl, {
					params: {
						q: q,
						printType: printType,
						maxResults: maxResults,
						// key: config.GOOGLE_BOOKS_API_KEY,
						orderBy: orderBy,
						langRestrict: langRestrict,
						startIndex: startIndex,
						fields: fields,
					},
				})
				.catch((err) => {
					return res
						.status(400)
						.json({ success: false, msg: "No se ha podido realizar la consulta: " + err });
				});

			//set the data on cache
			// console.log("//set the data on cache");
			client.set(request, JSON.stringify(books.data));
			client.expire(request, 86400);

			//send the response
			// console.log("//send the response");
			return res.status(200).json({
				success: true,
				...books.data,
				meta_data: "from server",
			});
		}
	} catch (err) {
		console.log(err);
	}
}

/**
 *
 * @param {query params para modificar la axios request}
 * @returns Respuesta axios con la petición a la API
 */
async function getMoviesAndTV(req, res) {
	const query = req.body?.query || "";
	const idResource = req.body?.idResource || "";
	const page = req.body?.page || 1;
	const action = req.body?.action || "";
	const resourceType = req.body.resourceType || "";
	const season = req.body.season || "";

	let baseURL = `https://api.themoviedb.org/3`;
	let requestURL = "";
	let params = {};

	const request = JSON.stringify(req.body);

	try {
		const movies_tvShows = await client.get(request);

		if (movies_tvShows) {
			//send the response from cache
			// console.log("send the response from cache");
			res.status(200).json({ success: true, ...JSON.parse(movies_tvShows), meta_data: "from_cache" });
		} else {
			if (action === "discover") {
				requestURL = baseURL + `/${action}/${resourceType}`;
				params = {
					page: page,
					api_key: config.TMDB_API_KEY,
				};
			} else if (action === "search") {
				requestURL = baseURL + `/${action}/${resourceType}`;
				params = {
					query: query,
					page: page,
					api_key: config.TMDB_API_KEY,
				};
			} else {
				if (season !== "") requestURL = baseURL + `/${resourceType}/${idResource}/season/${season}`;
				else requestURL = baseURL + `/${resourceType}/${idResource}`;
				params = {
					api_key: config.TMDB_API_KEY,
				};
			}
			console.log("fetch the data.");

			const movies_tvShows = await axios
				.get(requestURL, {
					params: params,
				})
				.catch((err) => {
					console.log(err);
					return res
						.status(400)
						.json({ success: false, msg: "No se ha podido realizar la consulta: " + err });
				});

			//set the data on cache
			// console.log("//set the data on cache");
			client.set(request, JSON.stringify(movies_tvShows.data));
			client.expire(request, 86400);

			return res.status(200).json({
				success: true,
				...movies_tvShows.data,
				meta_data: "from server",
			});
		}
	} catch (error) {}
}

async function getGames(req, res) {
	const search = req.body?.search || "";
	const idResource = req.body?.idResource || "";
	const search_precise = req.body?.search_precise || "true";
	const parent_platforms = req.body?.parent_platforms || "1,2,3,7";
	const exclude_additions = req.body?.exclude_additions || "true";
	const page = req.body?.page || 1;

	const baseURL = "https://api.rawg.io/api/games";
	let requestURL = "";

	if (idResource !== "") requestURL = baseURL + `/${idResource}`;
	else requestURL = baseURL;

	const request = JSON.stringify(req.body);

	try {
		const games = await client.get(request);

		if (games) {
			//send the response from cache
			res.status(200).json({ success: true, ...JSON.parse(games), meta_data: "from_cache" });
		} else {
			//fetch the data
			// console.log("fetch the data.");

			const games = await axios
				.get(requestURL, {
					params: {
						search: search,
						key: config.RAWG_IO_API_KEY,
						search_precise: search_precise,
						parent_platforms: parent_platforms,
						exclude_additions: exclude_additions,
						page: page,
					},
				})
				.catch((err) => {
					return res.status(400).json("No se ha podido realizar la consulta: " + err);
				});

			//set the data on cache
			// console.log("//set the data on cache");
			client.set(request, JSON.stringify(games.data));
			client.expire(request, 86400);

			//send the response
			// console.log("//send the response");
			return res.status(200).json({
				success: true,
				...games.data,
				meta_data: "from server",
			});
		}
	} catch (error) {
		return res.status(400).json("No se ha podido realizar la consulta: " + err);
	}
}
