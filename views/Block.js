export default{
    props: ['position'],
    template: `
          <div @click="logPosition"></div>`,

    methods: {
        logPosition(){
            console.log(this.position.x, this.position.y)
        }
    }
}