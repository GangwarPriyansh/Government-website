// let ctx = document.getElementById('myChart');
// let myChart;
// let Jsondata;

// fetch("data.json")
// .then(function(response){
//    if(response.status == 200){
//       return response.json();
//    }
// })
// .then(function(data){ 
//    Jsondata = data; 
//    createChart(Jsondata, 'bar');
// });	

// function createChart(data, type){
// 	myChart = new Chart(ctx, {
// 		type: type, 
// 		data: {
// 		  labels: data.map(row => row.month), 
// 		  datasets: [{
// 		    label: '# of Income',
// 		    data: data.map(row => row.income),
// 		    borderWidth: 1
// 		  }]
// 		},
// 		options: {
// 		  scales: {
// 		    y: {
// 		      beginAtZero: true
// 		    }
// 		  },
// 		  responsive: true,
// 		  maintainAspectRatio: false,
// 		}
// 	});
// }

// function setChartType(chartType){
// 	myChart.destroy();
// 	createChart(Jsondata, chartType);
// }
let ctx = document.getElementById('myChart');
let myChart;
let Jsondata;

fetch("data.json")
.then(function(response){
   if(response.status == 200){
      return response.json();
   }
})
.then(function(data){ 
   Jsondata = data; 
   createChart(Jsondata, 'bar');
});	

function createChart(data, type){
    const labels = data.map(row => `Entry ${data.indexOf(row) + 1}`); // Assign dynamic labels
    const N = data.map(row => row.N);
    const P = data.map(row => row.P);
    const K = data.map(row => row.K);
    const temperature = data.map(row => row.temperature);
    
    myChart = new Chart(ctx, {
        type: type, 
        data: {
            labels: labels, // Use dynamic labels
            datasets: [
                {
                    label: 'N Value',
                    data: N,
                    borderWidth: 1
                },
                {
                    label: 'P Value',
                    data: P,
                    borderWidth: 1
                },
                {
                    label: 'K Value',
                    data: K,
                    borderWidth: 1
                },
                {
                    label: 'Temperature',
                    data: temperature,
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            responsive: true,
            maintainAspectRatio: false,
        }
    });
}

function setChartType(chartType){
    myChart.destroy();
    createChart(Jsondata, chartType);
}
