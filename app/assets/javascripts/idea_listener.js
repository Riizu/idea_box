function listenForVotes() {
    $('.ideas').on('click', 'button.thumbs-up', function(e) {
        upvoteIdea(e.currentTarget.parentElement.parentElement.dataset.id);
    });

    $('.ideas').on('click', 'button.thumbs-down', function(e) {
        downvoteIdea(e.currentTarget.parentElement.parentElement.dataset.id);
    });
}

function listenForNewIdeas() {
    $('#idea-form').submit(function() {
        var params = $(this).serialize();
        
        createIdea(params);
        $(this).closest('form').find("#title").val("");
        $(this).closest('form').find("#body").val("");

        return false;
    });
}

function listenForDeletes() {
    $('.ideas').on('click', 'button.delete', function(e) {
        deleteIdea(e.currentTarget.parentElement.parentElement.dataset.id);
    });
}

function listenForEdits() {
     $(".ideas").on("keydown", function(e) {
           if(e.which == 13 && e.target.className == "title") {
               updateIdeaTitle(e.target.parentElement.parentElement.dataset.id ,e.target.textContent);
            e.target.blur();
            e.preventDefault();
           } else if (e.which == 13 && e.target.className == "body") {
               updateIdeaBody(e.target.parentElement.parentElement.dataset.id ,e.target.textContent);
            e.target.blur();
            e.preventDefault();
           }
       });
    }

function listenForSearches() {
    $('#search-field').on('input', function(e) {
        var targetVal = $('#search-field').val();

        searchElements(targetVal);
    });
}