function factory() {

    let hide = 'hide'
   

    function reset() {
        hide = 'hide'
 
    }

    function setshowuser() {
        hide = ''
    
    }

    

    function getuser() {
        return hide
    }


    return{
        setshowuser,
        getuser,
        reset
    }
    
}

module.exports = factory