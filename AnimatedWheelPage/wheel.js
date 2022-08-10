
var itemCircles = document.querySelectorAll('.item-circle');
var itemCircles_array = [...itemCircles];
var icon_image_top = document.querySelector('#ImageTop');
var icon_image_bottom = document.querySelector('#ImageBottom');

var item_circle_text_groups = document.querySelectorAll(".group-item-circle-text");

var icon_css_transition_property = "y ease var(--transition-duration)";
var branches = document.querySelectorAll('.branches .branch');
var currentBranch = branches[0]
var currentDegree = 0;
var rotateByDegree = 45;

var branchTimeout;
var icons = ["images/Icons-02.svg", "images/Icons-03.svg", "images/Icons-04.svg", "images/Icons-05.svg", "images/Icons-06.svg", "images/Icons-07.svg", "images/Icons-08.svg", "images/Icons-01.svg"];
icons.reverse();
var max = icons.length;

var previousItemIndex = max - 1;

var currentItemIndex = 0;

var wheelDirection = "forward" // [forward,backward]

function setCurrentIndex(i = 0) {
    if (i >= max)
        i = i - max;
    if (i < 0)
        i = max - 1;

    previousItemIndex = currentItemIndex;
    currentItemIndex = i;
}

function spinForward(by = rotateByDegree) {
    document.documentElement.style.setProperty("--transition-duration", "1s");

    wheelDirection = "forward";
    currentDegree = currentDegree + by;

    doIconSpin(currentItemIndex);
    setCurrentIndex(currentItemIndex - 1);
    doSpin();

}
function spinBackward(by = rotateByDegree) {
    document.documentElement.style.setProperty("--transition-duration", "1s");
    wheelDirection = "backward";
    currentDegree = currentDegree - by;
    setCurrentIndex(currentItemIndex + 1);
    doSpin();

}
function doSpin() {
    document.documentElement.style.setProperty("--circle-rotation", currentDegree + "deg");
    showCurrentBranch();
    doIconSpin();
    setActiveText();
}

function setActiveText() {
    item_circle_text_groups.forEach((el) => {
        el.classList.remove('active');
    });
    item_circle_text_groups[currentItemIndex].classList.add('active');
}


function showCurrentBranch() {
    currentBranch.classList.remove('spread');
    clearTimeout(branchTimeout);
    branchTimeout = setTimeout(function () {
        currentBranch = branches[currentItemIndex];
        currentBranch.classList.add('spread');
    }, 1);
}


function itemClickHandler() {
    var clickedIndex = (itemCircles_array.indexOf(this));

    if (clickedIndex == currentItemIndex) return;

    var distanceToClickedIndexFromCurrentIndex = clockwiseDistanceBetweenArrayIndexes(currentItemIndex, clickedIndex, max);

    currentItemIndex = clickedIndex;



    if (distanceToClickedIndexFromCurrentIndex < 4) {
        currentDegree = currentDegree - (rotateByDegree * distanceToClickedIndexFromCurrentIndex);
        wheelDirection = "backward";

        var duration = distanceToClickedIndexFromCurrentIndex;

        if (duration != 1)
            duration = duration / 2;

        document.documentElement.style.setProperty("--transition-duration", `${duration}s`);
    }
    else {
        currentDegree = currentDegree + (rotateByDegree * (max - distanceToClickedIndexFromCurrentIndex));
        wheelDirection = "forward";

        var duration = max - distanceToClickedIndexFromCurrentIndex;

        if (duration != 1)
            duration = duration / 2;

        document.documentElement.style.setProperty("--transition-duration", `${duration}s`);
    }



    doSpin();


}


function doIconSpin() {

    if (wheelDirection == "backward") {
        var prevIcon = IconGroup.querySelector('image:last-of-type');
        var nextIconIn = getNextIconIn();


        IconGroup.querySelectorAll('image').forEach((el) => {
            IconGroup.removeChild(el);
        });

        IconGroup.appendChild(prevIcon);
        IconGroup.appendChild(nextIconIn);


        nextIconIn.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", icons[currentItemIndex]);
        nextIconIn.style.transition = icon_css_transition_property;


        prevIcon.style.transition = "none";
        prevIcon.setAttributeNS(null, "y", "205");
        prevIcon.style.transition = icon_css_transition_property;

        setTimeout(function () {
            //prevIcon.setAttributeNS(null, "y", "385");
            //nextIconIn.setAttributeNS(null, "y", "252.5");
            prevIcon.setAttributeNS(null, "y", "395");
            nextIconIn.setAttributeNS(null, "y", "205");
        }, 1)
    }
    else if (wheelDirection == "forward") {
        var prevIcon = IconGroup.querySelector('image:last-of-type');
        var nextIconIn = getNextIconIn();


        IconGroup.querySelectorAll('image').forEach((el) => {
            IconGroup.removeChild(el);
        });

        IconGroup.appendChild(prevIcon);
        IconGroup.appendChild(nextIconIn);


        nextIconIn.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", icons[currentItemIndex]);
        nextIconIn.style.transition = icon_css_transition_property;


       // prevIcon.style.transition = "none";
        prevIcon.setAttributeNS(null, "y", "205");
        prevIcon.style.transition = icon_css_transition_property;

        setTimeout(function () {
            //nextIconIn.setAttributeNS(null, "y", "252.5");

            //prevIcon.setAttributeNS(null, "y", "100");

            nextIconIn.setAttributeNS(null, "y", "205");

            prevIcon.setAttributeNS(null, "y", "15");
        }, 1);
    }
}

function clockwiseDistanceBetweenArrayIndexes(from, to, size) {
    return from < to ? to - from : to + size - from;
}

function getNextIconIn() {
    var icon_image = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    icon_image.setAttributeNS(null, "width", "160");
    icon_image.setAttributeNS(null, "height", "160");
    icon_image.setAttributeNS(null, "x", "205");

    icon_image.style.transition = icon_css_transition_property;
    icon_image.setAttributeNS(null, "y", (wheelDirection == "forward" ? "425" : "50"));

    return icon_image;
}




itemCircles.forEach(function (_item) {
    _item.addEventListener('click', itemClickHandler)
});


//doSpin(0);
document.querySelector(".control.prev").click();