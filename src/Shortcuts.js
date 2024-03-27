const Shortcuts=(ev,keys,setKeys,AuthMainReducerState,AuthMainReducerDispatch)=> {
 
   if(ev.key==="Control" || ev.key==="ArrowLeft"|| ev.key==="ArrowRight"){
        
        if(ev.key==="Control"){

            setKeys(["Control"])
        
        }
        
        if(!keys.includes(ev.key)){

            if(keys.includes("Control")){

                // AuthMainReducerDispatch({type:"changeKeys",Keys:[...keys,ev.key]})
                setKeys([...keys,ev.key])
                
            }
          
        }
        
        else if(ev.key==="Control" && keys.includes("Control")){

            AuthMainReducerDispatch({type:"changeKeys",Keys:['Control']})
            setKeys(['Control'])
             
        }
        
    }   
               
    // else if(ev.key==="Enter"){
    //     if (signinInputNo< 4){ 

    //         SignInPageContextDispatch({type:"changeSigninInputNo",signinInputNo:signinInputNo+1})
            
    //         }
    // }     
}

export default Shortcuts
