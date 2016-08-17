$(document).ready(function(){    
    function generateIdeaHtml(idea) {
        return "<div id='idea-'" + idea.id + ">" +
                    "<div class='header quality-'" + idea.quality + ">" + 
                        "<span>" + idea.quality + " </span>" +
                        "<span>" + idea.title + "</span>" +
                    "</div>" +
                    "<div>" +
                        "<span>" + idea.body + "</span>" +
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

    $('#idea-form').submit(function() {
        var params = $(this).serialize();
        
        addNewIdea(params);
        $(this).closest('form').find("#title").val("");
        $(this).closest('form').find("#body").val("");

        return false;
    });
});