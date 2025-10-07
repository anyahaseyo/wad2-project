<template>
    <v-container class="py-8">
        <div>
            <h1 class="text-h5 text-primary font-weight-bold mb-1">
                Progress Analytics
            </h1>
            <p class="text-body-2 text-muted mb-4">
                Track your academic and wellness journey
            </p>
        </div>

        <!-- Stats Section -->
        <v-row dense class="mb-4">
            <v-col cols="12" sm="6" md="3">
                <v-card class="rounded-xl" elevation="0" variant="outlined">
                    <v-card-text class="text-center">
                        <v-icon icon="mdi-clock-time-four-outline" size="26" class="mb-2 text-primary" />
                        <div class="text-subtitle-2">Study Hours</div>
                        <div class="text-h6 font-weight-bold mt-1">1h 25m</div>
                        <div class="text-caption text-disabled">Next: 10</div>
                        <v-progress-linear :model-value="studyProgress" height="5" rounded color="primary" />
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <v-card class="rounded-xl" elevation="0" variant="outlined">
                    <v-card-text class="text-center">
                        <v-icon icon="mdi-target" size="26" class="mb-2 text-primary" />
                        <div class="text-subtitle-2">Tasks Completed</div>
                        <div class="text-h6 font-weight-bold mt-1">67%</div>
                        <div class="text-caption text-disabled">Next: 5</div>
                        <v-progress-linear :model-value="taskComplete" height="5" rounded color="primary" />
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <v-card class="rounded-xl" elevation="0" variant="outlined">
                    <v-card-text class="text-center">
                        <v-icon icon="mdi-fire" size="26" class="mb-2 text-primary" />
                        <div class="text-subtitle-2">Study Streak</div>
                        <div class="text-h6 font-weight-bold mt-1">5 days</div>
                        <div class="text-caption text-disabled">Next: 3</div>
                        <v-progress-linear :model-value="studyStreak" height="5" rounded color="primary" />
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <v-card class="rounded-xl" elevation="0" variant="outlined">
                    <v-card-text class="text-center">
                        <v-icon icon="mdi-heart-outline" size="26" class="mb-2 text-primary" />
                        <div class="text-subtitle-2">Wellness Check-ins</div>
                        <div class="text-h6 font-weight-bold mt-1">0 check-ins</div>
                        <div class="text-caption text-disabled">Next: 5</div>
                        <v-progress-linear :model-value="checkIn" height="5" rounded color="primary" />
                    </v-card-text>
                </v-card>
            </v-col>

        </v-row>
        <!-- Tabs -->
        <div class="custom-tabs">
            <button v-for="tab in tabs" :key="tab" :class="['tab-button', { active: activeTab === tab }]"
                @click="activeTab = tab">
                {{ tab }}
            </button>
        </div>

        <div class="tab-content">
            <div v-if="activeTab === 'Study Analytics'">

                <v-container fluid>
                    <v-row>
                        <!-- Daily Study Time Chart -->
                        <v-col cols="12" md="6">
                            <v-card class="pa-4">
                                <v-card-title>Daily Study Time (Last 7 Days)</v-card-title>
                                <v-card-subtitle>Minutes spent studying each day</v-card-subtitle>
                                <apexchart type="bar" height="250" :options="dailyStudyOptions"
                                    :series="dailyStudySeries" />
                            </v-card>
                        </v-col>

                        <!-- Study Time by Subject Chart -->
                        <v-col cols="12" md="6">
                            <v-card class="pa-4">
                                <v-card-title>Study Time by Subject</v-card-title>
                                <v-card-subtitle>Distribution of study hours</v-card-subtitle>
                                <apexchart type="donut" height="250" :options="subjectOptions"
                                    :series="subjectSeries" />
                            </v-card>
                        </v-col>
                    </v-row>

                    <v-row>
                        <!-- Productivity Trend Chart -->
                        <v-col cols="12">
                            <v-card class="pa-4">
                                <v-card-title>Productivity Trend</v-card-title>
                                <v-card-subtitle>Your self-rated productivity over time</v-card-subtitle>
                                <apexchart type="line" height="250" :options="productivityOptions"
                                    :series="productivitySeries" />
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>

            </div>

            <div v-else-if="activeTab === 'Task Progress'">

                <v-container fluid>
                    <v-row>
                        <!-- Task Completion Trends Chart -->
                        <v-col cols="12">
                            <v-card class="pa-4">
                                <v-card-title>Task Completion Trends</v-card-title>
                                <v-card-subtitle>Tasks created vs completed over the last 7 days</v-card-subtitle>
                                <apexchart type="bar" height="250" :options="taskCompletionOptions"
                                    :series="taskCompletionSeries" />
                            </v-card>
                        </v-col>


                    </v-row>
                    <!-- Task Stats (Total Tasks, Completed, Completion Rate) -->
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="12" sm="4">
                                <v-card class="rounded-xl" elevation="0" variant="outlined">
                                    <v-card-text class="text-center">
                                        <v-icon icon="mdi-format-list-checks" size="26" class="mb-2 text-primary" />
                                        <div class="text-subtitle-2">Total Tasks</div>
                                        <div class="text-h6 font-weight-bold mt-1">{{ totalTasks }}</div>
                                    </v-card-text>
                                </v-card>
                            </v-col>

                            <v-col cols="12" sm="4">
                                <v-card class="rounded-xl" elevation="0" variant="outlined">
                                    <v-card-text class="text-center">
                                        <v-icon icon="mdi-check-circle-outline" size="26" class="mb-2 text-primary" />
                                        <div class="text-subtitle-2">Completed</div>
                                        <div class="text-h6 font-weight-bold mt-1">{{ completedTasks }}</div>
                                    </v-card-text>
                                </v-card>
                            </v-col>

                            <v-col cols="12" sm="4">
                                <v-card class="rounded-xl" elevation="0" variant="outlined">
                                    <v-card-text class="text-center">
                                        <v-icon icon="mdi-percent" size="26" class="mb-2 text-primary" />
                                        <div class="text-subtitle-2">Completion Rate</div>
                                        <div class="text-h6 font-weight-bold mt-1">{{ completionRate }}%</div>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-container>

            </div>

            <div v-else-if="activeTab === 'Wellness Trends'">
                <v-container fluid>
                    <v-row>
                        <!-- Wellness Trends Chart -->
                        <v-col cols="12">
                            <v-card class="pa-4">
                                <v-card-title>Wellness Trends (Last 7 Days)</v-card-title>
                                <v-card-subtitle>Track your mood, energy, sleep, and stress levels</v-card-subtitle>
                                <apexchart type="line" height="250" :options="wellnessOptions"
                                    :series="wellnessSeries" />
                            </v-card>
                        </v-col>
                    </v-row>

                    <!-- Wellness Stats (Mood, Energy, Sleep, Stress) -->
                    <v-row>
                        <v-col cols="12" sm="3">
                            <v-card class="rounded-xl" elevation="0" variant="outlined">
                                <v-card-text class="text-center">
                                    <div class="text-subtitle-2">Mood</div>
                                    <div class="text-h6 font-weight-bold mt-1">{{ mood }}/10</div>
                                    <div class="text-caption text-disabled">7-day avg</div>
                                </v-card-text>
                            </v-card>
                        </v-col>

                        <v-col cols="12" sm="3">
                            <v-card class="rounded-xl" elevation="0" variant="outlined">
                                <v-card-text class="text-center">
                                    <div class="text-subtitle-2">Energy</div>
                                    <div class="text-h6 font-weight-bold mt-1">{{ energy }}/10</div>
                                    <div class="text-caption text-disabled">7-day avg</div>
                                </v-card-text>
                            </v-card>
                        </v-col>

                        <v-col cols="12" sm="3">
                            <v-card class="rounded-xl" elevation="0" variant="outlined">
                                <v-card-text class="text-center">
                                    <div class="text-subtitle-2">Sleep</div>
                                    <div class="text-h6 font-weight-bold mt-1">{{ sleep }}/10</div>
                                    <div class="text-caption text-disabled">7-day avg</div>
                                </v-card-text>
                            </v-card>
                        </v-col>

                        <v-col cols="12" sm="3">
                            <v-card class="rounded-xl" elevation="0" variant="outlined">
                                <v-card-text class="text-center">
                                    <div class="text-subtitle-2">Stress</div>
                                    <div class="text-h6 font-weight-bold mt-1">{{ stress }}/10</div>
                                    <div class="text-caption text-disabled">7-day avg</div>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </div>
            <div v-else-if="activeTab === 'Insights'">📊 Insights Content</div>
        </div>



    </v-container>
