import { useEffect, useState } from "react"
import {socket} from "../../socket/userSocket"
import { ChatData, chatRoom } from "../../socket/chatSocket"
import PublicChatList from "../chat/PublicChatList"

export default function PublicChatModal(){
	const [pwd, setPwd] = useState<string>("");
	const [checkedroom, checkRoom] = useState<string>("");
	const [publicroom, setPublic] = useState<ChatData>();

	useEffect(() => {
		if (!publicroom){
			console.log("public chat room emit!")
			socket.emit("publicChatRoom");
		}
		socket.on("publicChatRoom", (data)=>{
			console.log("public chat room on!");
			setPublic(data);
		})
	}, [pwd, checkedroom, publicroom]);

	function handleSubmit(){
		let data:any = {};
		data.chatid = checkedroom;
		if (pwd)
			data.password = pwd;
		socket.emit("enterChatRoom", data);
	}

	return (
		<div className="modal fade h-8" id="PublicChatModal" role="dialog" tabIndex={-1} aria-labelledby="PublicChatModalLabel" aria-hidden="true">
			<div className="modal-dialog modal-dialog-centered" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 id="PublicChatModalLabel" className="modal-title">공개 채팅방</h5>
						<button type="button" className="btn modal-button" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div className="modal-body">
						<div className="container p-0">
							<div className="row overflow-scroll justify-content-center">
								{publicroom &&  publicroom.chatroom?.map((room:chatRoom)=> <PublicChatList chatroom={room} setPwd={setPwd} checkRoom={checkRoom} key={`publicChatList_${room.chatid}`}/>)}
							</div>
						</div>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn modal-button" data-dismiss="modal" onClick={handleSubmit}>확인</button>
						<button type="button" className="btn modal-button" data-dismiss="modal">취소</button>
					</div>
				</div>
			</div>
		</div>
	);
}