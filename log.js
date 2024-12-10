// Centralized log content storage
let logContent = "";

// Function to add log entries
function addLog(entry) {
    const timestamp = new Date().toLocaleString();
    const logEntry = `[${timestamp}] - ${entry}`;
    logContent += logEntry + "\n";
    console.log(logEntry); 
}

// Function to download the log file
function downloadLogFile() {
    if (logContent.trim() === "") {
        alert("No logs to download."); 
        return;
    }

    const blob = new Blob([logContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "game_logs.txt"; 
    document.body.appendChild(a); 
    a.click();
    URL.revokeObjectURL(url);
    a.remove(); 
}

function addDownloadLogsButton() {
    const downloadLogsButton = document.createElement("button");
    downloadLogsButton.textContent = "Download Logs";
    downloadLogsButton.style.position = "fixed";
    downloadLogsButton.style.bottom = "20px";
    downloadLogsButton.style.right = "20px";
    downloadLogsButton.style.padding = "10px 20px";
    downloadLogsButton.style.backgroundColor = "#007bff";
    downloadLogsButton.style.color = "#fff";
    downloadLogsButton.style.border = "none";
    downloadLogsButton.style.borderRadius = "5px";
    downloadLogsButton.style.cursor = "pointer";
    downloadLogsButton.addEventListener("click", downloadLogFile);
    document.body.appendChild(downloadLogsButton);
}

// Initialize logs 
function initializeLogging() {
    addDownloadLogsButton();
    addLog("Game started");
}

document.addEventListener("DOMContentLoaded", initializeLogging);
