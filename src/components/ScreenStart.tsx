import './ScrM.css';

interface StartScreenProps {
    onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => (
    <div className="marauders-container">
    <div className="main-container">
        <h1 className="start-title">Harry Potter Guessing Game</h1>
        <p>Guess the mystery character in 5 tries!</p>
        <button onClick={onStart}>Play</button>
    </div>
    </div>
)

export default StartScreen;