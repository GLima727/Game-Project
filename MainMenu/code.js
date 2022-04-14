
function openInstructions() {
    var container = document.getElementById('Instructions');
    container.style.animation = "fadeIn 0.5s linear, float 3s ease-in-out infinite"
    container.style.display = 'block';
}
function openSettings() {
    var container = document.getElementById('Settings');
    container.style.animation = "fadeIn 0.5s linear, float 3s ease-in-out infinite"
    container.style.display = 'grid';
}

function closeSettings() {
    var container = document.getElementById('Settings');
    document.getElementById("slowSpeedButton").style.backgroundColor = "#d6eaec"; 
    document.getElementById("normalSpeedButton").style.backgroundColor = "#d6eaec"; 
    document.getElementById("fastSpeedButton").style.backgroundColor = "#d6eaec"; 
    container.style.display = 'none';
}

document.addEventListener('mouseup', function(e) {
    var container = document.getElementById('Instructions');

    if (!container.contains(e.target)) {
        container.style.display = 'none';
    }

});

