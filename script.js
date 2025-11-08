const n=50;
const array=[];

init();

let audioCtx=null;

function playNote(freq){
    if(audioCtx==null){
        audioCtx=new(
            AudioContext ||
            webkitAudioContext ||
            window.webkitAudioContext
        )();
    }
    const dur=0.1;
    const osc=audioCtx.createOscillator();
    osc.frequency.value=freq;
    osc.start();
    osc.stop(audioCtx.currentTime+dur);
    const node=audioCtx.createGain();
    node.gain.value=0.01;
    node.gain.linearRampToValueAtTime(
        0, audioCtx.currentTime+dur
    );
    osc.connect(node);
    node.connect(audioCtx.destination);
}

function init(){
    for(let i=0;i<n;i++){
        array[i]=Math.random();
    }
    showBars();
}

function play(){
    const copy=[...array];
    const steps=bubbleSort(copy);
    animate(steps);
}

function animate(steps){
    if(steps.length==0){
        showBars();
        return;
    }
    const step=steps.shift();
    const [i,j]=step.indices;
    
    if(step.type=="swap"){
        [array[i],array[j]]=[array[j],array[i]]
    }

    playNote(200+array[i]*500);
    playNote(200+array[j]*500);

    showBars(step);
    setTimeout(function(){
        animate(steps);
    },50)   
}

function bubbleSort(array){
    const steps=[];
    do{
        var swapped=false;
        for(let i=1;i<array.length;i++){
            // steps.push({indices:[i-1,i],type:"comp"});
            if(array[i-1]>array[i]){
                swapped=true;
                steps.push({indices:[i-1,i],type:"swap"});
                [array[i-1],array[i]]=[array[i],array[i-1]];
            }
        }
    }while(swapped);
    return steps;
}

function showBars(step){
    container.innerHTML="";
    for(let i=0;i<array.length;i++){
        const bar=document.createElement("div");
        bar.style.height=array[i]*100+"%";
        bar.classList.add("bar");

        if(step && step.indices.includes(i)){
            bar.style.backgroundColor=
            step.type=="swap"?"red":"yellow";
        }
        container.appendChild(bar);
    }
}