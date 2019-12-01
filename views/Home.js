import Board from './Board.js'

export default{
    name: "home",
    components: {
        Board       
    },
    template: `
        <div id="home">

            <div class="nav">
                <span class="label">LABEL {{label}}</span>
                <span class="game-name">{{gameName}}</span> 
                <span class="score">SCORE {{score}}</span>
            </div>

            <div class="board">
                <Board/>
            </div>

        </div>`,
    data() {
        return {
            gameName: 'Sokoban',
            show: false,
            label: 1,
            score: 0
        }
        
    }
}