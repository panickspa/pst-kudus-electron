<template>
    <div class="option container">
        <b-modal hide-header hide-footer v-model="status" no-close-on-backdrop hide-backdrop>
            <div class="modal-msg">
                {{msg}}
            </div>
        </b-modal>
        <h1>Options</h1>
        <div class="screensaver-menu p-4 mb-4 d-flex flex-column">
            <h3>Screen Saver</h3>
            <b-form-file squared multiple accept="image/*" @input="addWallList" placeholder="Pilih screensaver disini ..." drop-placeholder="Drop here ..." v-model="wallFile" class="mb-4 squared">
                Add Wallpaper
            </b-form-file>
            <b-list-group w-100 class="mb-4 squared" style="height: 200px; overflow-y:auto;">
                <b-list-group-item v-for="w in wallList" :key="'wall-'+w.id">
                    <b-row w-100>
                        <b-col class="col-10">
                            <span>{{w.path}}</span>
                        </b-col>
                        <b-col class="text-right">
                            <b-button squared variant="danger" @click="deleteWall(w.path)">
                                <i-trash></i-trash>
                            </b-button>
                        </b-col>
                    </b-row>
                </b-list-group-item>
                <b-list-group-item v-for="w in insertList" :key="'wall-insert-'+w.id">
                    <b-row w-100>
                        <b-col class="col-10">
                            <span>{{w.path}}</span>
                        </b-col>
                        <b-col class="text-right">
                            <b-button squared variant="danger" @click="deleteWall(w.path)">
                                <i-trash></i-trash>
                            </b-button>
                        </b-col>
                    </b-row>
                </b-list-group-item>
            </b-list-group>
        </div>
        <div class="d-flex flex-row justify-content-end w-100">
            <b-button squared class="mr-3" @click="saveSurvey">Download Survey</b-button>
            <b-button squared variant="primary" @click="saveOpt">Save</b-button>
        </div>
    </div>
</template>

<script>
import download from "downloadjs"
const {ipcRenderer} = require("electron")
    export default {
        methods:{
            saveSurvey(){
                // console.log('save survey')
                ipcRenderer.send('get-survey')
            },
            deleteWall(path){
                let i = this.wallList.findIndex(e => e.path == path)
                let j = this.insertList.findIndex(e => e.path == path)
                if(i > -1){
                    console.log(this.wallList[i])
                    this.deleteList.push(this.wallList[i])
                    this.wallList.splice(i, 1)
                }
                if(j > -1){
                    this.insertList.splice(j,1)
                }
            },
            saveOpt(){
                console.log(this.wallFile)
                this.msg = "Saving option ..."
                this.status = true
                ipcRenderer.send('update-wall', 
                    {
                        insert: this.wallFile.map(e => {
                            return e.path
                        }),
                        delete: this.deleteList.map(e => {
                            return e.id
                        })
                    }
                )
            },
            addWallList(){
                let maxId = this.getMaxId()
                this.wallFile.forEach((e, i) => {
                    this.insertList.push({
                        id: maxId+i+1,
                        path: `${e.path}`
                    })
                })
            },
            getMaxId(){
                return Math.max(...this.wallList.map(e => {return e.id}))
            }
        },
        mounted(){
            ipcRenderer.send("get-wall")
            ipcRenderer.on("retrive-wall", (evt, arg) => {
                this.wallList = arg
            })
            ipcRenderer.on('wall-updated', ()=>{
                console.log("wall updated")
                this.msg = "Options saved ..."
                let x = setTimeout(function(){
                    this.status = false
                    clearInterval(x)
                }.bind(this), 500)
            })
            ipcRenderer.on('r-survey', (evt, arg) => {
                console.log('retriving data')
                console.log(arg, "data")
                var enc = new TextEncoder()
                let buf = enc.encode(arg)
                download(buf, "Survey"+Date().toString()+".csv" , "text/csv")
            })
        },
        data() {
            return {
                wallList: [],
                wallFile: [],
                insertList:[],
                deleteList:[],
                msg: '',
                status: false
            }
        },
    }
</script>

<style>
.option{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.screensaver-menu{
    border: 1px solid grey;
}
.squared, .custom-file-label{
    border-radius: 0%;
}
</style>