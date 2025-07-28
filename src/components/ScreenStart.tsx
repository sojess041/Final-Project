interface StartScreenProps {
    onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => (
    <div>
        <h1>Harry Potter Guessing Game</h1>
        <p>Guess the mystery character in 5 tries!</p>
        <button onClick={onStart}>Play</button>
    </div>
)

export default StartScreen;