</template>

<script setup>
import { ref } from 'vue'
import ApexCharts from 'vue3-apexcharts';


// ---- Dummy Data ----
// Bar chart (Daily Study Time)
const dailyStudySeries = ref([
    { name: 'Study Time (mins)', data: [2, 4, 1, 0, 3, 2, 4] },
])
const dailyStudyOptions = ref({
    chart: { toolbar: { show: false } },
    xaxis: { categories: ['Oct 02', 'Oct 03', 'Oct 04', 'Oct 05', 'Oct 06', 'Oct 07', 'Oct 08'] },
    colors: ['#6A7A5A'],
    grid: { borderColor: '#eee' },
    dataLabels: {
        enabled: false,  // Disable the data labels on top of bars
    },
})

// Donut chart (Study Time by Subject)
const subjectSeries = ref([30, 15, 25, 10, 20])
const subjectOptions = ref({
    labels: ['Math', 'Science', 'English', 'History', 'Art'],
    colors: ['#6A7A5A', '#8DAF9B', '#BED2BA', '#AAC4BC', '#D7CBB2'],
    legend: { position: 'bottom' },
})

// Line chart (Productivity Trend)
const productivitySeries = ref([
    { name: 'Productivity', data: [0, 2, 4, 3, 5, 6, 4] },
])
const productivityOptions = ref({
    chart: { toolbar: { show: false } },
    xaxis: { categories: ['Oct 02', 'Oct 03', 'Oct 04', 'Oct 05', 'Oct 06', 'Oct 07', 'Oct 08'] },
    yaxis: { min: 0, max: 10 },
    colors: ['#8DAF9B'],
    stroke: { curve: 'smooth' },
    markers: { size: 4 },
    grid: { borderColor: '#eee' },
})

