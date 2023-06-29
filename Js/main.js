// Select The Start Game Button
let el = document.querySelector('.control-buttons span');
el.addEventListener('click', function () {

    // Prompt Window To Ask For Name
    let name = prompt('What is Your Name?');

    // Save Player's Name in Local Storage
    localStorage.setItem('PlayerName', name);

    // If Name Is Empty
    let cont = document.querySelector('.name span');
    name == null || name == '' ? cont.innerHTML = 'Unknown' : cont.innerHTML = name;

    // Remove Splash Screen
    let contr = document.querySelector('.control-buttons');
    contr.remove();

    // Add Background Music To the Game
    document.getElementById('back-music').play();

    // Add class Is-Flipped for the Player
    isFlipped()

    // Set Time to Reset The Game
    let timerElem = document.querySelector('.timer');
    
    // Set number of Seconds
    let seconds = 30;

    // Update the timer every second
    const timerInterval = setInterval(() => {

        // Decrement the seconds
        seconds--;

        // Calculate the hours, minutes, and remaining seconds
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        // Display the timer in the HTML element with id "timer"
        timerElem.innerHTML = `Time: ${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
        
        // Stop Timer
        if (hours <= 0 && minutes <= 0 && remainingSeconds <= 0) {

            clearInterval(timerInterval);

            // Flip Remaining Blocks After Loss
            isFlipped2ndV();

            // add no clicking class on blocks
            addNoClicking();

            document.getElementById('game-over').play();

            setTimeout(() => {
                // Remove Background Music To the Game
                document.getElementById('back-music').remove();

                Swal.fire({
                    title: `Game Over`,
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
            }, 1000)
            
            // Reload the current page
            setTimeout(() => {
                window.location.reload();
            }, 6000);
        }

        // Assuming you have an array of elements or a NodeList
        let elements = blocks;

        // Flag to track if all elements have the specific class
        let allElementsHaveClass = true;
        
        // Loop through each element
        for (var i = 0; i < elements.length; i++) {

            var element = elements[i];
        
            // Check if the element has the specific class
            if (!element.classList.contains('has-match')) {
                allElementsHaveClass = false;
                break; // No need to continue checking, we already found an element without the class
            }
        }

        // Check the flag to determine the result
        if (allElementsHaveClass) {
            clearInterval(timerInterval);
        }
        
    }, 1000);
});

// Effect Duration
const duration = 1000;

// Select Blocks Container
let blocksContainer = document.querySelector(".memory-game-blocks");

// Generate Icons
let icons = [
    'fa-brands fa-facebook fa-10x',
    'fa-brands fa-twitter fa-10x',
    'fa-brands fa-instagram fa-10x',
    'fa-brands fa-tiktok fa-10x',
    'fa-brands fa-linkedin fa-10x',
    'fa-brands fa-github fa-10x',
    'fa-brands fa-discord fa-10x',
    'fa-brands fa-youtube fa-10x',
    'fa-brands fa-wordpress fa-10x',
    'fa-brands fa-slack fa-10x',
    'fa-brands fa-figma fa-10x',
    'fa-brands fa-apple fa-10x',
    'fa-brands fa-google fa-10x',
    'fa-brands fa-stripe fa-10x',
    'fa-brands fa-algolia fa-10x',
    'fa-brands fa-docker fa-10x',
    'fa-brands fa-windows fa-10x',
    'fa-brands fa-paypal fa-10x',
    'fa-brands fa-stack-overflow fa-10x',
    'fa-brands fa-kickstarter fa-10x',
    'fa-brands fa-dribbble fa-10x',
    'fa-brands fa-dropbox fa-10x',
    'fa-brands fa-squarespace fa-10x',
    'fa-brands fa-android fa-10x',
    'fa-brands fa-shopify fa-10x',
    'fa-brands fa-medium fa-10x',
    'fa-brands fa-codepen fa-10x',
    'fa-brands fa-cloudflare fa-10x',
    'fa-brands fa-airbnb fa-10x',
    'fa-brands fa-vimeo fa-10x'
]

// Call Generate Blocks Function
generateBlocks()

// Create Array From Game Blocks
let blocks = Array.from(blocksContainer.children);

// Create Range Of Keys
let orderRange = Array.from(Array(blocks.length).keys());

Shuffle(orderRange);

// Add Order Css Property To Game Blocks
blocks.forEach((block, index) => {

    // Add CSS Order Property
    block.style.order = orderRange[index];

    // Add Click Event
    block.addEventListener('click', function () {
        // Trigger The Flip Block Function
        flipBlock(block);
    });
});

// Add is-flipped Func
function isFlipped() {

    blocks.forEach(block => {
        block.classList.add('is-flipped');
    })

    setTimeout(() => {
        for (let block of blocks) {
            block.classList.remove('is-flipped');
        }
    }, 2000);
}

// Add No Clicking Function
function addNoClicking() {

    // Add Class No Clicking on Main Container
    blocksContainer.classList.add('no-clicking');
}

// Check Is Flipped Function
function isFlipped2ndV() {

    blocks.forEach(block => {

        if (block.classList.contains('is-flipped')) {
            
            // Nothing
        } else {

            block.classList.add('is-flipped');
        }
    })
}

// Flip Block Function
function flipBlock(selectedBlock) {

    // Add Class is-flipped
    selectedBlock.classList.add('is-flipped');

    // Collect All Flipped Cards
    let flippedBlocks = blocks.filter(block => block.classList.contains('is-flipped'));

    // If Theres Two Selected Blocks
    if (flippedBlocks.length === 2) {

        // Stop Clicking Function
        stopClicking();

        // Check Matched Block Function
        matchedBlocksChecker(flippedBlocks[0], flippedBlocks[1]);
    }

    // Assuming you have an array of elements or a NodeList
    let elements = blocks;

    // Flag to track if all elements have the specific class
    let allElementsHaveClass = true;
    
    // Loop through each element
    for (var i = 0; i < elements.length; i++) {

        var element = elements[i];
    
        // Check if the element has the specific class
        if (!element.classList.contains('has-match')) {
            allElementsHaveClass = false;
            break; // No need to continue checking, we already found an element without the class
        }
    }

    // Check the flag to determine the result
    if (allElementsHaveClass) {

        document.getElementById('cel').play();

        // Remove Background Music To the Game
        document.getElementById('back-music').remove();

        Swal.fire({
            title: `Good Job`,
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
        });

        // Reload the current page
        setTimeout(() => {
            window.location.reload();
        }, 6000);
    }
}

// Stop Clicking Function
function stopClicking() {

    // Add Class No Clicking on Main Container
    blocksContainer.classList.add('no-clicking');

    // Wait Duration
    setTimeout(() => {

        // Remove Class No Clicking After The Duration
        blocksContainer.classList.remove('no-clicking');
    }, duration);
}

// Check Matched Block
function matchedBlocksChecker(firstBlock, secondBlock) {

    let triesElement = document.querySelector('.tries span');

    if (firstBlock.dataset.tech === secondBlock.dataset.tech) {

        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');

        document.getElementById('success').play();

        firstBlock.classList.add('no-clicking');
        secondBlock.classList.add('no-clicking');
    } else {

        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

        setTimeout(() => {

            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
        }, duration);
        
        document.getElementById('fail').play();
    }

    // Save Wrong Tries count value in Local Storage
    localStorage.setItem('Wrong Tries', triesElement.innerHTML);
}

// Shuffle Func
function Shuffle(arr) {

    // Setting Vars
    let cur = arr.length,
        temp,
        random;
    
    while (cur > 0) {

        // Get Random Number
        random = Math.floor(Math.random() * cur);

        // Decrease Length By One
        cur--;

        // [1] Save Current Element in Stash
        temp = arr[cur];

        // [2] Current Element = Random Element
        arr[cur] = arr[random];

        // [3] Random Element = Get Element From Stash
        arr[random] = temp;
    }

    return arr
}

// Generate Game Blocks Function
function generateBlocks() {

    let numOfElems = 7;

    for (let i = 0; i < numOfElems; i++) {

        // Create Elemenets
        let block = document.createElement('div');
        let front = document.createElement('div');
        let back = document.createElement('div');
        let icon = document.createElement('i');

        // Append Elements
        block.appendChild(front);
        block.appendChild(back);
        back.appendChild(icon);
        blocksContainer.appendChild(block);

        // Add Classes to Elements
        block.setAttribute('data-tech', icons[i].split(' ')[icons[i].split(' ').length - 2].split('-')[icons[i].split(' ')[icons[i].split(' ').length - 2].split('-').length - 1]);
        block.setAttribute('class', 'game-block');
        front.setAttribute('class', 'front');
        front.className += ' face';
        back.setAttribute('class', 'back');
        back.className += ' face';
        icon.setAttribute('class', icons[i]);
    }

    for (let i = 0; i < numOfElems; i++) {

        // Create Elemenets
        let block = document.createElement('div');
        let front = document.createElement('div');
        let back = document.createElement('div');
        let icon = document.createElement('i');

        // Append Elements
        block.appendChild(front);
        block.appendChild(back);
        back.appendChild(icon);
        blocksContainer.appendChild(block);

        // Add Classes to Elements
        block.setAttribute('data-tech', icons[i].split(' ')[icons[i].split(' ').length - 2].split('-')[icons[i].split(' ')[icons[i].split(' ').length - 2].split('-').length - 1]);
        block.setAttribute('class', 'game-block');
        front.setAttribute('class', 'front');
        front.className += ' face';
        back.setAttribute('class', 'back');
        back.className += ' face';
        icon.setAttribute('class', icons[i]);
    }
}

// Retrieve Values from Local Storage
let storedName = localStorage.getItem('PlayerName') || 'Unknown';
let storedWrongTriesCount = localStorage.getItem('Wrong Tries') || 0;

// Check if Name is Null
if (storedName === 'null') {

    // Add Player in the Leaderboard
    addPlayerRow(storedName = 'Unknown', storedWrongTriesCount);
} else {

    // Add Player in the Leaderboard
    addPlayerRow(storedName, storedWrongTriesCount);
}

// Add Player Row in Leaderboard Function
function addPlayerRow(player, WrongTries) {
    
    let leaderboardTable = document.getElementById('leaderboard');

    // Create Elements
    let row = document.createElement('tr');
    let cellOne = document.createElement('td');
    let cellTwo = document.createElement('td');

    // Append Elements
    row.appendChild(cellOne);
    row.appendChild(cellTwo);
    leaderboardTable.appendChild(row);

    // Assign Saved Values from Local Storage to The Cells
    cellOne.innerHTML = player;
    cellTwo.innerHTML = WrongTries;
}