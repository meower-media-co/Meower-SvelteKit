import type { CloudlinkPacket } from '@williamhorning/cloudlink';

export interface PostJSON extends Object {
	id: string;
	author: {
		id: string;
		username: string;
		flags: Number;
		icon: {
			type: Number;
			data: Number;
		};
	};
	masquerade: {
		username: string;
		icon: {
			type: Number;
			data: Number;
		};
	};
	public_flags: Number;
	stats: {
		likes: Number;
		meows: Number;
		comments: Number;
	};
	content: string;
	filtered_content: null;
	time: Number;
	delete_after: null;
}

export interface PostItem extends PostJSON {
	id: PostJSON['id'];
}

export interface PostListJSON extends Object {
	autoget: Array<PostJSON>;
	error: boolean;
	'page#': number;
	pages: number;
}

export interface PostPacket extends CloudlinkPacket, Object {
	val: PostJSON;
}

export interface SubscibePacket extends CloudlinkPacket, Object {
	cmd: 'subscribe' | 'unsubscribe';
	type: 'new_posts' | 'users' | 'posts' | 'comments';
	val: null | any;
}

export interface PostUser extends Object {
	id: string;
	username: string;
	flags: Number;
	icon: {
		type: Number;
		data: Number;
	};
}

export interface User extends PostUser {
	created?: Number;
	theme?: Object;
	quote?: string;
	badges?: string[];
	stats?: {
		followers: Number;
		following: Number;
		posts: Number;
	};
}

export interface CurrentUser {
	token: string;
	session_id?: string;
	bot_session?: Boolean;
	user?: User;
	account?: {
		id: string;
		email: string;
		password_enabled: Boolean;
		mfa_methods: string[];
		last_updated: Number;
	};
	application?: null;
	chats?: Chat[];
	following?: string[];
	blocked?: string[];
	guardian?: unknown | null; //TODO: Find the type for this
	infractions?: string[];
	time_taken?: Number;
}

export interface Chat extends Object {
	id: string;
	name: string;
	direct: Boolean;
	flags: Number;
	members: PostUser[];
	permissions: {
		[key: string]: Number;
	};
	invite_code: string;
	created: Number;
}
