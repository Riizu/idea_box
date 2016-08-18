//= require idea

describe("generateHtml", function() {

  it("should generate html for a given idea object", function() {
    var idea = {
        id: 1,
        title: 'Test Title',
        body: 'The best body around',
        quality: 'swill',
    };
    var expectedResult = "<div class='idea' id='idea-1' data-id='1'>" +
                            "<div class='header quality-swill'>" + 
                                "<span class='quality'>swill </span>" +
                                "<span class='title' contenteditable='true'>Test Title</span>" +
                            "</div>" +
                            "<div>" +
                                "<span class='body' contenteditable='true'>The best body around</span>" +
                            "</div>" +
                            "<div>" +
                                "<button class='thumbs-up'>Thumbs Up</button>" +
                                "<button class='thumbs-down'>Thumbs Down</button>" +
                                "<button class='delete'>Delete</button>" +
                            "</div>" +   
                        "</div>";

    var result = generateIdeaHtml(idea);
    
    expect(result).toBe(expectedResult);
  });

});