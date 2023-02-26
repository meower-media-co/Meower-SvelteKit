import type { CloudlinkPacket } from "@williamhorning/cloudlink"
import CustomEventEmitter from "$lib/util/customEventEmitter"

export interface PostJSON {

	"id": String,
	"author": {
		"id": String,
		"username": String,
		"flags": Number,
		"icon": {
			"type": Number,
			"data": Number
		}
	},
	"masquerade": {
		"username": String,
		"icon": {
			"type": Number,
			"data": Number
		}
	},
	"public_flags": Number,
	"stats": {
		"likes": Number,
		"meows": Number,
		"comments": Number
	},
	"content": String,
	"filtered_content": null,
	"time": Number,
	"delete_after": null
}

export interface PostItem extends PostJSON {
	id: PostJSON["id"];
}

export interface PostListJSON {
	autoget: Array<PostJSON>;
	error: boolean;
	"page#": number;
	pages: number;
}

export interface PostPacket extends CloudlinkPacket {
	val: PostJSON;
}

export interface SubscibePacket extends CloudlinkPacket {
	cmd: "subscribe" | "unsubscribe";
	type: "new_posts" | "users" | "posts" | "comments";
	val: null | any;
}

export interface User {
	"id": String,
		"username": String,
		"flags": Number,
		"created": Number,
		"theme": Object,
		"icon": {
			"type": Number,
			"data": Number
		},
		"quote": String,
		"badges": String[],
		"stats": {
			"followers": Number,
			"following": Number,
			"posts": Number
		}

}

export class CurrentUserClass extends CustomEventEmitter implements CurrentUser {
	constructor(
		public id: String,
		public username: String,
		public flags: Number,
		public created: Number,
		public theme: Object,
		public icon: {
			type: Number,
			data: Number
		},
		public quote: String,
		public badges: String[],
		public stats: {
			followers: Number,
			following: Number,
			posts: Number
		},
		public token: String
	){
		super();
	}

}

export interface CurrentUser extends User {
	token: String;
}
