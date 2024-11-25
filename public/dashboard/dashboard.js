// References for the dropdowns and charts
const stateSelect = document.getElementById("state-select");
const districtSelect = document.getElementById("district-select");
const npkChartCanvas = document.getElementById("npkChart").getContext("2d");
const phChartCanvas = document.getElementById("phChart").getContext("2d");
Chart.defaults.plugins.legend.display = true; // Optional: Adjust legend display
Chart.defaults.maintainAspectRatio = false;  // Ensure charts resize correctly


let npkChart;
let phChart;

// Load data from data.json
let data;

// Fetch JSON data
fetch("data.json")
    .then((response) => response.json())
    .then((jsonData) => {
        data = jsonData;
        populateStateDropdown();
    })
    .catch((err) => console.error("Error fetching data:", err));

// Populate state dropdown
function populateStateDropdown() {
    const states = [...new Set(data.map((entry) => entry.state))]; // Extract unique states
    states.forEach((state) => {
        const option = document.createElement("option");
        option.value = state;
        option.textContent = state;
        stateSelect.appendChild(option);
    });
}

// Populate district dropdown based on selected state
stateSelect.addEventListener("change", () => {
    const selectedState = stateSelect.value;
    districtSelect.innerHTML = '<option value="">Select District</option>'; // Reset districts

    if (selectedState) {
        const districts = [
            ...new Set(data.filter((entry) => entry.state === selectedState).map((entry) => entry.district)),
        ];
        districts.forEach((district) => {
            const option = document.createElement("option");
            option.value = district;
            option.textContent = district;
            districtSelect.appendChild(option);
        });
    }
});

// Handle district selection and update charts
districtSelect.addEventListener("change", () => {
    const selectedDistrict = districtSelect.value;
    if (selectedDistrict) {
        const filteredData = data.find(
            (entry) => entry.state === stateSelect.value && entry.district === selectedDistrict
        );
        if (filteredData) {
            updateCharts(filteredData);
        }
    }
});

// Update NPK Pie Chart and pH Bar Chart
function updateCharts(filteredData) {
    // Destroy previous charts
    if (npkChart) npkChart.destroy();
    if (phChart) phChart.destroy();

    // NPK Pie Chart
    npkChart = new Chart(npkChartCanvas, {
        type: "pie",
        data: {
            labels: ["Nitrogen (N)", "Phosphorus (P)", "Potassium (K)"],
            datasets: [
                {
                    data: [filteredData.N, filteredData.P, filteredData.K],
                    backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "top",
                },
            },
        },
    });

    // pH Bar Chart
    phChart = new Chart(phChartCanvas, {
        type: "bar",
        data: {
            labels: ["pH Value"],
            datasets: [
                {
                    label: "pH",
                    data: [filteredData.pH],
                    backgroundColor: "#4CAF50",
                },
            ],
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
}
