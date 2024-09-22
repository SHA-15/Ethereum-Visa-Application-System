import { HomeBackground } from '../components/backgrounds';
import { HomeContent } from '../containers';
import './Home.css';

export default function Home() {
    return (
        <div id="home">
            <HomeBackground />
            <HomeContent />
        </div>
    )
}