// task progress

// Sample data for Task Completion
const totalTasks = ref(10);  // Total number of tasks
const completedTasks = ref(6); // Completed tasks
const completionRate = ref(((completedTasks.value / totalTasks.value) * 100).toFixed(2)); // Completion rate calculation

// Task Completion Trends Bar Chart (Created vs Completed)
const taskCompletionSeries = ref([
    { name: 'Created Tasks', data: [2, 3, 1, 2, 4, 3, 2] }, // Example data for tasks created
    { name: 'Completed Tasks', data: [1, 2, 1, 1, 2, 3, 1] }  // Example data for tasks completed
]);

const taskCompletionOptions = ref({
    chart: {
        type: 'bar',
        toolbar: { show: false },
    },
    xaxis: {
        categories: ['Oct 02', 'Oct 03', 'Oct 04', 'Oct 05', 'Oct 06', 'Oct 07', 'Oct 08'],
    },
    yaxis: {
        min: 0,
    },
    colors: ['#4CAF50', '#FF7043'], // Green for created, red for completed
    grid: { borderColor: '#eee' },
    dataLabels: { enabled: false },
});

// Dummy Data for Wellness Trends (Mood, Energy, Sleep, Stress)
const wellnessSeries = ref([
    { name: 'Mood', data: [7, 6, 8, 7, 9, 6, 8] },
    { name: 'Energy', data: [6, 5, 7, 6, 8, 7, 6] },
    { name: 'Sleep', data: [8, 7, 8, 7, 8, 7, 7] },
    { name: 'Stress', data: [4, 5, 3, 4, 3, 2, 4] },
]);

const wellnessOptions = ref({
    chart: {
        type: 'line',
        toolbar: { show: false },
    },
    xaxis: {
        categories: ['Oct 02', 'Oct 03', 'Oct 04', 'Oct 05', 'Oct 06', 'Oct 07', 'Oct 08'],
    },
    yaxis: {
        min: 0,
        max: 10,
    },
    stroke: {
        width: 2,
        curve: 'smooth',
    },
    markers: {
        size: 4,
    },
    grid: {
        borderColor: '#eee',
    },
    colors: ['#FF7043', '#42A5F5', '#8DAF9B', '#FFD54F'], // Custom colors for each trend
});

// Dummy Data for Wellness Stats (Mood, Energy, Sleep, Stress)
const mood = ref(7);
const energy = ref(6);
const sleep = ref(7);
const stress = ref(4);

</script>


<script>

export default {
    data() {
        return {
            studyProgress: 80,
            taskComplete: 20,
            studyStreak: 40,
            checkIn: 60,
            activeTab: "Study Analytics",
            tabs: ["Study Analytics", "Task Progress", "Wellness Trends", "Insights"],
        };
    },
};
</script>



<style scoped>
.text-muted {
    color: var(--text-muted);
}

.progress-bar {
    height: 4px;
    background-color: #eaeaea;
    position: relative;
    margin-top: 10px;
}

.progress-fill {
    background-color: #4caf50;
    height: 100%;
}

.custom-tabs {
    display: flex;
    background-color: #f0f0f5;
    padding: 4px;
    border-radius: 20px;
    width: 100%;
    height: 60%;
    transition: opacity 0.5s ease-in-out;
}

.tab-button {
    flex: 1;
    /* Makes each button take equal width */
    border: none;
    background: transparent;
    padding: 6px 12px;
    border-radius: 16px;
    cursor: pointer;
    font-weight: 500;
    color: #444;
    transition: background 0.3s, color 0.3s;
    text-align: center;
}

.tab-button.active {
    background-color: #ffffff;
    color: #000;
    font-weight: 600;
}

.v-card {
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.v-icon {
    color: #42a5f5;
}
</style>
