import { reactive} from "vue";
import axios from "axios";
import router from "@/router/index.js";

const AuthState = reactive({
   isAuthenticated: false,
    user: null,
    username: null,
    password: null,
    login(){
        // console.log("Logging in with: ", this.username, this.password);
     axios.post("http://localhost:8009/",{
         email:this.username,
         password:this.password
        }).then((response)=>{
          if(response.data.success==1){
           this.isAuthenticated = true;
           this.user = response.data;
           this.username = null;
           this.password = null;
           this.error = null;
           this.saveState();
           router.push("/")
          }else{
              this.error = "Invalid Credentials";
          }
        })

    },
    saveState(){
       localStorage.setItem("authState", JSON.stringify(this))
    },
    loadState(){
        const authState = localStorage.getItem("authState");
        if(authState){
            Object.assign(this,JSON.parse(authState))
        }
    },
    logout(){
       // alert('Logout')
        this.isAuthenticated = false;
        this.user = null;
        this.saveState();
        router.push("/login")

    }
});

AuthState.loadState()
export default AuthState;