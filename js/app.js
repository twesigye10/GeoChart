google.load("visualization", "1", {
    packages: ["geochart"]
});
google.setOnLoadCallback(drawRegionsMap);

function drawRegionsMap() {

    var jsonDataString = $.ajax({
        url: "http://emotional-apps.com/apis/meit/stats/getdata.php?test=1&gender=all&age=all&begindate=2000-01-01&enddate=2016-12-20",
        dataType: "json",
        async: false
    }).responseText;

    var jsonDataObject = JSON.parse(jsonDataString);

    var jsonDataTableFormat = '{"cols": [ {"id":"","label":"Country","pattern":"","type":"string"},{"id":"","label":"Score","pattern":"","type":"number"}],"rows": [';

    jQuery.each(jsonDataObject, function() {
        jsonDataTableFormat += '{"c":[{"v":"' + this.country + '","f":null},{"v":' + this.score_average + ',"f":null}]},';
        // console.log("c:"+this.country+",avg:"+this.score_average);
    });
    //	jsonDataTableFormat = jsonDataTableFormat.slice(0, -1);

    jsonDataTableFormat += ']}';
    //     console.log(jsonDataTableFormat);

    // Create our data table out of JSON data loaded from server.
    var data = new google.visualization.DataTable(jsonDataTableFormat);

    var options = {};

    var chart = new google.visualization.GeoChart(document.getElementById('chart_div'));

    chart.draw(data, options);
}