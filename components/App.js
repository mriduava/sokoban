

export default{
    name: "app",
    components: {
       
    },
    template: `
        <div id="app">
            <div class="home-info">
                <div><h2 class="game-name">{{gameName}}</h2></div>
                <div><button class="start-btn">START</button></div>
            </div>          
        </div>`,
    data() {
        return {
            gameName: 'Sokoban' 
        }
    }
}