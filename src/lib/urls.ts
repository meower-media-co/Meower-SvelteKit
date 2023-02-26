/**
 * @file Server-related URL constants.
 */

export const linkUrl =
	localStorage.getItem("meower_linkurl") ||
	"ws://localhost:3001/"; 
export const apiUrl =
	localStorage.getItem("meower_apiurl") || "http://localhost:3000/";
export const encodeApiURLParams =
	localStorage.getItem("meower_encodeapi") || false;
