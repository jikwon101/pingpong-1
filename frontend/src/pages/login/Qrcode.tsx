import axios from 'axios';
import { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import "./qrcode.css";

export default function Qrcode(){
	const history = useHistory();
	const [token, setToken] = useState<string>("");
	const [alertState, setAlert] = useState<boolean>(false);

	useEffect(()=>{
	});
	function checkToken():boolean {
		if (token.length !== 6)
			return false;
		for (let i = 0; i < token.length; i++){
			const num = parseInt(token[i]);
			if (isNaN(num))
				return false;
		}
		return true;
	}
	const handleChange = (event:any) => {
		setToken(event.target.value);
	}
	function handleSubmit(event : any){
		if (!checkToken()){
			setAlert(true);
		}else {
			const url = "http://localhost:4242/2fa/authenticate"
			axios.post(url, {
				token: token
			}).then((res:any)=>{
				console.log(res);
				history.push("/game");
			}).catch((err:any)=>{
				setAlert(true);
			})
		}
	}
	function handleKeypress(event: any){
		if (event.code === 'Enter'){
			handleSubmit(event);
		}
	}

	return (
		<div id="qrcode" className="container">
			<div className="col-10 col-md-8 col-lg-4" id="qrborder">
				<h1 className="row mt-2 p-1" id="qrtitle">2중 인증</h1>
				<h5 className="row justify-content-center">Google OTP 숫자를 입력해주세요.</h5>
				<div className="row m-1 mt-4">
					<input className="col-8" id="qrinput" placeholder="OTP Number without space." onChange={handleChange} onKeyPress={handleKeypress}></input>	
					<div className="col btn m-1" id="qrbutton" onClick={handleSubmit}>확인</div>
				</div>
				<div className="row mt-1">
					{ !alertState ? "" :
						<div className="alert alert-danger m-1" role="alert">OTP 숫자를 다시 확인해주세요! ex) 123456, ...</div>
					}	
				</div>
			</div>
		</div>
	);
}