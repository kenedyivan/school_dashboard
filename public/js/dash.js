// Called when page is first loaded
function loadStats(){
    ake();
}

function ake() {
    let e = document.getElementById("sel");
    let value = e.options[e.selectedIndex].value;

    // Called to get enrollment for each school
    axios.get(`/enrollment-stats/${value}`)
        .then(function (response) {
            // handle success
            console.log(response.data);

            let data = response.data;
            let school = data.school;
            let boysPlot = JSON.parse(data.boys).map(myFunction);
            let girlsPlot = JSON.parse(data.girls).map(myFunction);

            // call the chart function
            char_enrollment(school, boysPlot, girlsPlot);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });

    // Called for chart_attendance for each school
    axios.get(`/attendance/${value}`)
        .then(function (response) {
            // handle success
            console.log(response.data);

            let data = response.data;
            let school = data.school;
            let boysPlot = JSON.parse(data.boys).map(myFunction);
            let girlsPlot = JSON.parse(data.girls).map(myFunction);

            // call the chart function
            chart_attendance(school, boysPlot, girlsPlot);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });

    // Called for teacher pupil ratio

}

function myFunction(num) {
    return parseInt(num, 10);
}

function char_enrollment(school, boysPlot, girlsPlot) {
    var ctxx = document.getElementById("mySuperChart").getContext("2d");
    var myChart = new Chart(ctxx, {
        type: 'bar',
        data: {
            labels: [
                "p1",
                "p2",
                "p3",
                "p4",
                "p5",
                "p6",
                "p7"
            ],
            datasets: [
                {
                    label: "Boys",
                    backgroundColor: "pink",
                    borderColor: "red",
                    borderWidth: 1,
                    data: boysPlot
                },
                {
                    label: "Girls",
                    backgroundColor: "lightblue",
                    borderColor: "blue",
                    borderWidth: 1,
                    data: girlsPlot
                }
            ]
        },
        options: {
            responsive: true,
            legend: {
                position: "top"
            },
            title: {
                display: true,
                text: school
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

function chart_attendance(school, boysPlot, girlsPlot) {
    var ctxx = document.getElementById("chart_attendance").getContext("2d");
    var myChart = new Chart(ctxx, {
        type: 'line',
        data: {
            labels: [
                "P1",
                "P2",
                "P3",
                "P4",
                "P5",
                "P6",
                "P7"
            ],
            datasets: [
                {
                    label: "Boys Attendence",
                    backgroundColor: "pink",
                    borderColor: "red",
                    borderWidth: 1,
                    data: boysPlot
                },
                {
                    label: "Girls Attendence",
                    backgroundColor: "lightblue",
                    borderColor: "blue",
                    borderWidth: 1,
                    data: girlsPlot
                },

            ]
        },
        options: {
            responsive: true,
            legend: {
                position: "top"
            },
            title: {
                display: true,
                text: school
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}


/*var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange','white'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3,3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});*/

// var ctx = document.getElementById('chart').getContext('2d');
// var chart = new Chart(ctx, {
//     type: 'line',
//     data: {
//         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//         datasets: [{
//             label: '# of Votes',
//             data: [12, 19, 3, 5, 2, 3],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//                 'rgba(153, 102, 255, 0.2)',
//                 'rgba(255, 159, 64, 0.2)'
//             ],
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 159, 64, 1)'
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero: true
//                 }
//             }]
//         }
//     }
// });


//leaflet js
var mymap = L.map('mapid').setView([51.505, -0.09], 13);


var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);


var planes = [
    ["refactory", 51.5, -0.09],
    ["laboremus", 51.502, -0.10],
    ["geo gecko", 51.508, -0.11],
    ["kiu", 51.509, -0.12]
];

for (var i = 0; i < planes.length; i++) {
    marker = new L.marker([planes[i][1], planes[i][2]])
        .bindPopup(planes[i][0])
        .addTo(mymap);
}


var circle = L.circle([51.510, -0.11], {
    color: 'green',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(mymap);

//nasted pie 
var randomScalingFactor = function () {
    return Math.round(Math.random() * 100);
};
var randomColorFactor = function () {
    return Math.round(Math.random() * 255);
};

var config = {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
            ],
            backgroundColor: [
                "#F7464A",
                "#46BFBD",
                "#FDB45C",
                "#949FB1",
                "#4D5360",
            ],
        }, {
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
            ],
            backgroundColor: [
                "#F7464A",
                "#46BFBD",
                "#FDB45C",
                "#949FB1",
                "#4D5360",
            ],
        }, {
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
            ],
            backgroundColor: [
                "#F7464A",
                "#46BFBD",
                "#FDB45C",
                "#949FB1",
                "#4D5360",
            ],
        }],
        labels: [
            "Red",
            "Green",
            "Yellow",
            "Grey",
            "Dark Grey"
        ]
    },
    options: {
        responsive: true
    }
};

var ctx = document.getElementById("chart-area").getContext("2d");
var myDoughnut = new Chart(ctx, config);

//nasted pie two
var randomScalingFactor = function () {
    return Math.round(Math.random() * 100);
};
var randomColorFactor = function () {
    return Math.round(Math.random() * 255);
};

var config = {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
            ],
            backgroundColor: [
                "#F7464A",
                "#46BFBD",
                "#FDB45C",
                "#949FB1",
                "#4D5360",
            ],
        }, {
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
            ],
            backgroundColor: [
                "#F7464A",
                "#46BFBD",
                "#FDB45C",
                "#949FB1",
                "#4D5360",
            ],
        }, {
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
            ],
            backgroundColor: [
                "#F7464A",
                "#46BFBD",
                "#FDB45C",
                "#949FB1",
                "#4D5360",
            ],
        }],
        labels: [
            "Red",
            "Green",
            "Yellow",
            "Grey",
            "Dark Grey"
        ]
    },
    options: {
        responsive: true
    }
};

