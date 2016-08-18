$(document).ready(function() {
    
    function generateIdeaHtml(idea) {
        return "<div id='idea-" + idea.id + "' data-id='" + idea.id + "'>" +
                    "<div class='header quality-" + idea.quality + "'>" + 
                        "<span class='quality'>" + idea.quality + " </span>" +
                        "<span>" + idea.title + "</span>" +
                    "</div>" +
                    "<div>" +
                        "<span>" + idea.body + "</span>" +
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

    loadIdeas();
    listenForVotes();
    listenForNewIdeas();
    listenForDeletes();
});