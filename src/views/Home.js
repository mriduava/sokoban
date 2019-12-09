import Game from './Game.js'

export default{
    name: "home",
    components: {
          Game        
    },
    template: `
        <div id="home">

            <div class="nav">
                <div class="game-name">{{gameName}}</div> 

                <div class="sub-nav">
                    <div class="level">LEVEL {{level}}</div>
                    <div class="level">STEPS {{steps}}</div>
                    <div class="level">TIME {{time}}</div>
                    <div class="score">SCORE {{score}}</div>
                </div>
                
            </div>

            <div class="game">
                <Game/>
            </div> 

        </div>`,
    data() {
        return {
            gameName: 'SoKoBAN',
            level: 1,
            steps: 0,
            time: 0,
            score: this.$store.state.score
        }        
    }

}