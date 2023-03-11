/**
 * @file Server-related URL constants.
 */

export const linkUrl =
	localStorage.getItem("meower_linkurl") ||
	"wss://cl4dev.bettermeower.app"; 
export const apiUrl =
	localStorage.getItem("meower_apiurl") || "https://cl4api.bettermeower.app/";
export const encodeApiURLParams =
	localStorage.getItem("meower_encodeapi") || false;
