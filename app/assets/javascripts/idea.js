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

function createIdea(params) {
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
    return {
        header: $("#idea-" + idea.id + " .header").prop('class'),
        body: $("#idea-" + idea.id + " .header .quality").text(),
    };
}

function loadAllIdeas() {
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

function upvoteIdea(id) {
    $.ajax({
        type: "GET",
        url: "api/v1/ideas/" + id + "/upvote",
        dataType: "JSON"
    })
    .success(function(json){
        updateIdeaQuality(json.idea);
    });    
}

function downvoteIdea(id) {
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
        var withinTitle = $(this).find('.header .title').text().includes(targetVal);
        var withinBody = $(this).find('div .body').text().includes(targetVal);
        var validSearch = withinTitle || withinBody;
        var empty = (targetVal === "");

        if(validSearch || empty) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
}