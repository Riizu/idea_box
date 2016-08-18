$(document).ready(function() {
    
    function generateIdeaHtml(idea) {
        return "<div class='idea' id='idea-" + idea.id + "' data-id='" + idea.id + "'>" +
                    "<div class='header quality-" + idea.quality + "'>" + 
                        "<span class='quality'>" + idea.quality + " </span>" +
                        "<span class='title' contenteditable='true'>" + idea.title + "</span>" +
                    "</div>" +
                    "<div>" +
                        "<span class='body' contenteditable='true'>" + idea.body + "</span>" +
                    "</div>" +
                    "<div>" +
                        "<button class='thumbs-up'>Thumbs Up</button>" +
                        "<button class='thumbs-down'>Thumbs Down</button>" +
                        "<button class='delete'>Delete</button>" +
                    "</div>" +
                    
                "</div>";
    }
    
    function addNewIdea(params) {
        $.ajax({
            type: "POST",
            url: "api/v1/ideas",
            data: params,
            dataType: "JSON"
        })
        .success(function(json){
            $('.ideas').prepend(
                generateIdeaHtml(json.idea)
            );
        });
    }

    function updateIdeaQuality(idea) {
        $("#idea-" + idea.id + " .header").prop('class', 'header ' + idea.quality);
        $("#idea-" + idea.id + " .header .quality").text(idea.quality + " ");
    }

    function loadIdeas() {
        $.ajax({
            type: "GET",
            url: "api/v1/ideas",
            dataType: "JSON"
        })
        .success(function(json){
            json.ideas.forEach(function(idea) {
                $('.ideas').append(
                    generateIdeaHtml(idea)
                );    
            }); 
        });
    }
   
    function upvote(id) {
         $.ajax({
            type: "GET",
            url: "api/v1/ideas/" + id + "/upvote",
            dataType: "JSON"
        })
        .success(function(json){
            updateIdeaQuality(json.idea);
        });    
    }

    function downvote(id) {
         $.ajax({
            type: "GET",
            url: "api/v1/ideas/" + id + "/downvote",
            dataType: "JSON"
        })
        .success(function(json){
            updateIdeaQuality(json.idea);
        });    
    }

    function deleteIdea(id) {
        $.ajax({
            type: "DELETE",
            url: "api/v1/ideas/" + id,
            dataType: "JSON"
        })
        .success(function(json){
            $('#idea-' + json.idea.id).remove();
        });
    }

    function updateIdeaBody(id, body) {
        $.ajax({
            type: "PATCH",
            url: "api/v1/ideas/" + id + "?body=" + body,
            dataType: "JSON"
        })
        .success(function(json){
            $("#idea-" + id + "div .body").text(body);
        });
    }

    function updateIdeaTitle(id, title) {
        $.ajax({
            type: "PATCH",
            url: "api/v1/ideas/" + id + "?title=" + title,
            dataType: "JSON"
        })
        .success(function(json){
            $("#idea-" + id + ".header .title").text(title);
        });
    }

    function searchElements(targetVal) {
        $('.idea').each(function() {
            var withinTitles = $(this).add('.header .title').text().includes(targetVal);
            var withinBodies = $(this).add('div .body').text().includes(targetVal)
            var validSearch = withinTitles || withinBodies;
            var empty = (targetVal === "");

            if(validSearch || empty) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }

    function listenForVotes() {
        $('.ideas').on('click', 'button.thumbs-up', function(e) {
            upvote(e.currentTarget.parentElement.parentElement.dataset.id);
        });

        $('.ideas').on('click', 'button.thumbs-down', function(e) {
            downvote(e.currentTarget.parentElement.parentElement.dataset.id);
        });
    }

    function listenForNewIdeas() {
        $('#idea-form').submit(function() {
            var params = $(this).serialize();
            
            addNewIdea(params);
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

    loadIdeas();
    listenForVotes();
    listenForNewIdeas();
    listenForDeletes();
    listenForEdits();
    listenForSearches();
});