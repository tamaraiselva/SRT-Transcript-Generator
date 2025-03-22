const videoUpload = document.getElementById('video-upload');
const srtUpload = document.getElementById('srt-upload');
const submitButton = document.getElementById('submit-button');
const uploadSection = document.getElementById('upload-section');
const videoContainer = document.getElementById('video-container');
const video = document.getElementById('video');
const subtitleElement = document.getElementById('subtitle');

let subtitles = [];

videoUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const videoURL = URL.createObjectURL(file);
        video.src = videoURL;
        video.load();
    }
});

srtUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target.result;
            subtitles = parseSRT(data);
            console.log('Subtitles loaded:', subtitles);
        };
        reader.readAsText(file);
    }
});

submitButton.addEventListener('click', () => {
    if (video.src && subtitles.length > 0) {
        uploadSection.style.display = 'none';
        videoContainer.style.display = 'block';
    } else {
        alert('Please upload both a video file and an SRT subtitle file.');
    }
});

function parseSRT(data) {
    const subtitles = [];
    const blocks = data.split('\n\n');

    blocks.forEach(block => {
        const lines = block.split('\n');
        if (lines.length >= 3) {
            const index = parseInt(lines[0], 10);
            const timeRange = lines[1];
            const text = lines.slice(2).join('\n').trim();

            const [start, end] = timeRange.split(' --> ');
            subtitles.push({
                index,
                start: parseTime(start),
                end: parseTime(end),
                text
            });
        }
    });

    return subtitles;
}

function parseTime(timeString) {
    const [hms, ms] = timeString.split(',');
    const [h, m, s] = hms.split(':');
    return parseInt(h, 10) * 3600 + parseInt(m, 10) * 60 + parseFloat(s) + parseFloat(ms) / 1000;
}

function findSubtitle(subtitles, currentTime) {
    return subtitles.find(sub => currentTime >= sub.start && currentTime <= sub.end);
}

video.addEventListener('timeupdate', () => {
    const currentTime = video.currentTime;
    const subtitle = findSubtitle(subtitles, currentTime);
    subtitleElement.textContent = subtitle ? subtitle.text : '';
});
