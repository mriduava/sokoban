import Home from './Home.js'

export default{
    name: "app",
    components: {
       Home
    },
    template: `
        <div id="app">
            <div>
                <Home/>
            </div>                     
        </div>`,
}