import { useContext } from 'react';
import Profile from '../../icons/Profile';
import {UserContext} from '../../socket/userSocket'
import "./chat.css"

export default function MyChatBox(props:any){
	const {user} = useContext(UserContext);
	const makeTime = () => {
		if (!props.data){
			return ;
		}
		console.log(`content = ${props.data.content}`)
		let date = props.data.content;
		// let date = new Date();
		// console.log(typeof date);
		const hour = date.getHours();
		const minutes = date.getMinutes();
		return `${hour}:${minutes}`;
	}
	return (
		<div className="container m-0 p-0" key={`${props.chatid}mychatbox${props.idx}`} id={props.idx}>
			<div className="row align-items-start justify-content-end">
				<div className="col-8">
					<div className="row justify-content-end" id="mychatboxnickname">{user[0].nickname}</div>
					<div className="row p-2" id="mychatboxcontent">{props.content}</div>
					<div className="row small text-muted">{makeTime()}</div>
				</div>
				<img src={Profile(user[0].profile)} className="col-2 rounded-circle m-1" alt="..."/>
			</div>
		</div>
	);
}