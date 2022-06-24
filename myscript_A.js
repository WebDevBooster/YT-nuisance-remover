$( document ).ready(function() {
    var labelElement,
        clarifyBox;

    function removeNuisance() {
        labelElement = $('#top-level-buttons-computed yt-formatted-string');
        clarifyBox = $('#clarify-box');
        // clarity box example: youtube.com/watch?v=KqNHdY90StU

        labelElement.each(function (index) {
            // index 0 label is the likes counter, we want to show it
            if (index > 0 && labelElement.is(':visible')) {
                $(this).hide();
            }
        });

        if (clarifyBox.is(':visible')) {
            clarifyBox.hide();
        }
    }

    // Select the node that will be observed for mutations
    const targetBodyNode = $('body')[0];

    // Options for the observer (which mutations to observe)
    const config = { attributes: false, childList: true, subtree: true };

    // Callback function to execute when mutations are observed
    const callback = function(mutationsList, observer) {
        // Use traditional 'for loops' for IE 11
        for(const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                removeNuisance();
            }
        }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetBodyNode, config);

});