var ctx = document.getElementById("nasted2").getContext("2d");
var myDoughnut = new Chart(ctx, config);

//nasted pie three
var randomScalingFactor = function () {
    return Math.round(Math.random() * 100);
};
var randomColorFactor = function () {
    return Math.round(Math.random() * 255);
};

var config = {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
            ],
            backgroundColor: [
                "#F7464A",
                "#46BFBD",
                "#FDB45C",
                "#949FB1",
                "#4D5360",
            ],
        }, {
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
            ],
            backgroundColor: [
                "#F7464A",
                "#46BFBD",
                "#FDB45C",
                "#949FB1",
                "#4D5360",
            ],
        }, {
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
            ],
            backgroundColor: [
                "#F7464A",
                "#46BFBD",
                "#FDB45C",
                "#949FB1",
                "#4D5360",
            ],
        }],
        labels: [
            "Red",
            "Green",
            "Yellow",
            "Grey",
            "Dark Grey"
        ]
    },
    options: {
        responsive: true
    }
};

var ctx = document.getElementById("nasted3").getContext("2d");
var myDoughnut = new Chart(ctx, config);

//d3 charts with dimple.js

var ctx = document.getElementById('trends').getContext('2d');
var chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});


//bar chart begins here
// var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//         var color = Chart.helpers.color;
//         var barChartData = {
//             labels: ["January", "February", "March", "April", "May", "June", "July"],
//             datasets: [{
//                 label: 'Dataset 1',
//                 backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
//                 borderColor: window.chartColors.red,
//                 borderWidth: 1,
//                 data: [
//                     randomScalingFactor(),
//                     randomScalingFactor(),
//                     randomScalingFactor(),
//                     randomScalingFactor(),
//                     randomScalingFactor(),
//                     randomScalingFactor(),
//                     randomScalingFactor()
//                 ]
//             }, {
//                 label: 'Dataset 2',
//                 backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
//                 borderColor: window.chartColors.blue,
//                 borderWidth: 1,
//                 data: [
//                     randomScalingFactor(),
//                     randomScalingFactor(),
//                     randomScalingFactor(),
//                     randomScalingFactor(),
//                     randomScalingFactor(),
//                     randomScalingFactor(),
//                     randomScalingFactor()
//                 ]
//             }]

//         };

//         window.onload = function() {
//             var ctx = document.getElementById("canvas").getContext("2d");
//             window.myBar = new Chart(ctx, {
//                 type: 'bar',
//                 data: barChartData,
//                 options: {
//                     responsive: true,
//                     legend: {
//                         position: 'top',
//                     },
//                     title: {
//                         display: true,
//                         text: 'Chart.js Bar Chart'
//                     }
//                 }
//             });

//         };

//         document.getElementById('randomizeData').addEventListener('click', function() {
//             var zero = Math.random() < 0.2 ? true : false;
//             barChartData.datasets.forEach(function(dataset) {
//                 dataset.data = dataset.data.map(function() {
//                     return zero ? 0.0 : randomScalingFactor();
//                 });

//             });
//             window.myBar.update();
//         });

//         var colorNames = Object.keys(window.chartColors);
//         document.getElementById('addDataset').addEventListener('click', function() {
//             var colorName = colorNames[barChartData.datasets.length % colorNames.length];;
//             var dsColor = window.chartColors[colorName];
//             var newDataset = {
//                 label: 'Dataset ' + barChartData.datasets.length,
//                 backgroundColor: color(dsColor).alpha(0.5).rgbString(),
//                 borderColor: dsColor,
//                 borderWidth: 1,
//                 data: []
//             };

//             for (var index = 0; index < barChartData.labels.length; ++index) {
//                 newDataset.data.push(randomScalingFactor());
//             }

//             barChartData.datasets.push(newDataset);
//             window.myBar.update();
//         });

//         document.getElementById('addData').addEventListener('click', function() {
//             if (barChartData.datasets.length > 0) {
//                 var month = MONTHS[barChartData.labels.length % MONTHS.length];
//                 barChartData.labels.push(month);

//                 for (var index = 0; index < barChartData.datasets.length; ++index) {
//                     //window.myBar.addData(randomScalingFactor(), index);
//                     barChartData.datasets[index].data.push(randomScalingFactor());
//                 }

//                 window.myBar.update();
//             }
//         });

//         document.getElementById('removeDataset').addEventListener('click', function() {
//             barChartData.datasets.splice(0, 1);
//             window.myBar.update();
//         });

//         document.getElementById('removeData').addEventListener('click', function() {
//             barChartData.labels.splice(-1, 1); // remove the label first

//             barChartData.datasets.forEach(function(dataset, datasetIndex) {
//                 dataset.data.pop();
//             });

//             window.myBar.update();
//         });