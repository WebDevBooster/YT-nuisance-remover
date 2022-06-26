$( document ).ready(function() {
    let labelElement,
        clarifyBox,
        clarifyBoxBtn,
        clarifyBoxBtnId;

    // Select the node that will be observed for mutations
    const targetBodyNode = $('body')[0];

    // Options for the observer (which mutations to observe)
    const config = { attributes: false, childList: true, subtree: true };

    function removeLabelsAndButton() {
        // Hide all labels except the first one because the first one is the likes counter
        labelElement.each(function (index) {
            if (index > 0 && labelElement.is(':visible')) {
                $(this).hide();
            }
        });

        if (clarifyBox.is(":empty") && clarifyBoxBtnId.length) {
            // If the clarifyBox is EMPTY and our clarifyBoxBtn is there,
            // the user must have loaded a NEW video with empty clarifyBox.
            clarifyBoxBtnId.remove();
        }
    }

    function handleClarityBox() {
        // clarity box example: youtube.com/watch?v=KqNHdY90StU
        if (!clarifyBox.is(":empty") && !clarifyBoxBtnId.length) {
            clarifyBoxBtn.insertBefore(clarifyBox);
            clarifyBox.hide();

            clarifyBoxBtn.click(function () {
                $(this).toggleClass("ytnr-adjust-bottom-margin");
                clarifyBox.toggle("slow");
            });
        } else if (clarifyBox.is(':visible')) {
            clarifyBox.hide();

            clarifyBoxBtn.click(function () {
                $(this).toggleClass("ytnr-adjust-bottom-margin");
                clarifyBox.toggle("slow");
            });
        }
    }

    // Callback function to execute when mutations are observed
    const callback = function(mutationsList, observer) {
        labelElement = $('#top-level-buttons-computed yt-formatted-string');
        clarifyBox = $('#clarify-box');
        clarifyBoxBtn = $(`<div id="ytnr-cbox-toggler" style="height: 20px; display: flex; justify-content: flex-end; fill: gray; margin-bottom: -20px;"><svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="display: block; width: 20px; height: 100%;"><g class="style-scope yt-icon"><path d="M13,17h-2v-6h2V17z M13,7h-2v2h2V7z M12,3c-4.96,0-9,4.04-9,9s4.04,9,9,9c4.96,0,9-4.04,9-9S16.96,3,12,3 M12,2 c5.52,0,10,4.48,10,10s-4.48,10-10,10C6.48,22,2,17.52,2,12S6.48,2,12,2L12,2z" class="style-scope yt-icon"></path></g></svg></div>`);
        clarifyBoxBtnId = $("#ytnr-cbox-toggler");

        // Use traditional 'for loops' for IE 11
        for(const mutation of mutationsList) {
            //console.log(`mutation.target.id: ${mutation.target.id}`);
            if (mutation.target.id === 'container'
                || mutation.target.id === 'info-contents'
                || mutation.target.id === 'contents'
                || mutation.target.id === 'content'
            ) {
                // We have changes inside container with the button labels
                removeLabelsAndButton();
            }

            if (mutation.target.id === 'clarify-box') {
                // We have changes inside 'clarify-box'
                handleClarityBox();
            }
        }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetBodyNode, config);

});
