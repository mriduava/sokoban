import Grid from './Grid.js'

export default{
    name: "board",
    components: {
       Grid
    },
    template: `
        <div id="grid" >
            
            <div class="grid-block">
                <!--<div class="block"></div>
                 <div class="block"></div>
                <div class="block"></div>
                <div class="block"></div>
                <div class="block"></div>
                <div class="block"></div>
                <div class="block"></div>
                <div class="block"></div>
                <div class="block"></div>
                <div class="block"></div>
                <div class="block"></div>
                <div class="block"></div> -->
            </div>
                     
        </div>`,
    data() {
        return {
            blocks: []
        }
    },
    methods: {
        createGrids(){
            let blocks = document.querySelector('.block');
            // for (let i=0; i<blocks.length; i++) {
            //     blocks[i].style.backgroundColor = 'green';
            // }
            for (let i=0; i<144; i++) {
                
                $('.grid-block').append('<div class="block"></div>')
            }
        }
    },
    mounted() {
        this.createGrids()
    }
}