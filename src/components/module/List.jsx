import React from "react";
import { sprintf } from "sprintf-js";

export function MessageList() {
	return (
		<div>
			<a href="#" class="dropdown-item dropdown-item-unread">
				<div class="dropdown-item-avatar">
					<img
						alt="image"
						src={sprintf("src/assets/img/avatar/%s", img)}
						class="rounded-circle"
					/>
					<div class="is-online"></div>
				</div>
				<div class="dropdown-item-desc">
					<b>{name}</b>
					<p>{message}</p>
					<div class="time">{time}</div>
				</div>
			</a>
		</div>
	);
}

export const ListKeyValue = ({ keys, value }) => {
	return (
		<div className="row mb-2">
			<p className="col-6">{keys}</p>
			<p className="col-6 text-right">
				<strong>{value}</strong>
			</p>
		</div>
	);
};

export const ListGroupKeyValue = ({ keys, value }) => {
	return (
		<li className="list-group-item d-flex justify-content-between align-items-center">
			<span>{keys}</span>
			<span>{value}</span>
		</li>
	);
};
