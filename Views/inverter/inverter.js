
function init() {

}
var upsList = [1,2,3,4]
function setUPS(ind){
    // window.location.href = window.location.href+'/vpe';
    window.location = window.location.origin+'/vpe';
    // for(let ups of upsList){
    //     console.log(ind,ups,ind==ups?"block":"none")
    //     document.getElementById("ups"+ind).style.width = ind==ups?"100%":"0";
    //     document.getElementById("ups"+ind).style.height = ind==ups?"100%":"0";
    //     // document.getElementById("ups"+ind).style.display = ind==ups?"block":"none";
    //     // document.getElementById("ups"+ind).style.display = ind==ups?"block":"none";
    // }
}

function periodic() {
    console.log("inverter")
}


function destroy() {
    console.log("inverter destroyed")
}