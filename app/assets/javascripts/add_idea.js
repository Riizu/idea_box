$(document).ready(function(){    
    var generateIdeaHtml = function(response) {
        return "<div id='idea-'" + response.idea.id + ">" +
                    "<div class='header quality-'" + response.idea.quality + ">" + 
                        "<span>" + response.idea.quality + " </span>" +
                        "<span>" + response.idea.title + "</span>" +
                    "</div>" +
                    "<div>" +
                        "<span>" + response.idea.body + "</span>" +
                    "</div>" +
                "</div>";
    };
    
    var addIdea = function(params) {
        $.ajax({
            type: "POST",
            url: "api/v1/ideas",
            data: params,
            dataType: "JSON"
        })
        .success(function(json){
            $('.ideas').prepend(
                generateIdeaHtml(json)
            );
        });
    };

    $('#idea-form').submit(function() {
        var params = $(this).serialize();
        
        addIdea(params);
        $(this).closest('form').find("#title").val("");
        $(this).closest('form').find("#body").val("");

        return false;
    });
});