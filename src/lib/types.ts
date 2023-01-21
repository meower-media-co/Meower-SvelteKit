/**
 * A CL Turbo packet.
 */
export interface Packet {
	cmd: string;
	val: string | object;
	payload?: string | object;
	listener?: string;
}

export interface ListenerPacket extends Packet {
	listener: string;
}

export interface ModePacket extends Packet {
	val: {
		mode: string;
		payload: any;
	};
}

/**
 * The value returned by sendListener().
 */
export interface SendListenerReturn {
	packets: Packet[];
	statuscode: string | null;
	ok: boolean;
}

export interface ModeRequestReturn {
	payload: any;
	statuscode: string | null;
	ok: boolean;
}
