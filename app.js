const container = document.querySelector('.grille');
let allDivs;
let alienInvaders = [];
let shooterPosition = 229;

function creationGrilleEtAliens(){

    let indexAttr = 0;
    for(i =0; i < 240; i++){
        if(indexAttr === 0){
            const bloc = document.createElement('div');
            bloc.setAttribute('data-left', 'true');
            container.appendChild(bloc);
            indexAttr++;
        } else if(indexAttr === 19) {
            const bloc = document.createElement('div');
            bloc.setAttribute('data-right', 'true');
            container.appendChild(bloc);
            indexAttr = 0;
        }
        
        else {
            const bloc = document.createElement('div');
            container.appendChild(bloc);
            indexAttr++;
        }
    }

    for(i = 1; i < 53; i++){
        if(i === 13){
            i = 21;
            alienInvaders.push(i);
        } else if(i === 33) {
            i = 41;
            alienInvaders.push(i);
        } else {
            alienInvaders.push(i);
        }
    }

    allDivs = document.querySelectorAll('.grille div');
    alienInvaders.forEach(invader => {
        allDivs[invader].classList.add('aliens');
    })

    allDivs[shooterPosition].classList.add('tireur');
}

creationGrilleEtAliens();