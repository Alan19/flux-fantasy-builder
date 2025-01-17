import './App.css'
import {CharacterSheet} from "./CharacterSheet.tsx";
import {Provider} from "./components/ui/provider.tsx";

function App() {
    return (
        <Provider>
            <CharacterSheet/>
        </Provider>
    )
}

export default App
