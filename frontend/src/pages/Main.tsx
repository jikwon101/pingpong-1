import './Main.css';

export default function Main(){
    return (
        <div className='container' id="container">
            <div className='container-xxl h1'>PONG CONTEST GAME</div>
            <div className='col mb-5' id="buttons">
                <a className="btn btn-outline-primary mx-2 btn-lg" href="/user/login" role="button">START</a>
            </div>
        </div>
    );
}