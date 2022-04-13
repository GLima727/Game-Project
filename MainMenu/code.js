
function openInstructions() {
    var container = document.getElementById('Instructions');
    container.style.display = 'grid';
}
function openSettings() {
    var container = document.getElementById('Settings');
    container.style.display = 'grid';
}

document.addEventListener('mouseup', function(e) {
    var container = document.getElementById('Instructions');
    if (!container.contains(e.target)) {
        container.style.display = 'none';
    }
});
document.addEventListener('mouseup', function(e) {
    var container2 = document.getElementById('Settings');
    if (!container2.contains(e.target)) {
        container2.style.display = 'none';
    }
});
