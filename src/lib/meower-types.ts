import type { CloudlinkPacket } from "@williamhorning/cloudlink"
import CustomEventEmitter from "$lib/util/customEventEmitter"

export interface PostJSON extends Object {

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

export interface PostListJSON extends Object{
	autoget: Array<PostJSON>;
	error: boolean;
	"page#": number;
	pages: number;
}

export interface PostPacket extends CloudlinkPacket, Object{
	val: PostJSON;
}

export interface SubscibePacket extends CloudlinkPacket, Object {
	cmd: "subscribe" | "unsubscribe";
	type: "new_posts" | "users" | "posts" | "comments";
	val: null | any;
}

export interface PostUser extends Object{
	/*
	            "id": "419696333390086144",
            "username": "ShowierData",
            "flags": 0,
            "icon": {
                "type": 0,
                "data": 2
            }
			`
	*/
	"id": String,
	"username": String,
	"flags": Number,
	"icon": {
		"type": Number,
		"data": Number
	}
}

export interface User extends PostUser{
		"created": Number,
		"theme": Object,
		"quote": String,
		"badges": String[],
		"stats": {
			"followers": Number,
			"following": Number,
			"posts": Number
		}
}

export interface CurrentUser{
	token: String;
	session_id: String;
	bot_session: Boolean;
	user: User;
	account: {
		id: String;
		email: String;
		password_enabled: Boolean;
		mfa_methods: String[];
		last_updated: Number;
	};
	application: null;
	chats: Chat[];
	following: String[];
	blocked: String[];
	guardian: Object | null; //TODO: Find the type for this
	infractions: String[];
	time_taken: Number;


}


export interface Chat extends Object { 
	/*{
    "id": "419696456522268672",
    "name": null,
    "direct": true,
    "flags": 0,
    "members": [
        {
            "id": "419696333390086144",
            "username": "ShowierData",
            "flags": 0,
            "icon": {
                "type": 0,
                "data": 2
            }
        },
        {
            "id": "0",
            "username": "Server",
            "flags": 1,
            "icon": {
                "type": 0,
                "data": 2
            }
        }
    ],
    "permissions": {},
    "invite_code": null,
    "created": 1677900232
}
*/
	id: String;
	name: String;
	direct: Boolean;
	flags: Number;
	members: PostUser[];
	permissions: {
		[key: string]: Number
	},
	invite_code: String;
	created: Number;
}