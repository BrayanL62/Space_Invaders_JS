const container = document.querySelector('.grille');
let allDivs;
let alienInvaders = [];
let shooterPosition = 229;
let direction = 1;

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

function deplacerLeTireur(e){
    allDivs[shooterPosition].classList.remove('tireur');

    if(e.keyCode === 37){
        if(shooterPosition > 220){
            shooterPosition -= 1;
        }
    }
    else if(e.keyCode === 39){
        if(shooterPosition < 239){
            shooterPosition += 1;
        }
    }
    allDivs[shooterPosition].classList.add('tireur');
}
document.addEventListener('keydown', deplacerLeTireur);

// Bouger les aliens 
let goDownRight = true;
let goDownLeft = true;

function aliensMoving(){
    for(let i = 0; i < alienInvaders.length; i++){
        if(allDivs[alienInvaders[i]].getAttribute('data-right') === 'true'){

            if(goDownRight){
                direction = 20;
                setTimeout(() => {
                    goDownRight = false;
                }, 50);
            } else if(goDownRight === false){
                direction = -1;
            }
            goDownLeft = true;

        } else if(allDivs[alienInvaders[i]].getAttribute('data-left') === 'true') {

            if(goDownLeft){
                direction = 20;
                setTimeout(() => {
                    goDownLeft = false;
                }, 50);
            } else if(goDownLeft === false){
                direction = 1;
            }
            goDownRight = true;
        }
    }

    for(let i = 0; i < alienInvaders.length; i++){
        allDivs[alienInvaders[i]].classList.remove('aliens');
    }
    for(let i = 0; i<alienInvaders.length; i++){
        alienInvaders[i] += direction;
    }
    for(let i = 0; i<alienInvaders.length; i++){
        allDivs[alienInvaders[i]].classList.add('aliens');
    }
}
// invaderId = setInterval(aliensMoving, 1000);