const container = document.querySelector('.grille');
let allDivs;
const affichage = document.querySelector('h3');
let results = 0;
let alienInvaders = [];
let shooterPosition = 229;
let direction = 1;
let width = 20;

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

    if(allDivs[shooterPosition].classList.contains('aliens', 'tireur')){
        affichage.textContent = "Game Over";
        allDivs[shooterPosition].classList.add('boom');
        clearInterval(invaderId);
    }
    for(let i = 0; i < alienInvaders.length; i++){
        if(alienInvaders[i] > allDivs.length - width){
            affichage.textContent = "Game Over";
            clearInterval(invaderId);
        }
    }

}
// invaderId = setInterval(aliensMoving, 100);

// Le laser

function tirer(e) {
    let laserId;
    let laserEnCours = shooterPosition;

    function deplacementLaser(){

        allDivs[laserEnCours].classList.remove('laser');
        laserEnCours -= width;
        allDivs[laserEnCours].classList.add('laser');

        if(allDivs[laserEnCours].classList.contains('aliens')){
            allDivs[laserEnCours].classList.remove('laser');
            allDivs[laserEnCours].classList.remove('aliens');
            allDivs[laserEnCours].classList.add('boom');

            alienInvaders = alienInvaders.filter(el => el !== laserEnCours)
            setTimeout(() => allDivs[laserEnCours].classList.remove('boom'), 250)
            clearInterval(laserId);

            results++;
            if(results === 36){
                affichage.textContent = "Bravo, c'est gagné !";
                clearInterval(invaderId);
            } else {
                results.textContent = `Score : ${results}`;
            }
        }

        if(laserEnCours < width){
            clearInterval(laserId);
            setTimeout(() => {
                allDivs[laserEnCours].classList.remove('laser');
            }, 100)
        }

    }

    if(e.keyCode === 32){
        laserId = setInterval(() => {
            deplacementLaser();
        }, 1000);
    }
}

document.addEventListener('keyup', tirer);