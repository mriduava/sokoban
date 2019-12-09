import Grid from './Grid.js'

export default{
    name: "home",
    components: {
        Grid      
    },
    template: `
        <div id="home">

            <div class="nav" v-on:final="updateScore">
                <span class="label">LABEL {{label}}</span>
                <span class="game-name">{{gameName}}</span> 
                <span class="score" >SCORE {{totalScore}}</span>
            </div>

            <div class="grid">
                <Grid/>
            </div>

        </div>`,
    data() {
        return {
            gameName: 'Sokoban',
            show: false,
            label: 1,
            score: this.$store.state.score
        }        
    },
    methods:  {
        updateScore(value){
            console.log(value);            
        }
    },
    computed: {
        totalScore(){
            return this.$store.state.score
        }
    },

}