export default{
    props: ['position'],
    template: `
          <div @click="logPosition"></div>`,

    methods: {
        logPosition(){
            console.log(this.position.x, this.position.y)
            if (this.position.x == 2 && this.position.y == 2) {
                $('.block').css('background-color', 'yellow')
            }
        }
    }
}